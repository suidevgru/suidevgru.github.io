# Translation Glossary (EN ⇄ KO ⇄ JA)

This glossary is the source of truth for consistent terminology across English, Korean, and Japanese docs.

## Purpose

1. Reference for consistency when running auto-translation or doing manual review.
2. A living glossary: keep extending it whenever new terms appear or consistency becomes important.

## Rules

- **Narrative text** (normal sentences): use the localized term from this glossary.
- **UI strings** (button labels, menu names, exact on-screen text): keep the **original UI text** as-is (usually English), optionally followed by a short localized explanation.
- If a term has multiple natural translations, pick **one preferred term** and list alternatives in **Notes**.

## Glossary

| English | 한국어 (KO) | 日本語 (JA) | Notes |
|---|---|---|---|
| Chrome extension | 크롬 확장 프로그램 | Chrome拡張機能 | UI labels may say "Chrome Web Store", "Add to Chrome", etc. Keep UI text as-is. |
| Browser extension | 브라우저 확장 프로그램 | ブラウザ拡張機能 | Preferred generic term in narrative text. |
| Chrome Web Store | Chrome Web Store | Chrome Web Store | UI string: keep as-is. |
| Add to Chrome | Add to Chrome | Add to Chrome | UI string: keep as-is. |
| Add extension | Add extension | Add extension | UI string: keep as-is. |
| Toolbar | 도구 모음 | ツールバー | Often appears with "Pin". |
| Pin (an extension) | 고정(핀 고정) | ピン留め（固定） | Prefer "고정"; add "핀" only if needed for clarity. |
| Passphrase | 복구 구문 | パスフレーズ | For wallet context, consider first-use expansion: "복구 구문(시드 구문, 12단어)". |
| Seed phrase | 시드 구문 | シードフレーズ | Often explained alongside "복구 구문". |
| Recovery phrase | 복구 구문 | リカバリーフレーズ | Prefer "복구 구문" as the primary term. |
| Wallet | 지갑 | ウォレット |  |
| Slush wallet | Slush 지갑 | Slushウォレット | Product name stays in English. |
| Account | 계정 | アカウント |  |
| Address | 주소 | アドレス | Usually "지갑 주소" in context. |
| Settings | 설정 | 設定 | If it's a UI label, keep "Settings" and optionally explain "설定". |
| Social Login | 소셜 로그인 | ソーシャルログイン |  |
| Passphrase account | 패스프레이즈 계정 | パスフレーズアカウント | UI label may be "Create a passphrase account"; keep UI text as-is. |
| Network | 네트워크 | ネットワーク |  |
| Devnet | Devnet | Devnet | Keep as-is; optionally explain "개발 네트워크", "開発ネットワーク". |
| Testnet | Testnet | Testnet | Keep as-is; optionally explain "테스트 네트워크", "テストネットワーク". |
| Mainnet | Mainnet | Mainnet | Keep as-is; optionally explain "메인 네트워크", "メインネットワーク". |
| Faucet | Faucet | Faucet | Keep "Faucet" as-is in Korean docs (optionally explain "테스트 토큰 지급", "テストトークン配布" on first use). |
| Token | 토큰 | トークン |  |
| Test tokens | 테스트 토큰 | テストトークン |  |
| SUI | SUI | SUI | Token symbol stays in English. |
| Sui CLI | Sui CLI | Sui CLI | Prefer keeping the product name in English. |
| CLI | CLI(커맨드라인) | CLI（コマンドライン） | First use can expand to "커맨드라인(CLI)", "コマンドライン（CLI）". |
| Command line tools | 커맨드라인 도구 | コマンドラインツール |  |
| dApp | dApp(디앱) | dApp（分散型アプリ） | Consider first-use: "dApp(디앱, 분산형 앱)", "dApp（分散型アプリ）". |
| Transaction | 트랜잭션 | トランザクション |  |
| Sign (a transaction) | 서명하다 | 署名する | Verb form. |
| Signature | 서명 | 署名 | If you need the noun "signature value", use "서명값", "署名値" in Notes on the page. |

## Usage examples

- Narrative: "Install the Chrome extension."
  - KO: "크롬 확장 프로그램을 설치합니다."
  - JA: "Chrome拡張機能をインストールします。"
- UI: Click "More options"
  - KO: "화면 하단의 'More options'를 클릭합니다"
  - JA: "画面下部の「More options」をクリックします"
