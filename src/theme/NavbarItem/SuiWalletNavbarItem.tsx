import React from 'react';
import { ConnectModal, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import WalletSvg from '@site/static/img/wallet.svg';
import styles from './SuiWalletNavbarItem.module.css';

type Props = {
  className?: string;
  mobile?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function formatAddress(address: string) {
  if (address.length <= 10) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function WalletIcon(): React.ReactNode {
  return <WalletSvg className={styles.icon} aria-hidden="true" focusable="false" />;
}

export default function SuiWalletNavbarItem({ className, onClick, mobile }: Props): React.ReactNode {
  const account = useCurrentAccount();
  const { mutate: disconnect, isPending: isDisconnecting } = useDisconnectWallet();
  const addressLabel = account ? formatAddress(account.address) : null;

  return (
    <div className={`navbar__item ${styles.item} ${className ?? ''}`.trim()}>
      {account ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={`${styles.addressButton} clean-btn`}
              title={account.address}
              aria-label="Wallet menu"
              onClick={onClick}
            >
              <span className={styles.addressText}>{addressLabel}</span>
              <span className={styles.chevron} aria-hidden="true">
                ▾
              </span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className={styles.menu} sideOffset={8} align="end">
              <DropdownMenu.Item
                className={styles.menuItemDanger}
                disabled={isDisconnecting}
                onSelect={(event) => {
                  event.preventDefault();
                  disconnect();
                }}
              >
                Disconnect
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <ConnectModal
          trigger={
            <button
              type="button"
              className={`${styles.iconButton} clean-btn`}
              aria-label="Connect wallet"
              onClick={onClick}
            >
              <WalletIcon />
            </button>
          }
        />
      )}
    </div>
  );
}
