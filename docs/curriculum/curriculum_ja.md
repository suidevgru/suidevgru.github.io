# Sui初心者向けチュートリアルカリキュラム

## サマリー

Suiの基礎からdApp開発まで、段階的に学ぶカリキュラム。初心者トラック（Module 1-5）で「書く→デプロイ→実行→PTBで合成」の開発フローを1周体験し、上級トラック（Module 6）で高度なパターンを学びます。

### 初心者トラック（Module 1-5）

| モジュール | 内容 | ゴール |
|:--|:--|:--|
| 1 | 環境構築（CLI・Wallet・VSCode） | 開発環境が整い、Devnetに接続できる |
| 2 | Devnetでの実践 + PTB Builder | トランザクションの仕組みを体感し、PTB Builderで操作を合成できる |
| 3 | Move最小限（書く→デプロイ→呼び出し） | 自分のコントラクトをpublishし、1回呼び出せる |
| 4 | TypeScript SDK最小核 | TSでPTBを組み、署名→実行→結果確認ができる |
| 5 | キャップストーン + Walrus Sites | Move + フロントを統合したdAppを公開できる |

### 上級トラック（Module 6）

| モジュール | 内容 |
|:--|:--|
| 6 | Advanced Move + SDK応用 |

**前提ネットワーク:** Devnet

---

## Module 1: 環境構築

開発に必要なツールをすべてセットアップし、Devnetに接続する。

### 1.1 基礎概念

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 1.1.1 | ブロックチェーンの基本 | 分散台帳、コンセンサス、トランザクションを理解する | 簡単な例で概念確認 |
| 1.1.2 | Suiのオブジェクト中心モデル | Suiの所有権モデル（Address-owned / Shared / Immutable）を理解する | 所有権の例を確認 |

### 1.2 開発環境セットアップ

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 1.2.1 | Slush（ウォレット）導入 | ブラウザ拡張をインストールし、アドレスを作成する | 新規作成→バックアップ→Devnet切替 |
| 1.2.2 | Sui CLI導入 | `suiup`でCLIをインストールし、初期設定を完了する | `suiup` → `sui --version` → `sui client` |
| 1.2.3 | VSCode + Sui Extension | Move開発環境を整備する | Sui Extensionインストール→シンタックスハイライト確認 |
| 1.2.4 | Devnet接続 | CLIをDevnetに接続する | `sui client switch --env devnet` → 確認 |
| 1.2.5 | Faucetでトークン取得 | テストSUIを取得する | `sui client faucet` → `sui client gas` |

**Checkpoint:** `sui client active-env` が `devnet` を返し、残高が表示されればOK

---

## Module 2: Devnetでの実践

Devnet上でトランザクションを実行し、PTB Builderで操作を合成する体験をする。

### 2.1 トランザクションとオブジェクト

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 2.1.1 | Explorerでtxを読む | トランザクションの入力/出力/オブジェクト変化を読めるようになる | 送金tx → Explorerで確認 |
| 2.1.2 | 送金とガス | ガス費用の感覚をつかむ | 少額送金 → 残高差分を観察 |

### 2.2 PTB Builderで合成体験

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 2.2.1 | PTB Builder入門 | GUIで複数操作を1txにまとめる方法を体験する | PTB Builderで送金+送金を合成→実行 |
| 2.2.2 | PTB → TypeScript Export | GUIで作ったPTBをTSコードに変換する流れを理解する | Export → コードを確認 → Module 4で再現予告 |

**Checkpoint:** PTB Builderで2操作を合成したtxが成功すればOK

---

## Module 3: Move最小限

最短で「書く→デプロイ→呼び出し」を達成する。高度なパターンはModule 6へ。

### 3.1 はじめてのMove

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 3.1.1 | Moveの概要 | リソース・モジュール・パッケージの考え方を掴む | 構造を読む |
| 3.1.2 | プロジェクト作成 | Moveパッケージを作成できる | `sui move new` → `Move.toml`確認 |
| 3.1.3 | 最小コントラクト実装 | struct / entry functionを実装できる | カウンター or Greeting を実装 |
| 3.1.4 | ビルドとテスト | ローカルでビルド・テストできる | `sui move build` → `sui move test` |

### 3.2 デプロイと呼び出し

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 3.2.1 | Devnetにpublish | コントラクトをデプロイし、Package IDを取得できる | `sui client publish` → Explorer確認 |
| 3.2.2 | Explorerから関数を呼び出す | GUIでコントラクトの関数を実行できる | ExplorerでPackage ID検索 → Execute → 結果確認 |
| 3.2.3 | CLIから関数を呼び出す | CLIでコントラクトの関数を実行できる | `sui client call` → 結果確認 |

