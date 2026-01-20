# Sui初心者チュートリアルカリキュラム

## コース概要

Suiの基礎からdApp公開まで、段階的に学ぶ初心者向けコース。**Sui Extension**と**PTB Builder**を活用した実務ワークフローを体験しながら、dAppを公開できるスキルを身につけます。

### 初心者コース（6 Unit）

| Unit | 内容 | 成果物 |
|:--|:--|:--|
| 1 | 環境構築とDevnet接続 | Devnetに接続し、Faucetでトークンを取得できた |
| 2 | トランザクションとPTB Builder | PTB Builderで2操作を合成したtxが成功 |
| 3 | Moveをpublishする | 自分のコントラクトをpublishし、Explorerから呼び出し成功 |
| 4 | TSでPTBを組む | TSでPTBを組み、署名→実行→結果確認成功 |
| 5 | dapp-kitでUI完成 | ウォレット接続してUIで結果表示まで動く |
| 6 | 公開と次のステップ | dAppを公開し、学習完了 |

**前提ネットワーク:** Devnet

---

## Unit 1: 環境構築とDevnet接続

**成果物**: Devnetに接続し、Faucetでトークンを取得できた

### Lessons

| ID | Level | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|:--|
| L1 | Beginner | Slushウォレットをインストール | ウォレットをインストールする | 1.Chrome拡張機能をインストール<br/>2.アカウントを作成<br/>3.リカバリーフレーズを保管<br/>4.パスワードを設定 | 設定画面でアドレスが表示される | Slush | Devnetに切り替えよう |
| L2 | Beginner | Devnetに切り替える | ネットワークをDevnetに変更する | 1.設定を開く<br/>2.Devnet選択 | ウォレットに「Devnet」と表示される | Slush | CLIも導入しよう |
| L3 | Beginner | Sui CLIをインストール | コマンドラインツールを導入する | 1.suiupコマンド実行<br/>2.バージョン確認 | `sui --version`が成功する | CLI | VSCodeで開発環境を整えよう |
| L4 | Beginner | VSCode + Sui Extension | Move開発環境を整える | 1.Sui Extensionインストール<br/>2.設定確認 | .moveファイルでハイライト表示される | **Sui Extension** | CLIもDevnetに接続しよう |
| L5 | Beginner | CLIをDevnetに接続 | CLIのネットワーク設定を行う | 1.switchコマンド<br/>2.確認 | `sui client active-env`がdevnetを返す | CLI, **Sui Extension** | テストトークンを取得しよう |
| L6 | Beginner | Faucetでトークンを取得 | テストSUIを入手する | 1.faucetコマンド<br/>2.残高確認 | `sui client gas`で残高が表示される | CLI | Unit 1完了！次はPTB Builderへ |

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

| ID | Level | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|:--|
| L7 | Beginner | PTB Builderにウォレット接続 | PTB BuilderとSlushを連携する | 1.PTB Builderにアクセス<br/>2.Connect Wallet<br/>3.Slushで承認 | 接続済み表示が出る | **PTB Builder**, Slush | Explorerでtxを確認しよう |
| L8 | Beginner | Explorerでtxを読む | トランザクションの中身を理解する | 1.Explorer開く<br/>2.txを検索<br/>3.詳細確認 | 入力/出力/ガスが読める | Explorer | CLIでも送金してみよう |
| L9 | Beginner | CLIで送金 | コマンドラインでtxを実行する | 1.CLIで送金<br/>2.結果確認 | txハッシュが取得できる | CLI | 2操作を合成してみよう |
| L10 | Beginner | 2操作を合成 | 複数操作を1txにまとめる | 1.送金+送金を設定<br/>2.実行 | 1つのtxで2送金が成功する | **PTB Builder**, Slush | TSコードに変換してみよう |
| L11 | Beginner | PTB → TS Exportを確認 | GUIからコード出力を体験する | 1.Exportボタン<br/>2.TSコードを確認 | TSコードが表示される（Unit 4で再現） | **PTB Builder** | Unit 2完了！次は自分のコントラクト |

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

| ID | Level | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|:--|
| L12 | Beginner | Moveプロジェクトを作成 | 新規パッケージを作る | 1.sui move new<br/>2.フォルダ構成確認 | Move.tomlが生成される | CLI, **Sui Extension** | Moveの仕組みを理解しよう |
| L13 | Beginner | Moveの仕組みを学ぶ | リソース/モジュール/パッケージの概念を掴む | 1.概念図を読む<br/>2.サンプルコード確認 | 3つの概念を説明できる | 読み物 | コントラクトを書こう |
| L14 | Beginner | 最小コントラクトを書く | struct + entry functionを実装する | 1.カウンターを実装<br/>2.シンタックス確認 | ビルドエラーなし | **Sui Extension** | ビルドとテストしよう |
| L15 | Beginner | ビルド＆テスト | ローカルで検証する | 1.sui move build<br/>2.sui move test | テストがパスする | CLI, **Sui Extension** | Devnetにデプロイしよう |
| L16 | Beginner | Devnetにpublish | コントラクトをデプロイする | 1.sui client publish<br/>2.Package ID取得 | Package IDがExplorerで確認できる | CLI, Explorer | Explorerから呼び出そう |
| L17 | Beginner | Explorerから関数を呼び出す | GUIでコントラクトを操作する | 1.Package ID検索<br/>2.Execute<br/>3.結果確認 | 関数が正常に実行される | Explorer, Slush | Unit 3完了！次はTSで操作 |

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

