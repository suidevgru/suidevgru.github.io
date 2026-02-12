import '@zktx.io/ptb-builder/index.css';
import '@zktx.io/ptb-builder/styles/themes-all.css';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import type { Transaction } from '@mysten/sui/transactions';
import { PTBBuilder, type Chain, type PTBDoc, type ToastVariant, usePTB } from '@zktx.io/ptb-builder';
import { PTB_TEMPLATES } from '../templates/ptb';
import { findTutorial } from '../tutorials';
import type { ResolvedTutorialStep } from '../tutorials/types';

const UI_LABELS = {
  en: { guide: 'Guide', step: 'Step', back: 'Back', next: 'Next', complete: 'Complete!', showAnswer: 'Show Answer', confirmOverwrite: 'Current content will be overwritten. Show the answer?' },
  ja: { guide: 'ガイド', step: 'ステップ', back: '戻る', next: '次へ', complete: '完了！', showAnswer: '正解を表示', confirmOverwrite: '現在の内容が上書きされます。正解を表示しますか？' },
  ko: { guide: '가이드', step: '스텝', back: '뒤로', next: '다음', complete: '완료!', showAnswer: '정답 보기', confirmOverwrite: '현재 내용이 덮어씌워집니다. 정답을 표시할까요?' },
} as const;

type UiLabels = (typeof UI_LABELS)[keyof typeof UI_LABELS];

function getUiLabels(locale: string): UiLabels {
  if (locale in UI_LABELS) return UI_LABELS[locale as keyof typeof UI_LABELS];
  return UI_LABELS.en;
}

function usePtbTheme() {
  const { colorMode } = useColorMode();
  return colorMode === 'dark' ? 'dark' : 'light';
}

function toastAdapter({ message, variant }: { message: string; variant?: ToastVariant }) {
  const prefix = variant ? `[${variant}]` : '';
  // eslint-disable-next-line no-console
  console.log(prefix, message);
}

function PtbBuilderInit({
  theme,
  docToLoad,
  containerRef,
}: {
  theme: 'dark' | 'light';
  docToLoad: PTBDoc | Chain;
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const { loadFromDoc, setTheme } = usePTB();
  const loadFromDocRef = useRef(loadFromDoc);
  const setThemeRef = useRef(setTheme);

  useEffect(() => {
    loadFromDocRef.current = loadFromDoc;
    setThemeRef.current = setTheme;
  }, [loadFromDoc, setTheme]);

  useEffect(() => {
    setThemeRef.current(theme);
  }, [theme]);

  useEffect(() => {
    // Load only after the container has a real size, so React Flow can measure handles.
    let cancelled = false;
    let raf: number | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let lastSizeKey = '';
    let stableFrames = 0;

    const container = containerRef.current;
    if (!container) {
      loadFromDocRef.current(docToLoad);
      return;
    }

    const tryLoad = () => {
      if (cancelled) return;
      const rect = container.getBoundingClientRect();
      const sizeKey = `${Math.round(rect.width)}x${Math.round(rect.height)}`;

      if (rect.width <= 0 || rect.height <= 0) {
        stableFrames = 0;
        raf = requestAnimationFrame(tryLoad);
        return;
      }

      if (sizeKey === lastSizeKey) {
        stableFrames += 1;
      } else {
        lastSizeKey = sizeKey;
        stableFrames = 0;
      }

      if (stableFrames < 2) {
        raf = requestAnimationFrame(tryLoad);
        return;
      }

      loadFromDocRef.current(docToLoad);
    };

    tryLoad();
    resizeObserver = new ResizeObserver(() => {
      stableFrames = 0;
      lastSizeKey = '';
      if (raf) cancelAnimationFrame(raf);
      tryLoad();
    });
    resizeObserver.observe(container);

    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
    };
  }, [containerRef, docToLoad]);

  return null;
}

function PtbTutorialGuide({ steps, labels }: { steps: ResolvedTutorialStep[]; labels: UiLabels }) {
  const [current, setCurrent] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const step = steps[current];
  const isLast = current === steps.length - 1;

  if (minimized) {
    return (
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10 }}>
        <button
          type="button"
          onClick={() => setMinimized(false)}
          style={{
            padding: '6px 12px',
            borderRadius: 8,
            border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'var(--ifm-background-color)',
            color: 'var(--ifm-font-color-base)',
            cursor: 'pointer',
            fontSize: 13,
            opacity: 0.9,
          }}
        >
          {labels.guide} ({current + 1}/{steps.length})
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 10,
        width: 320,
        maxHeight: 'calc(100% - 24px)',
        overflowY: 'auto',
        background: 'var(--ifm-background-color)',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 12,
        padding: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        fontSize: 13,
        lineHeight: 1.6,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <span style={{ fontWeight: 700, color: 'var(--ifm-color-primary)' }}>
          {labels.step} {current + 1} / {steps.length}
        </span>
        <button
          type="button"
          onClick={() => setMinimized(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            color: 'var(--ifm-color-emphasis-600)',
            padding: '0 4px',
          }}
          aria-label="Minimize guide"
        >
          —
        </button>
      </div>

      <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{step.title}</div>

      <ul style={{ margin: '0 0 8px', paddingLeft: 20 }}>
        {step.instructions.map((inst, i) => (
          <li key={i} style={{ marginBottom: 4 }}>{inst}</li>
        ))}
      </ul>

      {step.tip && (
        <div
          style={{
            background: 'var(--ifm-color-emphasis-100)',
            borderRadius: 8,
            padding: '8px 12px',
            marginBottom: 8,
            fontSize: 12,
            color: 'var(--ifm-color-emphasis-700)',
          }}
        >
          {step.tip}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <button
          type="button"
          onClick={() => setCurrent((c) => c - 1)}
          disabled={current === 0}
          style={{
            padding: '4px 12px',
            borderRadius: 6,
            border: '1px solid var(--ifm-color-emphasis-300)',
            background: 'var(--ifm-background-color)',
            color: current === 0 ? 'var(--ifm-color-emphasis-400)' : 'var(--ifm-font-color-base)',
            cursor: current === 0 ? 'default' : 'pointer',
            fontSize: 13,
          }}
        >
          {labels.back}
        </button>
        {isLast ? (
          <span style={{ padding: '4px 12px', fontWeight: 700, color: 'var(--ifm-color-success)' }}>
            {labels.complete}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setCurrent((c) => c + 1)}
            style={{
              padding: '4px 12px',
              borderRadius: 6,
              border: '1px solid var(--ifm-color-primary)',
              background: 'var(--ifm-color-primary)',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            {labels.next}
          </button>
        )}
      </div>
    </div>
  );
}

function PtbAnswerButton({ answerDoc, labels }: { answerDoc: PTBDoc; labels: UiLabels }) {
  const { loadFromDoc } = usePTB();

  const handleClick = useCallback(() => {
    if (window.confirm(labels.confirmOverwrite)) {
      loadFromDoc(answerDoc);
    }
  }, [loadFromDoc, answerDoc, labels.confirmOverwrite]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 12,
        left: 12,
        zIndex: 10,
      }}
    >
      <button
        type="button"
        onClick={handleClick}
        style={{
          padding: '6px 14px',
          borderRadius: 8,
          border: '1px solid var(--ifm-color-emphasis-300)',
          background: 'var(--ifm-color-emphasis-100)',
          color: 'var(--ifm-font-color-base)',
          cursor: 'pointer',
          fontSize: 13,
        }}
      >
        {labels.showAnswer}
      </button>
    </div>
  );
}

