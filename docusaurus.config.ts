import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'DevGru',
  tagline: 'DevGru',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://suidevgru.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'suidevgru', // Usually your GitHub org/user name.
  projectName: 'suidevgru.github.io', // Usually your repo name.

  onBrokenLinks: 'throw',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ja', 'ko'],
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
      },
      ja: {
        label: '日本語',
        direction: 'ltr',
        htmlLang: 'ja-JP',
      },
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko-KR',
      },
    },
  },

  themes: ['@docusaurus/theme-live-codeblock'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/suidevgru/suidevgru.github.io',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/sui-devgru-banner.png',
    metadata: [
      { name: 'description', content: 'Execution-first, hands-on Sui developer education. Learn by building real projects and executing real code through open-source practice.' },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      items: [
        ({type: 'custom-devgru-logo', position: 'left'} as any),
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Get Started',
        },
        {type: 'localeDropdown', position: 'right'},
        ({type: 'custom-wallet', position: 'right'} as any),
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Core',
          items: [
            {
              label: 'Sui Documentation',
              href: 'https://docs.sui.io/',
            },
            {
              label: 'Sui GitHub',
              href: 'https://github.com/MystenLabs/sui',
            },
            {
              label: 'Sui CLI Reference',
              href: 'https://docs.sui.io/references/cli/client',
            },
            {
              label: 'Sui SDKs',
              href: 'https://docs.sui.io/references/sui-sdks',
            },
          ],
        },
        {
          title: 'Move',
          items: [
            {
              label: 'Move Language Docs',
              href: 'https://move-language.github.io/move/',
            },
            {
              label: 'Sui Move Intro Course',
              href: 'https://github.com/sui-foundation/sui-move-intro-course',
            },
            {
              label: 'Example Projects',
              href: 'https://github.com/MystenLabs/sui/tree/main/examples',
            },
            {
              label: 'App Examples',
              href: 'https://docs.sui.io/guides/developer/app-examples',
            },
          ],
        },
        {
          title: 'Project',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/suidevgru/suidevgru.github.io',
            },
            {
              label: 'Issues',
              href: 'https://github.com/suidevgru/suidevgru.github.io/issues',
            },
            {
              label: 'Contribute',
              href: 'https://github.com/suidevgru/suidevgru.github.io/blob/main/CONTRIBUTING.md',
            },
          ],
        },
        {
          title: 'Community',
          items: [],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
