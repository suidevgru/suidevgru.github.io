---
sidebar_position: 1
---

# チュートリアル概要

**5分以内でDocusaurus**を体験してみましょう。

## はじめに

まずは**新しいサイトを作成**してみてください。

また、**[docusaurus.new](https://docusaurus.new)** を使って **Docusaurusをすぐに試す**こともできます。

### 必要なもの

- [Node.js](https://nodejs.org/en/download/) version 20.0 or above:
  - Node.jsのインストール時は、依存関係に関するチェックボックスをすべて選択することを推奨します。

## 新しいサイトを生成

**classic テンプレート**を使って新しいDocusaurusサイトを生成します。

次のコマンドを実行すると、classic テンプレートがプロジェクトに自動で追加されます。

```bash
npm init docusaurus@latest my-website classic
```

このコマンドは、Command Prompt、PowerShell、Terminal、またはエディタに組み込まれたターミナルなどで実行できます。

また、Docusaurusの実行に必要な依存関係もあわせてインストールされます。

## サイトを起動

開発サーバーを起動します。

```bash
cd my-website
npm run start
```

`cd` コマンドは作業ディレクトリを変更します。新しく作成したDocusaurusサイトで作業するには、そのディレクトリへ移動する必要があります。

`npm run start` コマンドはサイトをローカルでビルドし、開発サーバーとして提供します。http://localhost:3000/ で確認できます。

`docs/intro.md`（このページ）を開いて数行編集してみてください。サイトは**自動的にリロード**され、変更がすぐに反映されます。
