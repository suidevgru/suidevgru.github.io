import React, { useMemo, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { rust } from '@codemirror/lang-rust';
import { yaml } from '@codemirror/lang-yaml';
import { EditorView } from '@codemirror/view';
import { useColorMode } from '@docusaurus/theme-common';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { fromBase64 } from '@mysten/sui/utils';
import {
  buildMovePackage,
  GitHubFetcher,
  initMoveCompiler,
  resolve,
} from '@zktx.io/sui-move-builder';

import { MoveTemplate_Intro_HelloWorld } from '@site/src/templates/move/moveTemplate_01_hello';

type BuildResult = Awaited<ReturnType<typeof buildMovePackage>>;
type BuildSuccess = BuildResult & {
  success: true;
  modules: string[];
  dependencies?: string[];
  digest?: string;
};

export function MovePlayground() {
  const template = MoveTemplate_Intro_HelloWorld;
  const templateFiles = useMemo(
    () => template.files(template.defaultName ?? 'hello_world'),
    [template],
  );
  const [files, setFiles] = useState<Record<string, string>>(() => ({ ...templateFiles }));
  const [selectedPath, setSelectedPath] = useState(() => {
    if (templateFiles['Move.toml']) return 'Move.toml';
    return Object.keys(templateFiles)[0] ?? 'Move.toml';
  });
  const [status, setStatus] = useState('Ready.');
  const [output, setOutput] = useState('');
  const [busy, setBusy] = useState(false);
  const [compiled, setCompiled] = useState<BuildResult | null>(null);
  const [publishDigest, setPublishDigest] = useState('');
  const [publishPackageId, setPublishPackageId] = useState('');
  const compilerInitRef = React.useRef<Promise<void> | null>(null);
  const { colorMode } = useColorMode();
  const account = useCurrentAccount();
  const suiClient = useSuiClient();
  const { mutate: signAndExecuteTransaction, isPending: isPublishing } =
    useSignAndExecuteTransaction();

  const editorTheme = useMemo(
    () =>
      EditorView.theme(
        {
          '&.cm-editor': {
            backgroundColor: 'var(--ifm-background-surface-color)',
            color: 'var(--ifm-font-color-base)',
            border: '1px solid var(--ifm-color-emphasis-200)',
            borderRadius: '12px',
          },
          '.cm-scroller': {
            backgroundColor: 'transparent',
          },
          '.cm-content': {
            fontFamily: 'var(--ifm-font-family-monospace)',
            fontSize: '12px',
            lineHeight: '1.6',
            padding: '10px',
          },
          '.cm-gutters': {
            backgroundColor: 'transparent',
            borderRight: '1px solid var(--ifm-color-emphasis-200)',
            color: 'var(--ifm-color-emphasis-600)',
          },
          '.cm-activeLine': {
            backgroundColor: 'var(--ifm-color-emphasis-100)',
          },
          '.cm-activeLineGutter': {
            backgroundColor: 'var(--ifm-color-emphasis-100)',
          },
          '.cm-selectionBackground': {
            backgroundColor: 'var(--ifm-color-emphasis-200)',
          },
        },
        { dark: colorMode === 'dark' },
      ),
    [colorMode],
  );

  const baseExtensions = useMemo(() => [EditorView.lineWrapping], []);
  const tomlExtensions = useMemo(() => [yaml(), ...baseExtensions], [baseExtensions]);
  const moveExtensions = useMemo(() => [rust(), ...baseExtensions], [baseExtensions]);
  const activeExtensions = useMemo(() => {
    if (selectedPath.endsWith('.move')) return moveExtensions;
    if (selectedPath.endsWith('.toml')) return tomlExtensions;
    return baseExtensions;
  }, [selectedPath, moveExtensions, tomlExtensions, baseExtensions]);

  const tree = useMemo(() => buildFileTree(Object.keys(files)), [files]);

  const appendOutput = (line: string) => {
    setOutput((prev) => `${prev}${line}\n`);
  };

  const isBuildSuccess = (result: BuildResult): result is BuildSuccess =>
    result.success === true && 'modules' in result;

  const ensureCompiler = async () => {
    if (!compilerInitRef.current) {
      setStatus('Initializing WASM...');
      compilerInitRef.current = initMoveCompiler();
    }
    await compilerInitRef.current;
  };

  const onCompile = async () => {
    setOutput('');
    setBusy(true);
    setStatus('Resolving dependencies...');
    setCompiled(null);
    setPublishDigest('');
    setPublishPackageId('');

    try {
      await ensureCompiler();

      const moveToml = files['Move.toml'] ?? '';
      const rootFiles = {
        ...Object.fromEntries(
          Object.entries(files).filter(([path]) => path === 'Move.toml' || path.endsWith('.move')),
        ),
      };

      const fetcher = new GitHubFetcher();
      const start = performance.now();
      const resolution = await resolve(moveToml, rootFiles, fetcher);
      const resolvedFiles =
        typeof resolution.files === 'string' ? JSON.parse(resolution.files) : resolution.files;
      const resolvedDependencies =
        typeof resolution.dependencies === 'string'
          ? JSON.parse(resolution.dependencies)
          : resolution.dependencies;

      setStatus('Compiling...');
      const result = await buildMovePackage({
        files: resolvedFiles,
        dependencies: resolvedDependencies,
      });
      const end = performance.now();

      if (isBuildSuccess(result)) {
        appendOutput(`Success in ${(end - start).toFixed(2)} ms`);
        appendOutput(`Digest: ${result.digest ?? '-'}`);
        appendOutput(`Dependencies: ${result.dependencies?.length ?? 0}`);
        result.modules.forEach((mod: string, index: number) => {
          appendOutput(`Module ${index + 1}: ${mod.slice(0, 80)}...`);
        });
        setCompiled(result);
      } else {
        appendOutput('Compilation failed.');
        const errorMessage = 'error' in result ? result.error : undefined;
        appendOutput(errorMessage ?? 'Unknown error.');
        setCompiled(null);
      }

      setStatus('Done.');
    } catch (error) {
      appendOutput('Runtime error:');
      appendOutput(String(error));
      setStatus('Error.');
    } finally {
      setBusy(false);
    }
  };

  const onPublish = () => {
    if (!compiled || !isBuildSuccess(compiled) || !account || !compiled.modules.length) return;
    setStatus('Publishing...');
    setPublishDigest('');
    setPublishPackageId('');
    appendOutput('Publishing transaction...');

    const tx = new Transaction();
    const modules: number[][] = compiled.modules.map((mod) =>
      Array.from(fromBase64(mod)) as number[],
    );
    const [upgradeCap] = tx.publish({
      modules,
      dependencies: compiled.dependencies ?? [],
    });
    tx.transferObjects([upgradeCap], tx.pure.address(account.address));

    signAndExecuteTransaction(
      { transaction: tx },
      {
        onSuccess: (result) => {
          appendOutput(`Publish digest: ${result.digest}`);
          setPublishDigest(result.digest);
          void (async () => {
            try {
              const txb = await suiClient.waitForTransaction({
                digest: result.digest,
                options: { showObjectChanges: true },
              });
              const published = txb.objectChanges?.find(
                (change) => change.type === 'published',
              ) as { packageId?: string } | undefined;
              if (published?.packageId) {
                appendOutput(`Package ID: ${published.packageId}`);
                setPublishPackageId(published.packageId);
              }
            } catch (error) {
              appendOutput(`Package lookup failed: ${String(error)}`);
            }
          })();
          setStatus('Publish complete.');
        },
        onError: (error) => {
          appendOutput('Publish failed.');
          appendOutput(String(error));
          setStatus('Publish error.');
        },
      },
    );
  };

  return (
    <div style={{ maxWidth: 1100 }}>
      <div
        style={{
          border: '1px solid var(--ifm-color-emphasis-300)',
          borderRadius: 16,
          padding: 16,
          background: 'var(--ifm-background-surface-color)',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', columnGap: 16, rowGap: 6 }}>
          <div className="text--muted" style={{ fontSize: 12 }}>
            {template.defaultName ?? 'package'}
          </div>
          <div className="text--muted" style={{ fontSize: 12 }}>
            {selectedPath}
          </div>
          <div
            style={{
              border: '1px solid var(--ifm-color-emphasis-200)',
              borderRadius: 12,
              padding: 12,
              background: 'var(--ifm-background-color)',
              height: 520,
              overflow: 'auto',
            }}
          >
            <FileTree tree={tree} selectedPath={selectedPath} onSelect={setSelectedPath} />
          </div>
          <div>
            <CodeMirror
              value={files[selectedPath] ?? ''}
              height="520px"
              extensions={activeExtensions}
              theme={editorTheme}
              onChange={(value) =>
                setFiles((prev) => ({
                  ...prev,
                  [selectedPath]: value,
                }))
              }
            />
          </div>
        </div>

        <div
          className="margin-top--md"
          style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <button className="button button--primary" onClick={onCompile} disabled={busy}>
            {busy ? 'Compiling…' : 'Compile'}
          </button>
          <button
            className="button button--warning"
            onClick={onPublish}
            disabled={!compiled || !isBuildSuccess(compiled) || !account || isPublishing}
          >
            {isPublishing ? 'Publishing…' : 'Publish'}
          </button>
        </div>
        {publishPackageId ? (
          <div className="margin-top--sm" style={{ fontSize: 12 }}>
            <span className="text--muted">Package ID:</span>{' '}
            <code style={{ wordBreak: 'break-all' }}>{publishPackageId}</code>
          </div>
        ) : null}
      </div>

      <div className="margin-top--md">
        <div className="text--muted" style={{ fontSize: 12, marginBottom: 6 }}>
          Output
        </div>
        <pre
          style={{
            minHeight: 220,
            padding: 12,
            borderRadius: 12,
            background: '#0f0f0f',
            color: '#f1f1f1',
            fontSize: 12,
            overflow: 'auto',
          }}
        >
          {output || 'Ready.'}
        </pre>
      </div>
    </div>
  );
}

type FileTreeNode = {
  name: string;
  path?: string;
  children?: FileTreeNode[];
};

function buildFileTree(paths: string[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];
  const addNode = (parts: string[], fullPath: string, nodes: FileTreeNode[]) => {
    const [head, ...rest] = parts;
    let node = nodes.find((item) => item.name === head);
    if (!node) {
      node = { name: head, children: [] };
      nodes.push(node);
    }
    if (rest.length === 0) {
      node.path = fullPath;
      return;
    }
    if (!node.children) node.children = [];
    addNode(rest, fullPath, node.children);
  };

  paths.forEach((path) => {
    const parts = path.split('/');
    addNode(parts, path, root);
  });

  const sortTree = (nodes: FileTreeNode[]) => {
    nodes.sort((a, b) => {
      const aIsFile = Boolean(a.path);
      const bIsFile = Boolean(b.path);
      if (aIsFile !== bIsFile) return aIsFile ? 1 : -1;
      return a.name.localeCompare(b.name);
    });
    nodes.forEach((node) => {
      if (node.children) sortTree(node.children);
    });
  };

  sortTree(root);
  return root;
}

function FileTree({
  tree,
  selectedPath,
  onSelect,
  depth = 0,
}: {
  tree: FileTreeNode[];
  selectedPath: string;
  onSelect: (path: string) => void;
  depth?: number;
}) {
  return (
    <div>
      {tree.map((node) => {
        const isFile = Boolean(node.path);
        const isSelected = node.path === selectedPath;
        return (
          <div key={node.path ?? `${node.name}-${depth}`}>
            <div
              style={{
                paddingLeft: depth * 12,
                fontSize: 13,
                fontWeight: isSelected ? 600 : 500,
                color: isSelected ? 'var(--ifm-color-primary)' : 'var(--ifm-font-color-base)',
                cursor: isFile ? 'pointer' : 'default',
                paddingTop: 4,
                paddingBottom: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
              onClick={() => {
                if (node.path) onSelect(node.path);
              }}
            >
              <span style={{ color: 'var(--ifm-color-emphasis-600)' }}>
                {isFile ? <FileIcon /> : <FolderIcon />}
              </span>
              <span>{node.name}</span>
            </div>
            {node.children ? (
              <FileTree
                tree={node.children}
                selectedPath={selectedPath}
                onSelect={onSelect}
                depth={depth + 1}
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function FolderIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6 1C4.34314 1 3 2.34315 3 4V20C3 21.6569 4.34315 23 6 23H19C20.6569 23 22 21.6569 22 20V10C22 9.73478 21.8946 9.48043 21.7071 9.29289L13.7071 1.29292C13.6114 1.19722 13.4983 1.1229 13.3753 1.07308C13.2572 1.02527 13.1299 1 13 1H6ZM12 3H6C5.44771 3 5 3.44771 5 4V20C5 20.5523 5.44772 21 6 21H19C19.5523 21 20 20.5523 20 20V11H13C12.4477 11 12 10.5523 12 10V3ZM18.5858 9.00003L14 4.41424V9.00003H18.5858Z"
        fill="currentColor"
      />
    </svg>
  );
}
