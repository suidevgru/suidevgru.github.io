import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './HomepageLanding.module.css';
import SuiDevgruLogo from './SuiDevgruLogo';

type CardLink = {label: string} & ({to: string} | {href: string});

type Card = {
  title: string;
  links: CardLink[];
};

function ArrowRightIcon(): ReactNode {
  return (
    <svg className={styles.linkIcon} width="12" height="12" viewBox="0 0 11 11" aria-hidden="true">
      <path
        d="M7 7h-2V4.41L1.71 7.7 0.29 6.29 3.59 3H1V1h6v6z"
        fill="currentColor"
      />
    </svg>
  );
}

function CardLinkItem({item}: {item: CardLink}): ReactNode {
  const isExternal = 'href' in item;
  return (
    <Link
      className={styles.cardLink}
      {...(isExternal
        ? {href: item.href, target: '_blank', rel: 'noopener noreferrer'}
        : {to: item.to})}>
      <span className={styles.cardLinkLabel}>{item.label}</span>
      <ArrowRightIcon />
    </Link>
  );
}

function GroupCard({card}: {card: Card}): ReactNode {
  return (
    <div className={styles.cardShell}>
      <div className={styles.cardInner}>
        <h4 className={styles.cardHeading}>{card.title}</h4>
        <div className={styles.cardLinks}>
          {card.links.map((item) => (
            <CardLinkItem key={`${card.title}-${item.label}-${'href' in item ? item.href : item.to}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomepageLanding(): ReactNode {
  const cards: Card[] = [
    {
      title: 'Beginner',
      links: [
        {label: 'Install Slush Wallet', to: '/docs/getting-started/L01-install-slush'},
        {label: 'Switch to Devnet', to: '/docs/getting-started/L02-switch-devnet'},
      ],
    },
    {
      title: 'Live Code',
      links: [
        {label: 'PTB Builder', to: '/docs/live-code-example/ptb-builder'},
        {label: 'Transfer', to: '/docs/live-code-example/transfer'},
      ],
    },
  ];

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.hero}>
          <Heading as="h1" className={styles.title}>
            <span className={styles.heroLogo}>
              <SuiDevgruLogo size="hero" />
            </span>
          </Heading>
          <p className={styles.subtitle}>
            <strong>{'Learn. Execute.'}</strong>
          </p>
          <div className={styles.ctaRow}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              {'Get started'}
            </Link>
          </div>
        </div>

        <div className={styles.cardsWrap}>
          {cards.map((card) => (
            <GroupCard key={card.title} card={card} />
          ))}

          <div className={styles.cardShell}>
            <div className={styles.ctaCard}>
              <Link className={styles.ctaCardLink} to="/docs/getting-started">
                <span>{'Build with DevGru'}</span>
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
