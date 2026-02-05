import type { Tutorial } from './types';

export const ptbDoubleTransferTutorial: Tutorial = {
  id: 'double-transfer',
  steps: [
    {
      title: 'キャンバスの操作方法',
      instructions: [
        '右クリック → ノード追加メニューを開く',
        'ドラッグ → キャンバスを移動',
        'スクロール → ズームイン・ズームアウト',
        '右上の「Code」チェックを外すとコードプレビューを非表示にでき、キャンバスが広くなります',
      ],
      tip: 'まずは右クリックしてメニューを確認してみましょう。',
    },
    {
      title: 'SplitCoins を追加',
      instructions: [
        'キャンバスの空白部分を右クリック',
        'メニューから SplitCoins をクリック',
        'SplitCoins ノード内の「−」ボタンを1回クリックして、amount を1つにする',
      ],
      tip: 'SplitCoins は、コインを分割する操作です。デフォルトでは amount が2つありますが、今回は1つだけ使います。',
    },
    {
      title: 'gas 変数を追加',
      instructions: [
        '空白部分を右クリック → Resources → gas をクリック',
      ],
      tip: 'gas はトランザクション手数料の支払い元であるガスコインです。ここから送金額を分割します。',
    },
    {
      title: 'number 変数を追加',
      instructions: [
        '空白部分を右クリック → number をクリック',
        'number ノードをクリックして値を 1000000000 に設定（= 1 SUI）',
      ],
      tip: '1 SUI = 1,000,000,000 MIST（10億）。PTB Builder では MIST 単位で入力します。',
    },
    {
      title: 'フローとデータを接続（Split）',
      instructions: [
        'Start の ● → SplitCoins の ● へドラッグ（フロー接続）',
        'gas の出力 → SplitCoins の coin 入力へドラッグ',
        'number の出力 → SplitCoins の amount 入力へドラッグ',
      ],
      tip: 'ノード端の小さな丸（●）をドラッグすると線が伸びます。互換性のないポート同士は接続できないので安心です。',
    },
    {
      title: 'TransferObjects を追加',
      instructions: [
        '空白部分を右クリック → TransferObjects をクリック',
        'TransferObjects ノード内の「−」ボタンを1回クリックして、object を1つにする',
      ],
      tip: 'TransferObjects は、オブジェクト（コイン）を指定アドレスへ送る操作です。デフォルトでは object が2つありますが、今回は1つだけ使います。',
    },
    {
      title: 'my wallet 変数を追加',
      instructions: [
        '空白部分を右クリック → Resources → my wallet をクリック',
      ],
      tip: 'my wallet は接続中のウォレットアドレスです。まずは自分自身に送金してテストします。',
    },
    {
      title: 'フローとデータを接続（Transfer）',
      instructions: [
        'SplitCoins の ● → TransferObjects の ● へドラッグ（フロー接続）',
        'SplitCoins の coin 出力 → TransferObjects の object 入力へドラッグ',
        'my wallet の出力 → TransferObjects の recipient 入力へドラッグ',
      ],
      tip: 'ここまでで 1つ目の送金操作（1 SUI を自分に送金）が完成です。',
    },
    {
      title: '2つ目の操作を追加',
      instructions: [
        '右クリック → SplitCoins を追加 →「−」を1回クリックして amount を1つにする',
        '右クリック → number を追加し、値を 2000000000 に設定（= 2 SUI）',
        '右クリック → TransferObjects を追加 →「−」を1回クリックして object を1つにする',
      ],
    },
    {
      title: '2つ目の接続',
      instructions: [
        '1つ目の TransferObjects ● → 2つ目の SplitCoins ●（フロー）',
        'gas の出力 → 2つ目の SplitCoins の coin 入力',
        '2つ目の number 出力 → 2つ目の SplitCoins の amount 入力',
        '2つ目の SplitCoins ● → 2つ目の TransferObjects ●（フロー）',
        '2つ目の SplitCoins の coin 出力 → 2つ目の TransferObjects の object 入力',
        'my wallet の出力 → 2つ目の TransferObjects の recipient 入力',
        '2つ目の TransferObjects ● → End ●（フロー）',
      ],
      tip: 'gas と my wallet は最初に作ったものを再利用します。1つのガスコインから複数回分割できるのがPTBの強みです。',
    },
    {
      title: '実行して結果を確認',
      instructions: [
        '右上の「Code」チェックを入れて、コードプレビューを再表示する',
        'コードプレビュー右下の ▶ ボタンをクリックして実行',
        'ウォレットの署名画面で承認',
        'Last Tx のリンクから Explorer で結果を確認',
      ],
      tip: '自分自身に送金した場合、残高はほぼ変わりませんが、Explorer でトランザクション内容を確認できます。',
    },
  ],
};
