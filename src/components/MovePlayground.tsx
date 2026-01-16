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
  initMoveCompiler,
  resolve,
  GitHubFetcher,
} from '@zktx.io/sui-move-builder';

import { MoveTemplate_Intro_HelloWorld } from '@site/src/templates/move/moveTemplate_01_hello';

type BuildResult = Awaited<ReturnType<typeof buildMovePackage>>;
type BuildSuccess = BuildResult & {
  success: true;
  modules: string[];
  dependencies?: string[];
  digest?: string;
};

type AnsiColorMap = Record<number, string>;
const ANSI_REGEX = /\x1b\[[0-9;]*m/g;
const ANSI_COLORS_LIGHT: AnsiColorMap = {
  30: '#0f172a',
  31: '#b91c1c',
  32: '#166534',
  33: '#b45309',
  34: '#1d4ed8',
  35: '#7e22ce',
  36: '#0f766e',
  37: '#334155',
  90: '#64748b',
  91: '#dc2626',
  92: '#16a34a',
  93: '#f59e0b',
  94: '#2563eb',
  95: '#a855f7',
  96: '#14b8a6',
  97: '#1e293b',
};
const ANSI_COLORS_DARK: AnsiColorMap = {
  30: '#e2e8f0',
  31: '#f87171',
  32: '#4ade80',
  33: '#fbbf24',
  34: '#60a5fa',
  35: '#c084fc',
  36: '#2dd4bf',
  37: '#cbd5f5',
  90: '#94a3b8',
  91: '#fca5a5',
  92: '#86efac',
  93: '#fde047',
  94: '#93c5fd',
  95: '#e9d5ff',
  96: '#5eead4',
  97: '#f8fafc',
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

  const ansiColorMap = useMemo(
    () => (colorMode === 'dark' ? ANSI_COLORS_DARK : ANSI_COLORS_LIGHT),
    [colorMode],
  );
  const outputStyles = useMemo(
    () => ({
      minHeight: 220,
      padding: 12,
      borderRadius: 12,
      background: colorMode === 'dark' ? '#0b0f16' : '#f8fafc',
      color: colorMode === 'dark' ? '#e2e8f0' : '#0f172a',
      border: '1px solid var(--ifm-color-emphasis-200)',
      fontSize: 12,
      overflow: 'auto',
      whiteSpace: 'pre-wrap' as const,
      fontFamily: 'var(--ifm-font-family-monospace)',
    }),
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

    const start = performance.now();

    try {
      // 依存関係を解決
      const resolution = await resolve(
        files['Move.toml'] ?? '',
        files,
        new GitHubFetcher()
      );

      // 戻り値が文字列の場合はパース
      const filesJson =
        typeof resolution.files === 'string'
          ? JSON.parse(resolution.files)
          : resolution.files;
      const depsJson =
        typeof resolution.dependencies === 'string'
          ? JSON.parse(resolution.dependencies)
          : resolution.dependencies;

      await ensureCompiler();

      setStatus('Compiling...');
      const result = await buildMovePackage({
        files: filesJson,
        dependencies: depsJson,
        ansiColor: true,
      });
      const end = performance.now();

      if (!result.success) {
        appendOutput('Compilation failed.');
        appendOutput('error' in result ? result.error : 'Unknown error.');
        setCompiled(null);
      } else {
        appendOutput(`Success in ${(end - start).toFixed(2)} ms`);
        appendOutput(`Digest: ${result.digest ?? '-'}`);
        appendOutput(`Dependencies: ${result.dependencies?.length ?? 0}`);
        result.modules.forEach((mod: string, index: number) => {
          appendOutput(`Module ${index + 1}: ${mod.slice(0, 80)}...`);
        });
        setCompiled(result);
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
    if (!compiled || !compiled || !account || ( "modules" in compiled && !compiled.modules.length)) return;
    setStatus('Publishing...');
    setPublishDigest('');
    setPublishPackageId('');
    appendOutput('Publishing transaction...');

    const tx = new Transaction();
    const modules: number[][] = (compiled as BuildSuccess).modules.map((mod) =>
      Array.from(fromBase64(mod)) as number[],
    );
    const [upgradeCap] = tx.publish({
      modules,
      dependencies: (compiled as BuildSuccess).dependencies ?? [],
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
            disabled={!compiled || !account || isPublishing}
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
          style={outputStyles}
        >
          {output ? renderAnsiToReact(output, ansiColorMap) : 'Ready.'}
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

function renderAnsiToReact(text: string, colorMap: AnsiColorMap) {
  const nodes: React.ReactNode[] = [];
  let currentColor: string | null = null;
  let isBold = false;
  let lastIndex = 0;
  let key = 0;

  const flushText = (chunk: string) => {
    if (!chunk) return;
    const style: React.CSSProperties = {};
    if (currentColor) style.color = currentColor;
    if (isBold) style.fontWeight = 600;
    const parts = chunk.split('\n');
    parts.forEach((part, index) => {
      if (part) {
        nodes.push(
          <span key={`ansi-${key++}`} style={style}>
            {part}
          </span>,
        );
      }
      if (index < parts.length - 1) {
        nodes.push(<br key={`ansi-br-${key++}`} />);
      }
    });
  };

  for (const match of text.matchAll(ANSI_REGEX)) {
    const idx = match.index ?? 0;
    flushText(text.slice(lastIndex, idx));
    const codeStr = match[0].slice(2, -1);
    const codes = codeStr ? codeStr.split(';').map(Number) : [0];
    for (const code of codes) {
      if (code === 0) {
        currentColor = null;
        isBold = false;
      } else if (code === 1) {
        isBold = true;
      } else if (code === 22) {
        isBold = false;
      } else if (code === 39) {
        currentColor = null;
      } else if (colorMap[code]) {
        currentColor = colorMap[code];
      }
    }
    lastIndex = idx + match[0].length;
  }

  flushText(text.slice(lastIndex));
  return nodes;
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
