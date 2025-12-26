---
sidebar_position: 2
---

# サイトを翻訳する

`docs/intro.md` をフランス語に翻訳してみましょう。

## i18n を設定する

`docusaurus.config.js` を編集して `fr` ロケールのサポートを追加します。

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## ドキュメントを翻訳する

`docs/intro.md` を `i18n/fr` フォルダにコピーします。

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

`i18n/fr/docusaurus-plugin-content-docs/current/intro.md` をフランス語に翻訳します。

## ローカライズされたサイトを起動する

フランス語ロケールでサイトを起動します。

```bash
npm run start -- --locale fr
```

ローカライズされたサイトは [http://localhost:3000/fr/](http://localhost:3000/fr/) からアクセスでき、`Getting Started` ページが翻訳されます。

:::caution

開発モードでは、一度に1つのロケールしか使用できません。

:::

## ロケールドロップダウンを追加する

言語間をスムーズに移動するために、ロケールドロップダウンを追加します。

`docusaurus.config.js` を編集します。

```js title="docusaurus.config.js"
export default {
  themeConfig: {
    navbar: {
      items: [
        // highlight-start
        {
          type: 'localeDropdown',
        },
        // highlight-end
      ],
    },
  },
};
```

これでナビバーにロケールドロップダウンが表示されます。

![Locale Dropdown](./img/localeDropdown.png)

## ローカライズされたサイトをビルドする

特定のロケールだけをビルドします。

```bash
npm run build -- --locale fr
```

または、すべてのロケールを一度に含めてビルドすることもできます。

```bash
npm run build
```

