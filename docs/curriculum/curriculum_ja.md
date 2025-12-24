# Sui初心者チュートリアルカリキュラム

## コース概要

Suiの基礎からdApp公開まで、段階的に学ぶ初心者向けコース。**Sui Extension**と**PTB Builder**を活用した実務ワークフローを体験しながら、約12週間でdAppを公開できるスキルを身につけます。

### 初心者コース（6 Unit・約12週間）

| Unit | 内容 | 成果物 | 期間 |
|:--|:--|:--|:--|
| 1 | 環境構築とDevnet接続 | Devnetに接続し、Faucetでトークンを取得できた | Week 1-2 |
| 2 | トランザクションとPTB Builder | PTB Builderで2操作を合成したtxが成功 | Week 3-4 |
| 3 | Moveをpublishする | 自分のコントラクトをpublishし、Explorerから呼び出し成功 | Week 5-6 |
| 4 | TSでPTBを組む | TSでPTBを組み、署名→実行→結果確認成功 | Week 7-8 |
| 5 | dapp-kitでUI完成 | ウォレット接続してUIで結果表示まで動く | Week 9-10 |
| 6 | 公開と次のステップ | dAppを公開し、学習完了 | Week 11-12 |

**前提ネットワーク:** Devnet

---

## Unit 1: 環境構築とDevnet接続

**成果物**: Devnetに接続し、Faucetでトークンを取得できた

### 基礎概念

Lessonを始める前に、以下の基礎概念を理解しましょう。

#### ブロックチェーンの基本

- **分散台帳**: 複数のノードが同じデータを共有・検証する仕組み
- **コンセンサス**: ノード間で合意を形成するアルゴリズム
- **トランザクション**: ブロックチェーン上で状態を変更する操作の単位

#### Suiのオブジェクト中心モデル

Suiは他のブロックチェーンと異なり、**オブジェクト中心**のデータモデルを採用しています。

- **Address-owned Object**: 特定のアドレスが所有するオブジェクト
- **Shared Object**: 複数のユーザーがアクセスできる共有オブジェクト
- **Immutable Object**: 一度作成されたら変更できない不変オブジェクト

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L1 | Slushウォレットを入れる | ウォレットをインストールする | 1.Chrome拡張インストール<br>2.アカウント作成<br>3.バックアップ確認 | ウォレットにアドレスが表示される | Slush | Devnetに切り替えよう |
| L2 | Devnetに切り替える | ネットワークをDevnetに変更する | 1.設定を開く<br>2.Devnet選択 | ウォレットに「Devnet」と表示される | Slush | CLIも導入しよう |
| L3 | Sui CLIをインストールする | コマンドラインツールを導入する | 1.suiupコマンド実行<br>2.バージョン確認 | `sui --version`が成功する | CLI | VSCodeで開発環境を整えよう |
| L4 | VSCode + Sui Extension | Move開発環境を整える | 1.Sui Extensionインストール<br>2.設定確認 | .moveファイルでハイライト表示される | **Sui Extension** | CLIもDevnetに接続しよう |
| L5 | CLIをDevnetに接続する | CLIのネットワーク設定を行う | 1.switchコマンド<br>2.確認 | `sui client active-env`がdevnetを返す | CLI, **Sui Extension** | テストトークンを取得しよう |
| L6 | Faucetでトークンを取得する | テストSUIを入手する | 1.faucetコマンド<br>2.残高確認 | `sui client gas`で残高が表示される | CLI | Unit 1完了！次はtxを実行 |

### Checkpoint

`sui client active-env` が `devnet` を返し、`sui client gas` で残高が表示されればOK

### Pitfalls

- **CLI接続エラー**: ネットワーク設定を確認（`sui client switch --env devnet`）
- **Faucet制限**: 短時間に複数回リクエストするとレート制限にかかる（数分待つ）
- **Sui Extension非表示**: `.move`拡張子のファイルを開いて確認

---

## Unit 2: トランザクションとPTB Builder

**成果物**: PTB Builderで2操作を合成したtxが成功

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L7 | 送金してみる | 最初のトランザクションを実行する | 1.CLIで送金<br>2.結果確認 | txハッシュが取得できる | CLI | Explorerでtxを確認しよう |
| L8 | Explorerでtxを読む | トランザクションの中身を理解する | 1.Explorer開く<br>2.txを検索<br>3.詳細確認 | 入力/出力/ガスが読める | Explorer | PTB Builderに触れてみよう |
| L9 | PTB Builderを開く | GUIツールに触れる | 1.PTB Builderにアクセス<br>2.UIを確認 | PTB Builderが開ける | **PTB Builder** | 2操作を合成してみよう |
| L10 | 2操作を合成する | 複数操作を1txにまとめる | 1.送金+送金を設定<br>2.実行 | 1つのtxで2送金が成功する | **PTB Builder**, Slush | TSコードに変換してみよう |
| L11 | PTB → TS Exportを確認する | GUIからコード出力を体験する | 1.Exportボタン<br>2.TSコードを確認 | TSコードが表示される（Unit 4で再現） | **PTB Builder** | Unit 2完了！次は自分のコントラクト |

