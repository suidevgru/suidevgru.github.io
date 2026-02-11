import React, {type ReactNode, useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './HomepageLanding.module.css';
import SuiDevgruLogo from './SuiDevgruLogo';

type FeatureSlide = {
  title: string;
  description: string;
  image: string;
  to: string;
  ctaLabel: string;
};

type Card = {
  title: string;
  description: string;
  overviewTo?: string;
  kind?: 'default' | 'comingSoon';
};

type FeatureSlideDef = {
  image: string;
  to: string;
  titleI18nId: string;
  titleDefault: string;
  descriptionI18nId: string;
  descriptionDefault: string;
  ctaI18nId: string;
  ctaDefault: string;
};

type CardDef = {
  overviewTo?: string;
  kind?: 'default' | 'comingSoon';
  titleI18nId: string;
  titleDefault: string;
  descriptionI18nId: string;
  descriptionDefault: string;
};

const FEATURE_SLIDE_DEFS: FeatureSlideDef[] = [
  {
    titleI18nId: 'homepage.feature.liveEditor.title',
    titleDefault: 'Live Editor',
    descriptionI18nId: 'homepage.feature.liveEditor.description',
    descriptionDefault: 'Edit and run code directly inside the lesson page.',
    image: '/img/home/carousel-liveeditor.png',
    to: '/docs/live-code-example/transfer',
    ctaI18nId: 'homepage.feature.liveEditor.cta',
    ctaDefault: 'Open Live Editor',
  },
  {
    titleI18nId: 'homepage.feature.ptbBuilder.title',
    titleDefault: 'PTB Builder',
    descriptionI18nId: 'homepage.feature.ptbBuilder.description',
    descriptionDefault: 'Build programmable transaction blocks with a visual workflow.',
    image: '/img/home/carousel-ptb-builder.png',
    to: '/docs/live-code-example/ptb-builder',
    ctaI18nId: 'homepage.feature.ptbBuilder.cta',
    ctaDefault: 'Open PTB Builder',
  },
  {
    titleI18nId: 'homepage.feature.movePlayground.title',
    titleDefault: 'WASM Move Playground',
    descriptionI18nId: 'homepage.feature.movePlayground.description',
    descriptionDefault: 'Compile and test Move packages in-browser without local setup.',
    image: '/img/home/carousel-move-playground.png',
    to: '/docs/live-code-example/move-playground',
    ctaI18nId: 'homepage.feature.movePlayground.cta',
    ctaDefault: 'Open Move Playground',
  },
];

const CARD_DEFS: CardDef[] = [
  {
    titleI18nId: 'homepage.card.getStarted.title',
    titleDefault: 'Get Started',
    descriptionI18nId: 'homepage.card.getStarted.description',
    descriptionDefault: 'Set up your wallet, CLI, and Devnet environment.',
    overviewTo: '/docs/getting-started',
  },
  {
    titleI18nId: 'homepage.card.beginner.title',
    titleDefault: 'Beginner',
    descriptionI18nId: 'homepage.card.beginner.description',
    descriptionDefault: 'Follow a guided path from basics to your first dApp.',
    overviewTo: '/docs/category/beginner-course',
  },
  {
    titleI18nId: 'homepage.card.advanced.title',
    titleDefault: 'Advanced',
    descriptionI18nId: 'homepage.card.advanced.description',
    descriptionDefault: 'Explore advanced patterns for production-ready Sui apps.',
    overviewTo: '/docs/category/advanced-course',
  },
  {
    titleI18nId: 'homepage.card.comingSoon.title',
    titleDefault: 'Coming Soon',
    descriptionI18nId: 'homepage.card.comingSoon.description',
    descriptionDefault: 'New tracks and practical labs are on the way.',
    kind: 'comingSoon',
  },
];

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

function ArrowLeftIcon(): ReactNode {
  return (
    <svg className={styles.carouselArrowIcon} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarouselRightIcon(): ReactNode {
  return (
    <svg className={styles.carouselArrowIcon} width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GroupCard({card}: {card: Card}): ReactNode {
  const isComingSoon = card.kind === 'comingSoon';
  return (
    <div className={styles.cardShell}>
      <div className={`${styles.cardInner} ${isComingSoon ? styles.cardInnerComingSoon : ''}`.trim()}>
        <h4 className={styles.cardHeading}>{card.title}</h4>
        <p className={styles.cardDescription}>{card.description}</p>
        {isComingSoon ? (
          <p className={styles.comingSoonPill}>
            <Translate id="homepage.card.comingSoon.badge">Coming Soon</Translate>
          </p>
        ) : (
          <Link className={styles.cardLink} to={card.overviewTo ?? '#'}>
            <span className={styles.cardLinkLabel}>
              <Translate id="homepage.card.openOverview">Open Overview</Translate>
            </span>
            <ArrowRightIcon />
          </Link>
        )}
      </div>
    </div>
  );
}

export default function HomepageLanding(): ReactNode {
  const SLIDE_ANIMATION_LOCK_MS = 360;
  const featureSlides: FeatureSlide[] = FEATURE_SLIDE_DEFS.map((item) => ({
    title: translate({id: item.titleI18nId, message: item.titleDefault}),
    description: translate({id: item.descriptionI18nId, message: item.descriptionDefault}),
    image: item.image,
    to: item.to,
    ctaLabel: translate({id: item.ctaI18nId, message: item.ctaDefault}),
  }));
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionLockRef = useRef(false);
  const activeSlideIndexRef = useRef(0);
  const transitionUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeSlide = featureSlides[activeSlideIndex];
  const cards: Card[] = CARD_DEFS.map((item) => ({
    title: translate({id: item.titleI18nId, message: item.titleDefault}),
    description: translate({id: item.descriptionI18nId, message: item.descriptionDefault}),
    overviewTo: item.overviewTo,
    kind: item.kind,
  }));

  useEffect(() => {
    activeSlideIndexRef.current = activeSlideIndex;
  }, [activeSlideIndex]);

  useEffect(() => {
    return () => {
      if (transitionUnlockTimerRef.current) {
        clearTimeout(transitionUnlockTimerRef.current);
      }
      transitionLockRef.current = false;
    };
  }, []);

  const transitionToSlide = (nextIndex: number, direction: 'next' | 'prev'): void => {
    const currentIndex = activeSlideIndexRef.current;
    if (nextIndex === currentIndex || transitionLockRef.current) {
      return;
    }
    transitionLockRef.current = true;

    if (transitionUnlockTimerRef.current) {
      clearTimeout(transitionUnlockTimerRef.current);
    }

    setSlideDirection(direction);
    setIsTransitioning(true);
    setActiveSlideIndex(nextIndex);

    transitionUnlockTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      transitionUnlockTimerRef.current = null;
      transitionLockRef.current = false;
    }, SLIDE_ANIMATION_LOCK_MS);
  };

  const showPrevSlide = (): void => {
    const nextIndex = (activeSlideIndexRef.current - 1 + featureSlides.length) % featureSlides.length;
    transitionToSlide(nextIndex, 'prev');
  };

  const showNextSlide = (): void => {
    const nextIndex = (activeSlideIndexRef.current + 1) % featureSlides.length;
    transitionToSlide(nextIndex, 'next');
  };

  const getDirectionToIndex = (targetIndex: number): 'next' | 'prev' => {
    const total = featureSlides.length;
    const currentIndex = activeSlideIndexRef.current;
    const forward = (targetIndex - currentIndex + total) % total;
    const backward = (currentIndex - targetIndex + total) % total;
    return forward <= backward ? 'next' : 'prev';
  };

  return (
    <div className={styles.root}>
      <div className="container">
        <div className={styles.heroSection}>
          <Heading as="h1" className={styles.title}>
            <span className={styles.heroLogo}>
              <SuiDevgruLogo size="hero" />
            </span>
          </Heading>
          <p className={styles.subtitle}>
            <strong>
              <Translate id="homepage.hero.subtitle">Learn. Execute.</Translate>
            </strong>
          </p>
        </div>

        <div className={styles.carouselSection}>
          <div className={styles.carouselFrame}>
            <article
              key={activeSlide.title}
              className={styles.carouselSlide}>
              <div className={styles.carouselMediaWrap}>
                <img
                  className={`${styles.carouselImage} ${
                    slideDirection === 'next' ? styles.carouselImageEnterNext : styles.carouselImageEnterPrev
                  }`.trim()}
                  src={activeSlide.image}
                  alt={translate({
                    id: 'homepage.carousel.imageAlt',
                    message: '{title} screenshot',
                  }, {
                    title: activeSlide.title,
                  })}
                  loading="lazy"
                />
              </div>
              <div className={styles.carouselContent}>
                <h3 className={styles.carouselTitle}>{activeSlide.title}</h3>
                <p className={styles.carouselDescription}>{activeSlide.description}</p>
                <Link className={styles.carouselCta} to={activeSlide.to}>
                  <span>{activeSlide.ctaLabel}</span>
                  <ArrowRightIcon />
                </Link>
              </div>
            </article>

            <button
              className={`${styles.carouselNavButton} ${styles.carouselNavPrev}`.trim()}
              type="button"
              onClick={showPrevSlide}
              disabled={isTransitioning}
              aria-label={translate({
                id: 'homepage.carousel.prev',
                message: 'Previous feature',
              })}>
              <ArrowLeftIcon />
            </button>
            <button
              className={`${styles.carouselNavButton} ${styles.carouselNavNext}`.trim()}
              type="button"
              onClick={showNextSlide}
              disabled={isTransitioning}
              aria-label={translate({
                id: 'homepage.carousel.next',
                message: 'Next feature',
              })}>
              <CarouselRightIcon />
            </button>
          </div>

          <div
            className={styles.carouselDots}
            aria-label={translate({
              id: 'homepage.carousel.dotsLabel',
              message: 'Feature slides',
            })}>
            {featureSlides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                className={`${styles.carouselDot} ${index === activeSlideIndex ? styles.carouselDotActive : ''}`.trim()}
                onClick={() =>
                  transitionToSlide(index, getDirectionToIndex(index))
                }
                disabled={isTransitioning}
                aria-label={translate({
                  id: 'homepage.carousel.goToSlide',
                  message: 'Go to {title}',
                }, {
                  title: slide.title,
                })}
                aria-current={index === activeSlideIndex ? 'true' : undefined}
              />
            ))}
          </div>
        </div>

        <div className={styles.cardsWrap}>
          {cards.map((card) => (
            <GroupCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
}