**Checkpoint:** 自分のコントラクトをpublishし、Explorer・CLI両方から呼び出しが成功すればOK

---

## Module 4: TypeScript SDK最小核

PTBをTSで組み、署名→実行→結果確認までを達成する。高度な機能はModule 6へ。

### 4.1 SDK基礎

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 4.1.1 | SDKの全体像 | `@mysten/sui`と`@mysten/dapp-kit`の役割を理解する | パッケージ構成を確認 |
| 4.1.2 | SuiClientで接続 | ネットワーク接続とデータ取得ができる | `getBalance`をlive実行 |
| 4.1.3 | Transactionクラス | PTBをTSで構築できる | Module 2のPTBをTSで再現 |

### 4.2 署名と実行

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 4.2.1 | Provider構成 | dApp Kitの基盤を理解する | Provider階層を確認 |
| 4.2.2 | ウォレット接続 | ConnectButtonでウォレット連携できる | 接続→アドレス表示 |
| 4.2.3 | tx署名と実行 | フロントからtxを署名・送信できる | `useSignAndExecuteTransaction`でModule 3のコントラクト呼び出し |
| 4.2.4 | 結果確認 | tx結果をUIに反映できる | 成功/失敗をUIに表示 |

**Checkpoint:** TSで組んだtxがウォレット署名→実行→結果表示まで動けばOK

---

## Module 5: キャップストーン

Move + フロントを統合したdAppをWalrus Sitesで公開する。

### 5.1 dApp統合

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 5.1.1 | プロジェクト設計 | Move + フロントの全体像を整理する | 構成を確認 |
| 5.1.2 | 統合実装 | Module 3のコントラクト + Module 4のフロントを統合する | ローカルで動作確認 |

### 5.2 Walrus Sitesデプロイ

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 5.2.1 | site-builderセットアップ | デプロイツールを準備する | site-builder導入 |
| 5.2.2 | デプロイと公開 | ビルドしたフロントを公開する | `site-builder deploy` → URL確認 |

### 5.3 完了と次のステップ

| ページID | タイトル | 学習目標 | ハンズオン |
|:--|:--|:--|:--|
| 5.3.1 | 振り返り | 学んだ内容を整理する | チェックリスト確認 |
| 5.3.2 | 上級トラックへ | Module 6で学ぶ内容を把握する | 目次確認 |

**Checkpoint:** dAppがWalrus SitesのURLで動作すればOK

---

## Module 6: Advanced Move + SDK応用（上級トラック）

Module 3・4から移動した高度なトピックを扱う。

### 6.1 Move高度なパターン

- **Ability詳細** - copy / drop / store / key の組み合わせパターン
- **Generics** - 型パラメータ、phantom type
- **OTW / init関数** - パッケージ初期化、Publisher取得
- **イベント** - `sui::event::emit`、オフチェーン追跡
- **Shared Object** - コンセンサス、コスト特性
- **Dynamic Field** - 親子オブジェクト関係
- **Collections** - Table、Bag、ObjectTable、ObjectBag
- **Witness Pattern** - 型レベル認証
- **Hot Potato Pattern** - 強制消費
- **Capability Pattern** - AdminCap、権限制御
- **UpgradeCap** - パッケージアップグレード
- **Kiosk / TransferPolicy** - NFT取引標準
- **BCS** - バイナリシリアライゼーション
- **Enum / Match** - Move 2024新機能

### 6.2 SDK応用

- **Dry Run** - トランザクションシミュレーション
- **イベントクエリ** - `queryEvents`
- **スポンサードTx** - ガスレスUX
- **GraphQL API** - 柔軟なデータクエリ
- **zkLogin** - OAuth認証によるウォレット生成
- **Kiosk SDK** - NFTマーケットプレイス
- **BCS (SDK)** - フロントエンド⇔コントラクト連携
- **Multisig** - マルチシグウォレット

### 6.3 Sui Stack

- **Walrus** - 分散ストレージ詳細
- **Seal** - 暗号化
- **MVR** - Move Registry
- **DeepBook** - DEX
- **Nautilus** - オフチェーン計算

---

## 付録: ページ構成

各ページは以下の形式で統一：

1. **Concept** - 概念説明（短く）
2. **Hands-on** - 手を動かすステップ
3. **Checkpoint** - 成功確認方法
4. **Pitfalls** - よくあるエラーと解決策