### Checkpoint

PTB Builderで2操作を合成したtxが成功すればOK

### Pitfalls

- **送金先アドレス間違い**: 自分の別アドレスに送金してテスト
- **ガス不足**: Faucetで追加取得
- **PTB Builder接続エラー**: ウォレットの接続を確認

---

## Unit 3: Moveをpublishする

**成果物**: 自分のコントラクトをpublishし、Explorerから呼び出し成功

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L12 | Moveの仕組みを理解する | リソース/モジュール/パッケージの概念を掴む | 1.概念図を読む<br>2.サンプルコード確認 | 3つの概念を説明できる | 読み物 | プロジェクトを作ろう |
| L13 | Moveプロジェクトを作成する | 新規パッケージを作る | 1.sui move new<br>2.フォルダ構成確認 | Move.tomlが生成される | CLI, **Sui Extension** | コントラクトを書こう |
| L14 | 最小コントラクトを書く | struct + entry functionを実装する | 1.カウンターを実装<br>2.シンタックス確認 | ビルドエラーなし | **Sui Extension** | ビルドとテストしよう |
| L15 | ビルド＆テストする | ローカルで検証する | 1.sui move build<br>2.sui move test | テストがパスする | CLI, **Sui Extension** | Devnetにデプロイしよう |
| L16 | Devnetにpublishする | コントラクトをデプロイする | 1.sui client publish<br>2.Package ID取得 | Package IDがExplorerで確認できる | CLI, Explorer | Explorerから呼び出そう |
| L17 | Explorerから関数を呼び出す | GUIでコントラクトを操作する | 1.Package ID検索<br>2.Execute<br>3.結果確認 | 関数が正常に実行される | Explorer, Slush | Unit 3完了！次はTSで操作 |

### Checkpoint

自分のコントラクトをpublishし、Explorerから呼び出しが成功すればOK

### Pitfalls

- **ビルドエラー**: Sui Extensionのエラー表示を確認
- **publish失敗**: ガス残高を確認、コード構文を確認
- **Package ID紛失**: Explorerの履歴から検索可能

---

## Unit 4: TSでPTBを組む

**成果物**: TSでPTBを組み、署名→実行→結果確認成功

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L18 | SDK構成を理解する | @mysten/suiと@mysten/dapp-kitの役割を理解 | 1.パッケージ確認<br>2.ドキュメント参照 | 2つの役割を説明できる | 読み物 | SuiClientで接続しよう |
| L19 | SuiClientで接続する | ネットワーク接続とデータ取得 | 1.getBalance実行<br>2.結果確認 | 残高が取得できる | TS, **Sui Extension** | TSでPTBを組もう |
| L20 | Transactionクラスを使う | PTBをTSで構築する | 1.Unit 2のPTBをTSで再現<br>2.実行 | 同じ結果が得られる | TS, **PTB Builder参照** | dapp-kitを設定しよう |
| L21 | dapp-kit Providerを設定する | フロント基盤を構築する | 1.Provider階層設定<br>2.動作確認 | エラーなく起動する | dapp-kit | ウォレット接続を作ろう |
| L22 | ウォレット接続ボタンを作る | ConnectButtonでウォレット連携 | 1.ConnectButton配置<br>2.接続テスト | ウォレットが接続される | dapp-kit, Slush, **Sui Extension** | txを署名・実行しよう |
| L23 | tx署名と実行 | フロントからtxを署名・送信する | 1.useSignAndExecuteTransaction<br>2.L16のコントラクト呼び出し | txが成功する | dapp-kit, Slush | 結果をUIに表示しよう |
| L24 | 結果をUIに表示する | tx結果をUIに反映する | 1.成功/失敗判定<br>2.表示 | UIに結果が表示される | dapp-kit | Unit 4完了！次は統合 |

### Checkpoint

TSで組んだtxがウォレット署名→実行→結果表示まで動けばOK

### Pitfalls

- **Provider設定ミス**: 階層順序を確認（QueryClientProvider → SuiClientProvider → WalletProvider）
- **型エラー**: @mysten/suiのバージョンを確認
- **ウォレット未接続**: useCurrentAccountの戻り値を確認

---