export function PtbBuilderDemo({
  templateId,
  answerTemplateId,
  tutorialId,
}: {
  templateId?: string;
  answerTemplateId?: string;
  tutorialId?: string;
}): React.ReactNode {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const labels = getUiLabels(currentLocale);
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const theme = usePtbTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [lastTx, setLastTx] = useState<{ chain: Chain; digest: string } | null>(null);

  const selectedTemplate = useMemo(() => {
    return PTB_TEMPLATES.find((t) => t.id === templateId) ?? null;
  }, [templateId]);

  const executeTx = useCallback(
    async (chain: Chain, transaction: Transaction | undefined) => {
      if (chain !== 'sui:devnet') {
        return { error: 'This demo runs on Devnet only.' };
      }
      if (!account) return { error: 'Connect a wallet first.' };
      if (!transaction) return { error: 'No transaction.' };

      try {
        const jsonTx = await transaction.toJSON();

        return await new Promise<{ digest?: string; error?: string }>((resolve) => {
          signAndExecuteTransaction(
            { transaction: jsonTx, chain },
            {
              onSuccess: (result) => {
                setLastTx({ chain, digest: result.digest });
                resolve({ digest: result.digest });
              },
              onError: (error) => {
                setLastTx(null);
                resolve({ error: error.message });
              },
            },
          );
        });
      } catch (e: any) {
        setLastTx(null);
        return { error: e?.message ?? 'Serialization failed.' };
      }
    },
    [account, signAndExecuteTransaction],
  );

  const explorerUrl = useMemo(() => {
    if (!lastTx) return null;
    const network = lastTx.chain.replace('sui:', '');
    return `https://suiexplorer.com/txblock/${lastTx.digest}?network=${network}`;
  }, [lastTx]);

  const header = useMemo(() => {
    return (
      <div style={{ marginBottom: 12 }}>
        <div>
          <b>Network</b>: <code>sui:devnet</code>
        </div>
        <div>
          <b>Address</b>: <code>{account?.address ?? '— (connect wallet)'}</code>
        </div>
        {explorerUrl && lastTx ? (
          <div>
            <b>Last Tx</b>:{' '}
            <a href={explorerUrl} target="_blank" rel="noreferrer">
              {lastTx.digest.slice(0, 10)}…
            </a>
          </div>
        ) : null}
      </div>
    );
  }, [account?.address, explorerUrl, lastTx]);

  const docToLoad = useMemo<PTBDoc | Chain>(() => {
    if (!selectedTemplate) return 'sui:devnet' satisfies Chain;
    return selectedTemplate.getDoc({ chain: 'sui:devnet' });
  }, [selectedTemplate]);

  const answerDoc = useMemo(() => {
    if (!answerTemplateId) return null;
    const tmpl = PTB_TEMPLATES.find((t) => t.id === answerTemplateId);
    return tmpl ? tmpl.getDoc({ chain: 'sui:devnet' }) : null;
  }, [answerTemplateId]);

  const tutorial = useMemo(() => {
    if (!tutorialId) return null;
    return findTutorial(tutorialId, currentLocale) ?? null;
  }, [tutorialId, currentLocale]);

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {header}
      <div
        ref={containerRef}
        style={{ height: '80vh', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 12, overflow: 'hidden', position: 'relative' }}
      >
        <PTBBuilder
          theme={theme}
          address={account?.address}
          executeTx={executeTx}
          toast={toastAdapter}
          showExportButton
          showThemeSelector
        >
          <PtbBuilderInit
            theme={theme}
            docToLoad={docToLoad}
            containerRef={containerRef}
          />
          {tutorial && <PtbTutorialGuide steps={tutorial.steps} labels={labels} />}
          {answerDoc && <PtbAnswerButton answerDoc={answerDoc} labels={labels} />}
        </PTBBuilder>
      </div>
    </div>
  );
}
