import React, {type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './HomepageLanding.module.css';

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
      title: 'Developers',
      links: [
        {label: 'Getting Started', to: '/docs/intro'},
        {label: 'Markdown Features', to: '/docs/tutorial-basics/markdown-features'},
        {label: 'Create a Document', to: '/docs/tutorial-basics/create-a-document'},
      ],
    },
    {
      title: 'Guides',
      links: [
        {label: 'Deploy your site', to: '/docs/tutorial-basics/deploy-your-site'},
        {label: 'Translate your site', to: '/docs/tutorial-extras/translate-your-site'},
        {label: 'Docs versioning', to: '/docs/tutorial-extras/manage-docs-versions'},
      ],
    },
    {
      title: 'Live Code',
      links: [
        {label: 'PTB Builder', to: '/docs/live-code-example/ptb-builder'},
        {label: 'Transfer', to: '/docs/live-code-example/transfer'},
      ],
    },
    {
      title: 'References',
      links: [
        {label: 'Docusaurus Docs', href: 'https://docusaurus.io/docs'},
        {label: 'Sui Docs', href: 'https://docs.sui.io/'},
        {label: 'Sui GitHub', href: 'https://github.com/MystenLabs/sui'},
        {label: 'DevGru Repo', href: 'https://github.com/suidevgru/suidevgru.github.io'},
      ],
    },
    {
      title: 'Resources',
      links: [
        {label: 'Issues', href: 'https://github.com/suidevgru/suidevgru.github.io/issues'},
        {label: 'Discussions', href: 'https://github.com/suidevgru/suidevgru.github.io/discussions'},
        {label: 'Releases', href: 'https://github.com/suidevgru/suidevgru.github.io/releases'},
        {label: 'Pull requests', href: 'https://github.com/suidevgru/suidevgru.github.io/pulls'},
      ],
    },
  ];

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.hero}>
          <div className={styles.statusRow}>
            <span className={styles.statusPill}>{'WIP'}</span>
            <span className={styles.statusText}>
              {'Homepage content is a draft. Links will be curated.'}
            </span>
          </div>
          <Heading as="h1" className={styles.title}>
            {'DevGru'}
          </Heading>
          <p className={styles.subtitle}>
            {'A lightweight landing page for docs, guides, and references.'}
          </p>
          <div className={styles.ctaRow}>
            <Link className="button button--primary button--lg" to="/docs/intro">
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
              <Link className={styles.ctaCardLink} to="/docs/intro">
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
