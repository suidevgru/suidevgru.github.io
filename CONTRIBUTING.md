# Contributing to Sui DevGru 🤝

Thank you for your interest in contributing! This learning hub is **built by the community, for the community** — every contribution, big or small, makes a difference. This repository contains curriculum content, interactive tutorials, and the infrastructure that powers the learning experience.

> Sui DevGru is not just documentation — it includes live coding modules, interactive PTB Builder lessons, and browser-based Move execution environments. Your contributions help learners worldwide go from zero to deployed dApp.

---

## 🎯 Our Philosophy

Sui DevGru is built around one principle: **execution-first learning**.

We believe beginners learn best by *doing*, not just reading. That means every unit prioritizes hands-on steps, live validation, and immediate feedback. When contributing, please keep this in mind — if a concept can be demonstrated with a real transaction or a working code snippet, it should be.

If something confused you as a learner, it's almost certainly confusing others too. That's a valid and valuable contribution.

---

## 🌐 Translators Welcome

We'd love to make Sui development accessible to learners worldwide.

**Currently supported languages:**
- 🇺🇸 English *(in progress)*
- 🇯🇵 日本語 (Japanese)
- 🇰🇷 한국어 (Korean)

If you'd like to add a new language or improve an existing translation:

1. Check [`specs/translation-glossary.md`](./specs/translation-glossary.md) for terminology conventions. Following the glossary is required for consistency.
2. Create or edit files under the appropriate locale folder (e.g., `i18n/ja/`, `i18n/ko/`).
3. Open a Pull Request with the language tag in the title, e.g. `[ja] Translate Unit 3`.

**Translation guidelines:**
- No machine-generated translations (Google Translate, DeepL, etc.) — human fluency in the target language is required.
- Capture the *meaning*, not a word-for-word literal translation; adapt to your language's natural conventions.
- Keep code snippets untranslated; only translate surrounding prose and UI labels.
- When in doubt about a technical term, refer to the glossary or open an issue to discuss it.

> No translation experience needed — fluency in the target language is enough. We'll review together. 😊

---

## ✏️ Typos & Curriculum Improvements

Spotted a typo? Think a unit could be explained better? You're welcome to fix it!

- **Typo / grammar fix** → Edit the file directly and open a PR. No issue needed.
- **Curriculum suggestion** → Open an [Issue](../../issues/new) describing:
  - Which unit or section you're referring to
  - What the current explanation says
  - What you'd suggest instead, and why it's clearer for beginners

We especially value suggestions that improve clarity for first-timers. If a step felt ambiguous or the expected output wasn't clear, that's exactly the kind of thing we want to fix.

---

## 🧩 Technical Contributions

Sui DevGru is more than a docs site — it's an interactive learning platform. We also welcome improvements to:

- **Interactive tutorials** (`src/tutorials/`) — the step-by-step lesson engine
- **PTB Builder integrations** — embedded Programmable Transaction Block walkthroughs
- **Move Playground components** — browser-based WASM Move execution environments
- **Localization infrastructure** — i18n config, locale routing, and tooling

For technical contributions, please open an [Issue](../../issues/new) first to discuss the approach before building — especially for anything touching the tutorial engine or playground components.

---

## 🛠️ How to Contribute (Quick Start)

```bash
# 1. Fork and clone the repo
git clone https://github.com/<your-username>/suidevgru.github.io.git

# 2. Install dependencies
npm install

# 3. Start local dev server
npm run start

# 4. Make your changes, then open a Pull Request
```

---

## 📋 Pull Request Checklist

- [ ] The change is scoped to one topic or unit
- [ ] The change aligns with the execution-first learning philosophy
- [ ] If translating, the glossary conventions in `translation-glossary.md` are followed
- [ ] No machine-generated translations
- [ ] Markdown renders correctly locally (`npm run start`)
- [ ] For technical changes, an issue was opened first to align on approach

---

## 💬 Questions?

Feel free to open an [Issue](../../issues/new) or start a [Discussion](../../discussions). We're happy to help you get started.
