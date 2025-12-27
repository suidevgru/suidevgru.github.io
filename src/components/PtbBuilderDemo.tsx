import '@zktx.io/ptb-builder/index.css';
import '@zktx.io/ptb-builder/styles/themes-all.css';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import type { Transaction } from '@mysten/sui/transactions';
import { PTBBuilder, type Chain, type PTBDoc, type ToastVariant, usePTB } from '@zktx.io/ptb-builder';
import { PTB_TEMPLATES } from '../ptb/templates';

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

export function PtbBuilderDemo({
  templateId = 'split',
}: {
  templateId?: string;
}): React.ReactNode {
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

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {header}
      <div
        ref={containerRef}
        style={{ height: '80vh', border: '1px solid var(--ifm-color-emphasis-200)', borderRadius: 12, overflow: 'hidden' }}
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
        </PTBBuilder>
      </div>
    </div>
  );
}
