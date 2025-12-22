import React, { useMemo } from 'react';
import { ConnectButton, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import styles from './SuiWalletDock.module.css';

function formatAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

export function SuiWalletDock(): React.ReactNode {
  const account = useCurrentAccount();
  const { mutate: disconnect, isPending } = useDisconnectWallet();

  const label = useMemo(() => {
    if (!account) return null;
    return formatAddress(account.address);
  }, [account]);

  return (
    <div className={styles.dock} aria-label="Sui wallet">
      {account ? (
        <div className={styles.connected}>
          <span className={styles.address} title={account.address}>
            {label}
          </span>
          <button
            type="button"
            className={styles.disconnect}
            onClick={() => disconnect()}
            disabled={isPending}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <ConnectButton className={styles.connect} connectText="Connect Wallet" />
      )}
    </div>
  );
}
