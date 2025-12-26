---
sidebar_position: 0
title: "Unit 1: 環境構築"
description: "Suiの開発環境を構築し、Devnetに接続します"
---

# Unit 1: 環境構築

Suiの開発環境を構築し、Devnetに接続してFaucetでテストトークンを取得するまでを学びます。

## Goal

このUnitを完了すると、以下ができるようになります：

- Slushウォレットがインストールされ、アドレスが表示される
- ウォレットがDevnetに接続されている
- Sui CLIがインストールされ、Devnetに接続されている
- Faucetからテストトークンを取得できる

## Lessons

| Lesson | Title | Goal |
|:--|:--|:--|
| [L1](./L01-install-slush.mdx) | Slushウォレットを入れる | ウォレットをインストールする |
| L2 | Devnetに切り替える | ネットワークをDevnetに変更する |
| L3 | Sui CLIをインストールする | コマンドラインツールを導入する |
| L4 | VSCode + Sui Extension | Move開発環境を整える |
| L5 | CLIをDevnetに接続する | CLIのネットワーク設定を行う |
| L6 | Faucetでトークンを取得する | テストSUIを入手する |

## Checkpoint

以下を確認できればUnit 1は完了です：

- `sui client active-env` が `devnet` を返す
- `sui client gas` で残高が表示される

## 使用ツール

- **Slush**: Suiウォレット（ブラウザ拡張）
- **Sui CLI**: コマンドラインツール
- **Sui Extension**: VSCodeのMove開発拡張

---

**Next**: [L1 - Slushウォレットを入れる](./L01-install-slush.mdx)
