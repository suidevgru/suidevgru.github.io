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
| Chrome extension | 크롬 확장 프로그램 |  | UI labels may say “Chrome Web Store”, “Add to Chrome”, etc. Keep UI text as-is. |
| Browser extension | 브라우저 확장 프로그램 |  | Preferred generic term in narrative text. |
| Chrome Web Store | Chrome Web Store |  | UI string: keep as-is. |
| Add to Chrome | Add to Chrome |  | UI string: keep as-is. |
| Add extension | Add extension |  | UI string: keep as-is. |
| Toolbar | 도구 모음 |  | Often appears with “Pin”. |
| Pin (an extension) | 고정(핀 고정) |  | Prefer “고정”; add “핀” only if needed for clarity. |
| Passphrase | 복구 구문 |  | For wallet context, consider first-use expansion: “복구 구문(시드 구문, 12단어)”. |
| Seed phrase | 시드 구문 |  | Often explained alongside “복구 구문”. |
| Recovery phrase | 복구 구문 |  | Prefer “복구 구문” as the primary term. |
| Wallet | 지갑 |  |  |
| Slush wallet | Slush 지갑 |  | Product name stays in English. |
| Account | 계정 |  |  |
| Address | 주소 |  | Usually “지갑 주소” in context. |
| Settings | 설정 |  | If it’s a UI label, keep “Settings” and optionally explain “설정”. |
| Social Login | 소셜 로그인 |  |  |
| Passphrase account | 패스프레이즈 계정 |  | UI label may be “Create a passphrase account”; keep UI text as-is. |
| Network | 네트워크 |  |  |
| Devnet | Devnet |  | Keep as-is; optionally explain “개발 네트워크”. |
| Testnet | Testnet |  | Keep as-is; optionally explain “테스트 네트워크”. |
| Mainnet | Mainnet |  | Keep as-is; optionally explain “메인 네트워크”. |
| Faucet | Faucet |  | Keep “Faucet” as-is in Korean docs (optionally explain “테스트 토큰 지급” on first use). |
| Token | 토큰 |  |  |
| Test tokens | 테스트 토큰 |  |  |
| SUI | SUI |  | Token symbol stays in English. |
| Sui CLI | Sui CLI |  | Prefer keeping the product name in English. |
| CLI | CLI(커맨드라인) |  | First use can expand to “커맨드라인(CLI)”. |
| Command line tools | 커맨드라인 도구 |  |  |
| dApp | dApp(디앱) |  | Consider first-use: “dApp(디앱, 분산형 앱)”. |
| Transaction | 트랜잭션 |  |  |
| Sign (a transaction) | 서명하다 |  | Verb form. |
| Signature | 서명 |  | If you need the noun “signature value”, use “서명값” in Notes on the page. |

## Usage examples

- Narrative: “Install the Chrome extension.” → “크롬 확장 프로그램을 설치합니다.”
- UI: Click “More options” → “화면 하단의 ‘More options’를 클릭합니다”