## Unit 5: dapp-kitでUI完成

**成果物**: ウォレット接続してUIで結果表示まで動く

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L25 | プロジェクト全体設計 | Move + フロントの統合構成を整理 | 1.ディレクトリ構成確認<br>2.依存関係確認 | 全体像を把握できる | **Sui Extension** | 統合実装に進もう |
| L26 | コントラクトとフロントを統合 | L16のコントラクト + L24のフロントを連携 | 1.Package IDを設定<br>2.呼び出しテスト | ローカルで動作する | dapp-kit, **Sui Extension** | UIを仕上げよう |
| L27 | UIを仕上げる | ユーザー体験を整える | 1.スタイル調整<br>2.エラーハンドリング | 使いやすいUIになる | dapp-kit | Unit 5完了！次は公開 |

### Checkpoint

ウォレット接続してUIで結果表示まで動けばOK

### Pitfalls

- **Package ID不一致**: 環境変数でPackage IDを管理
- **CORS問題**: ローカル開発サーバーの設定を確認
- **状態更新遅延**: useSuiClientQueryのrefetch設定を確認

---

## Unit 6: 公開と次のステップ

**成果物**: dAppを公開し、学習完了

### Lessons

| ID | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|
| L28 | ホスティング方法を選ぶ | 公開先を決定する | 1.Walrus Sites（推奨）vs GitHub Pages<br>2.選択 | 方針が決まる | 読み物 | デプロイしよう |
| L29 | ビルドとデプロイ | フロントを公開する | 1.ビルド<br>2.デプロイ<br>3.URL確認 | 公開URLでアクセスできる | site-builder or GitHub | 動作確認しよう |
| L30 | 動作確認 | 公開dAppをテストする | 1.ウォレット接続<br>2.tx実行<br>3.結果確認 | 全機能が動作する | 公開dApp, Slush | 振り返りしよう |
| L31 | 振り返り | 学んだ内容を整理する | 1.チェックリスト確認<br>2.達成項目確認 | 全項目クリア | 読み物 | 次のステップへ |
| L32 | 次のステップ | 上級コースへの案内 | 1.Advanced Courseを確認<br>2.興味のある分野を選ぶ | 次の学習目標が決まる | 読み物 | 初心者コース完了！ |

### ホスティング選択肢

| 選択肢 | 特徴 | 推奨度 |
|:--|:--|:--|
| **Walrus Sites** | Sui上の分散ストレージ、Web3ネイティブ | 推奨 |
| **GitHub Pages** | 無料、設定が簡単、高速 | 代替 |
| **Vercel / Netlify** | CI/CD統合、プレビュー機能 | 代替 |

### Checkpoint

dAppがWalrus SitesまたはGitHub PagesのURLで動作すればOK

### Pitfalls

- **ビルド失敗**: 環境変数の設定を確認
- **404エラー**: SPAのルーティング設定を確認
- **ウォレット接続不可**: HTTPSでホスティングされているか確認

---

## Advanced Course（上級トラック）

初心者コース修了後に挑戦できる高度なトピックです。

### Move高度なパターン

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

### SDK応用

- **Dry Run** - トランザクションシミュレーション
- **イベントクエリ** - `queryEvents`
- **スポンサードTx** - ガスレスUX
- **GraphQL API** - 柔軟なデータクエリ
- **zkLogin** - OAuth認証によるウォレット生成
- **Kiosk SDK** - NFTマーケットプレイス
- **BCS (SDK)** - フロントエンド⇔コントラクト連携
- **Multisig** - マルチシグウォレット

### Sui Stack

- **Walrus** - 分散ストレージ詳細
- **Seal** - 暗号化
- **MVR** - Move Registry
- **DeepBook** - DEX
- **Nautilus** - オフチェーン計算

---

## 付録: Lesson構成

各Lessonは以下のフィールドで構成されています：

| フィールド | 説明 |
|:--|:--|
| ID | レッスン番号（L1〜L32） |
| Title | レッスンタイトル |
| Goal | 1行ゴール |
| Do | やること（1〜3点） |
| Success Check | 成功条件（1行） |
| Tools | 使用ツール |
| Next | 次に進む理由 |

### ツール一覧

| ツール | 説明 |
|:--|:--|
| **Sui Extension** | VSCodeのMove開発拡張 |
| **PTB Builder** | GUIでPTBを合成するツール |
| Slush | Suiウォレット（ブラウザ拡張） |
| CLI | Sui CLI（コマンドラインツール） |
| Explorer | Sui Explorer（トランザクション確認） |
| dapp-kit | @mysten/dapp-kit（React向けSDK） |
| TS | TypeScript + @mysten/sui |