| ID | Level | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|:--|
| L18 | Beginner | SDK構成を学ぶ | @mysten/suiと@mysten/dapp-kitの役割を理解 | 1.パッケージ確認<br/>2.ドキュメント参照 | 2つの役割を説明できる | 読み物 | SuiClientで接続しよう |
| L19 | Beginner | SuiClientで接続 | ネットワーク接続とデータ取得 | 1.getBalance実行<br/>2.結果確認 | 残高が取得できる | TS | TSでPTBを組もう |
| L20 | Beginner | Transactionクラスを使う | PTBをTSで構築する | 1.Unit 2のPTBをTSで再現<br/>2.実行 | 同じ結果が得られる | TS, **PTB Builder参照** | dapp-kitを設定しよう |
| L21 | Beginner | dapp-kit Providerを設定 | フロント基盤を構築する | 1.Provider階層設定<br/>2.動作確認 | エラーなく起動する | dapp-kit | ウォレット接続を作ろう |
| L22 | Beginner | ウォレット接続ボタンを作成 | ConnectButtonでウォレット連携 | 1.ConnectButton配置<br/>2.接続テスト | ウォレットが接続される | dapp-kit, Slush | txを署名・実行しよう |
| L23 | Beginner | tx署名と実行 | フロントからtxを署名・送信する | 1.useSignAndExecuteTransaction<br/>2.L16のコントラクト呼び出し | txが成功する | dapp-kit, Slush | 結果をUIに表示しよう |
| L24 | Beginner | 結果をUIに表示 | tx結果をUIに反映する | 1.成功/失敗判定<br/>2.表示 | UIに結果が表示される | dapp-kit | Unit 4完了！次は統合 |

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

| ID | Level | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|:--|
| L25 | Beginner | プロジェクト全体設計（Optional） | Move + フロントの統合構成を整理 | 1.ディレクトリ構成確認<br/>2.依存関係確認 | 全体像を把握できる | 読み物 | 統合実装に進もう |
| L26 | Beginner | コントラクトとフロントを統合 | L16のコントラクト + L24のフロントを連携 | 1.Package IDを設定<br/>2.呼び出しテスト | ローカルで動作する | dapp-kit, **Sui Extension** | UIを仕上げよう |
| L27 | Beginner | UIを仕上げ | ユーザー体験を整える | 1.スタイル調整<br/>2.エラーハンドリング | 使いやすいUIになる | dapp-kit | Unit 5完了！次は公開 |

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

| ID | Level | Title | Goal | Do | Success Check | Tools | Next |
|:--|:--|:--|:--|:--|:--|:--|:--|
| L28 | Beginner | ホスティング方法を選択 | 公開先を決定する | 1.GitHub Pages（推奨・速い）<br/>2.Walrus Sites（Web3・任意）<br/>3.選択 | 方針が決まる | 読み物 | デプロイしよう |
| L29 | Beginner | ビルドとデプロイ | フロントを公開する | 1.ビルド<br/>2.デプロイ<br/>3.URL確認 | 公開URLでアクセスできる | site-builder or GitHub | 動作確認しよう |
| L30 | Beginner | 動作確認 | 公開dAppをテストする | 1.ウォレット接続<br/>2.tx実行<br/>3.結果確認 | 全機能が動作する | 公開dApp, Slush | 振り返りしよう |
| L31 | Beginner | 振り返り | 学んだ内容を整理する | 1.チェックリスト確認<br/>2.達成項目確認 | 全項目クリア | 読み物 | 次のステップへ |
| L32 | Beginner | 次のステップ | 上級コースへの案内 | 1.Advanced Courseを確認<br/>2.興味のある分野を選ぶ | 次の学習目標が決まる | 読み物 | コミュニティに参加しよう |
| L33 | Beginner | Contributorsについて | クレジット方針と貢献方法を知る | 1.Contributors確認<br/>2.貢献ガイド確認 | 貢献方法を理解できる | 読み物 | コミュニティリソースを見よう |
| L34 | Beginner | Community Resources | 日本語コミュニティ・イベント情報を知る | 1.コミュニティリンク確認<br/>2.イベント情報確認 | 次の学習リソースを把握できる | 読み物 | 初心者コース完了！ |

### ホスティング選択肢

| 選択肢 | 特徴 | 推奨度 |
|:--|:--|:--|
| **GitHub Pages** | 無料、設定が簡単、高速 | 推奨（まずこれ） |
| **Walrus Sites** | Sui上の分散ストレージ、Web3ネイティブ | 余力があれば |
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
| ID | レッスン番号（L1〜L34） |
| Level | コースレベル（Beginner / Advanced） |
| Title | レッスンタイトル |
| Goal | 1行ゴール |
| Do | やること（1〜3点） |
| Success Check | 成功条件（1行） |
| Tools | 使用ツール |
| Next | 次に進む理由 |

### レベル

| Level | 説明 |
|:--|:--|
| Beginner | 初心者コース（L1〜L34） |
| Advanced | 上級トラック |

### ツール一覧

| ツール | 説明 |
|:--|:--|
| **Sui Extension** | VSCodeのMove開発拡張 |
| **PTB Builder** | GUIでPTBを合成するツール |
| Slush | Slushウォレット（Chrome拡張機能、署名・接続） |
| CLI | Sui CLI（コマンドラインツール） |
| Explorer | Sui Explorer（トランザクション確認） |
| dapp-kit | @mysten/dapp-kit（React向けSDK） |
| TS | TypeScript + @mysten/sui |
