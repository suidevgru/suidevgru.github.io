---
sidebar_position: 2
---

# 사이트 번역하기

`docs/intro.md`를 프랑스어로 번역해 봅시다.

## i18n 설정하기

`docusaurus.config.js`를 수정하여 `fr` 로케일 지원을 추가합니다.

```js title="docusaurus.config.js"
export default {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
  },
};
```

## 문서 번역하기

`docs/intro.md` 파일을 `i18n/fr` 폴더로 복사합니다.

```bash
mkdir -p i18n/fr/docusaurus-plugin-content-docs/current/

cp docs/intro.md i18n/fr/docusaurus-plugin-content-docs/current/intro.md
```

`i18n/fr/docusaurus-plugin-content-docs/current/intro.md`를 프랑스어로 번역합니다.

## 로케일 사이트 실행하기

프랑스어 로케일로 사이트를 실행합니다.

```bash
npm run start -- --locale fr
```

로컬라이즈된 사이트는 [http://localhost:3000/fr/](http://localhost:3000/fr/)에서 확인할 수 있으며, `Getting Started` 페이지가 번역됩니다.

:::caution

개발 모드에서는 한 번에 하나의 로케일만 사용할 수 있습니다.

:::

## 로케일 드롭다운 추가하기

언어 간을 자연스럽게 이동하려면 로케일 드롭다운을 추가하세요.

`docusaurus.config.js`를 수정합니다.

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

이제 네브바에 로케일 드롭다운이 표시됩니다.

![Locale Dropdown](./img/localeDropdown.png)

## 로컬라이즈된 사이트 빌드하기

특정 로케일만 빌드합니다.

```bash
npm run build -- --locale fr
```

또는 한 번에 모든 로케일을 포함해 빌드할 수도 있습니다.

```bash
npm run build
```

