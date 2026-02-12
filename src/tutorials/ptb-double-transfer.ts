import type { Tutorial } from './types';

export const ptbDoubleTransferTutorial: Tutorial = {
  id: 'double-transfer',
  steps: [
    {
      title: {
        en: 'Canvas Controls',
        ja: 'キャンバスの操作方法',
        ko: '캔버스 조작 방법',
      },
      instructions: {
        en: [
          'Right-click → Open the node menu',
          'Drag → Move the canvas',
          'Scroll → Zoom in / Zoom out',
          'Uncheck "Code" in the top-right to hide the code preview and expand the canvas',
        ],
        ja: [
          '右クリック → ノード追加メニューを開く',
          'ドラッグ → キャンバスを移動',
          'スクロール → ズームイン・ズームアウト',
          '右上の「Code」チェックを外すとコードプレビューを非表示にでき、キャンバスが広くなります',
        ],
        ko: [
          '우클릭 → 노드 추가 메뉴 열기',
          '드래그 → 캔버스 이동',
          '스크롤 → 줌인・줌아웃',
          '오른쪽 상단의 "Code" 체크를 해제하면 코드 미리보기가 숨겨져 캔버스가 넓어집니다',
        ],
      },
      tip: {
        en: 'Start by right-clicking to see the menu.',
        ja: 'まずは右クリックしてメニューを確認してみましょう。',
        ko: '먼저 우클릭하여 메뉴를 확인해 보세요.',
      },
    },
    {
      title: {
        en: 'Add SplitCoins',
        ja: 'SplitCoins を追加',
        ko: 'SplitCoins 추가',
      },
      instructions: {
        en: [
          'Right-click on an empty area of the canvas',
          'Click SplitCoins from the menu',
          'Click the "−" button inside the SplitCoins node once to reduce amount to 1',
        ],
        ja: [
          'キャンバスの空白部分を右クリック',
          'メニューから SplitCoins をクリック',
          'SplitCoins ノード内の「−」ボタンを1回クリックして、amount を1つにする',
        ],
        ko: [
          '캔버스의 빈 영역을 우클릭',
          '메뉴에서 SplitCoins를 클릭',
          'SplitCoins 노드 안의 "−" 버튼을 1번 클릭하여 amount를 1개로 줄이기',
        ],
      },
      tip: {
        en: 'SplitCoins splits a coin. By default it has 2 amounts, but we only need 1 this time.',
        ja: 'SplitCoins は、コインを分割するコマンドです。デフォルトでは amount が2つありますが、今回は1つだけ使います。',
        ko: 'SplitCoins는 코인을 분할하는 커맨드입니다. 기본적으로 amount가 2개이지만, 이번에는 1개만 사용합니다.',
      },
    },
    {
      title: {
        en: 'Add gas variable',
        ja: 'gas 変数を追加',
        ko: 'gas 변수 추가',
      },
      instructions: {
        en: [
          'Right-click on an empty area → Resources → Click gas',
        ],
        ja: [
          '空白部分を右クリック → Resources → gas をクリック',
        ],
        ko: [
          '빈 영역을 우클릭 → Resources → gas를 클릭',
        ],
      },
      tip: {
        en: 'gas is the gas coin used to pay transaction fees. We split the transfer amount from it.',
        ja: 'gas はトランザクション手数料の支払い元であるガスコインです。ここから送金額を分割します。',
        ko: 'gas는 트랜잭션 수수료를 지불하는 가스 코인입니다. 여기에서 송금 금액을 분할합니다.',
      },
    },
    {
      title: {
        en: 'Add number variable',
        ja: 'number 変数を追加',
        ko: 'number 변수 추가',
      },
      instructions: {
        en: [
          'Right-click on an empty area → Click number',
          'Click the number node and set the value to 1000000000 (= 1 SUI)',
        ],
        ja: [
          '空白部分を右クリック → number をクリック',
          'number ノードをクリックして値を 1000000000 に設定（= 1 SUI）',
        ],
        ko: [
          '빈 영역을 우클릭 → number를 클릭',
          'number 노드를 클릭하여 값을 1000000000으로 설정 (= 1 SUI)',
        ],
      },
      tip: {
        en: '1 SUI = 1,000,000,000 MIST (1 billion). PTB Builder uses MIST units.',
        ja: '1 SUI = 1,000,000,000 MIST（10億）。PTB Builder では MIST 単位で入力します。',
        ko: '1 SUI = 1,000,000,000 MIST(10억). PTB Builder에서는 MIST 단위로 입력합니다.',
      },
    },
    {
      title: {
        en: 'Connect flow and data (Split)',
        ja: 'フローとデータを接続（Split）',
        ko: '플로우와 데이터 연결 (Split)',
      },
      instructions: {
        en: [
          'Drag from Start ● → SplitCoins ● (flow connection)',
          'Drag from gas output → SplitCoins coin input',
          'Drag from number output → SplitCoins amount input',
        ],
        ja: [
          'Start の ● → SplitCoins の ● へドラッグ（フロー接続）',
          'gas の出力 → SplitCoins の coin 入力へドラッグ',
          'number の出力 → SplitCoins の amount 入力へドラッグ',
        ],
        ko: [
          'Start의 ● → SplitCoins의 ●로 드래그 (플로우 연결)',
          'gas의 출력 → SplitCoins의 coin 입력으로 드래그',
          'number의 출력 → SplitCoins의 amount 입력으로 드래그',
        ],
      },
      tip: {
        en: 'Drag from the small circle (●) on a node to extend a line. Incompatible ports cannot be connected, so don\'t worry.',
        ja: 'ノード端の小さな丸（●）をドラッグすると線が伸びます。互換性のないポート同士は接続できないので安心です。',
        ko: '노드 끝의 작은 원(●)을 드래그하면 선이 나옵니다. 호환되지 않는 포트끼리는 연결할 수 없으므로 안심하세요.',
      },
    },
    {
      title: {
        en: 'Add TransferObjects',
        ja: 'TransferObjects を追加',
        ko: 'TransferObjects 추가',
      },
      instructions: {
        en: [
          'Right-click on an empty area → Click TransferObjects',
          'Click the "−" button inside the TransferObjects node once to reduce object to 1',
        ],
        ja: [
          '空白部分を右クリック → TransferObjects をクリック',
          'TransferObjects ノード内の「−」ボタンを1回クリックして、object を1つにする',
        ],
        ko: [
          '빈 영역을 우클릭 → TransferObjects를 클릭',
          'TransferObjects 노드 안의 "−" 버튼을 1번 클릭하여 object를 1개로 줄이기',
        ],
      },
      tip: {
        en: 'TransferObjects sends objects (coins) to a specified address. By default it has 2 objects, but we only need 1 this time.',
        ja: 'TransferObjects は、オブジェクト（コイン）を指定アドレスへ送るコマンドです。デフォルトでは object が2つありますが、今回は1つだけ使います。',
        ko: 'TransferObjects는 오브젝트(코인)를 지정된 주소로 보내는 커맨드입니다. 기본적으로 object가 2개이지만, 이번에는 1개만 사용합니다.',
      },
    },
    {
      title: {
        en: 'Add my wallet variable',
        ja: 'my wallet 変数を追加',
        ko: 'my wallet 변수 추가',
      },
      instructions: {
        en: [
          'Right-click on an empty area → Resources → Click my wallet',
        ],
        ja: [
          '空白部分を右クリック → Resources → my wallet をクリック',
        ],
        ko: [
          '빈 영역을 우클릭 → Resources → my wallet을 클릭',
        ],
      },
      tip: {
        en: 'my wallet is the address of the connected wallet. We\'ll send to ourselves first as a test.',
        ja: 'my wallet は接続中のウォレットアドレスです。まずは自分自身に送金してテストします。',
        ko: 'my wallet은 연결된 지갑 주소입니다. 먼저 자기 자신에게 송금하여 테스트합니다.',
      },
    },
    {
      title: {
        en: 'Connect flow and data (Transfer)',
        ja: 'フローとデータを接続（Transfer）',
        ko: '플로우와 데이터 연결 (Transfer)',
      },
      instructions: {
        en: [
          'Drag from SplitCoins ● → TransferObjects ● (flow connection)',
          'Drag from SplitCoins coin output → TransferObjects object input',
          'Drag from my wallet output → TransferObjects recipient input',
        ],
        ja: [
          'SplitCoins の ● → TransferObjects の ● へドラッグ（フロー接続）',
          'SplitCoins の coin 出力 → TransferObjects の object 入力へドラッグ',
          'my wallet の出力 → TransferObjects の recipient 入力へドラッグ',
        ],
        ko: [
          'SplitCoins의 ● → TransferObjects의 ●로 드래그 (플로우 연결)',
          'SplitCoins의 coin 출력 → TransferObjects의 object 입력으로 드래그',
          'my wallet의 출력 → TransferObjects의 recipient 입력으로 드래그',
        ],
      },
      tip: {
        en: 'This completes the first transfer command (send 1 SUI to yourself).',
        ja: 'ここまでで 1つ目の送金コマンド（1 SUI を自分に送金）が完成です。',
        ko: '여기까지 첫 번째 송금 커맨드(1 SUI를 자기 자신에게 송금)가 완성입니다.',
      },
    },
    {
      title: {
        en: 'Add the second command',
        ja: '2つ目のコマンドを追加',
        ko: '두 번째 커맨드 추가',
      },
      instructions: {
        en: [
          'Right-click → Add SplitCoins → Click "−" once to reduce amount to 1',
          'Right-click → Add number and set the value to 2000000000 (= 2 SUI)',
          'Right-click → Add TransferObjects → Click "−" once to reduce object to 1',
        ],
        ja: [
          '右クリック → SplitCoins を追加 →「−」を1回クリックして amount を1つにする',
          '右クリック → number を追加し、値を 2000000000 に設定（= 2 SUI）',
          '右クリック → TransferObjects を追加 →「−」を1回クリックして object を1つにする',
        ],
        ko: [
          '우클릭 → SplitCoins 추가 → "−"를 1번 클릭하여 amount를 1개로 줄이기',
          '우클릭 → number 추가, 값을 2000000000으로 설정 (= 2 SUI)',
          '우클릭 → TransferObjects 추가 → "−"를 1번 클릭하여 object를 1개로 줄이기',
        ],
      },
    },
    {
      title: {
        en: 'Connect the second command',
        ja: '2つ目の接続',
        ko: '두 번째 연결',
      },
      instructions: {
        en: [
          '1st TransferObjects ● → 2nd SplitCoins ● (flow)',
          'gas output → 2nd SplitCoins coin input',
          '2nd number output → 2nd SplitCoins amount input',
          '2nd SplitCoins ● → 2nd TransferObjects ● (flow)',
          '2nd SplitCoins coin output → 2nd TransferObjects object input',
          'my wallet output → 2nd TransferObjects recipient input',
          '2nd TransferObjects ● → End ● (flow)',
        ],
        ja: [
          '1つ目の TransferObjects ● → 2つ目の SplitCoins ●（フロー）',
          'gas の出力 → 2つ目の SplitCoins の coin 入力',
          '2つ目の number 出力 → 2つ目の SplitCoins の amount 入力',
          '2つ目の SplitCoins ● → 2つ目の TransferObjects ●（フロー）',
          '2つ目の SplitCoins の coin 出力 → 2つ目の TransferObjects の object 入力',
          'my wallet の出力 → 2つ目の TransferObjects の recipient 入力',
          '2つ目の TransferObjects ● → End ●（フロー）',
        ],
        ko: [
          '첫 번째 TransferObjects ● → 두 번째 SplitCoins ● (플로우)',
          'gas의 출력 → 두 번째 SplitCoins의 coin 입력',
          '두 번째 number 출력 → 두 번째 SplitCoins의 amount 입력',
          '두 번째 SplitCoins ● → 두 번째 TransferObjects ● (플로우)',
          '두 번째 SplitCoins의 coin 출력 → 두 번째 TransferObjects의 object 입력',
          'my wallet의 출력 → 두 번째 TransferObjects의 recipient 입력',
          '두 번째 TransferObjects ● → End ● (플로우)',
        ],
      },
      tip: {
        en: 'Reuse the gas and my wallet you created earlier. Being able to split from one gas coin multiple times is a strength of PTB.',
        ja: 'gas と my wallet は最初に作ったものを再利用します。1つのガスコインから複数回分割できるのがPTBの強みです。',
        ko: 'gas와 my wallet은 처음에 만든 것을 재사용합니다. 하나의 가스 코인에서 여러 번 분할할 수 있는 것이 PTB의 강점입니다.',
      },
    },
    {
      title: {
        en: 'Execute and verify the result',
        ja: '実行して結果を確認',
        ko: '실행하고 결과 확인',
      },
      instructions: {
        en: [
          'Check "Code" in the top-right to show the code preview again',
          'Click the ▶ button at the bottom-right of the code preview to execute',
          'Approve in the wallet signing screen',
          'Check the result in Explorer via the Last Tx link',
        ],
        ja: [
          '右上の「Code」チェックを入れて、コードプレビューを再表示する',
          'コードプレビュー右下の ▶ ボタンをクリックして実行',
          'ウォレットの署名画面で承認',
          'Last Tx のリンクから Explorer で結果を確認',
        ],
        ko: [
          '오른쪽 상단의 "Code" 체크를 켜서 코드 미리보기를 다시 표시',
          '코드 미리보기 오른쪽 하단의 ▶ 버튼을 클릭하여 실행',
          '지갑의 서명 화면에서 승인',
          'Last Tx 링크에서 Explorer로 결과 확인',
        ],
      },
      tip: {
        en: 'If you sent to yourself, your balance will barely change, but you can verify the transaction details in Explorer.',
        ja: '自分自身に送金した場合、残高はほぼ変わりませんが、Explorer でトランザクション内容を確認できます。',
        ko: '자기 자신에게 송금한 경우 잔액은 거의 변하지 않지만, Explorer에서 트랜잭션 내용을 확인할 수 있습니다.',
      },
    },
  ],
};
