import type { Tutorial } from './types';

export const ptbTsExportTutorial: Tutorial = {
  id: 'ts-export',
  steps: [
    {
      title: {
        en: 'Review the Pre-loaded PTB',
        ja: 'プリロードされたPTBを確認',
        ko: '프리로드된 PTB 확인',
      },
      instructions: {
        en: [
          'The PTB from L10 (double transfer) is already loaded on the canvas',
          'You can see the flow: Start → SplitCoins → TransferObjects → SplitCoins → TransferObjects → End',
          'This is the PTB you will export as TypeScript code',
        ],
        ja: [
          'L10で作成したPTB（2つの送金）がキャンバスにプリロードされています',
          'Start → SplitCoins → TransferObjects → SplitCoins → TransferObjects → End というフローが確認できます',
          'このPTBをTypeScriptコードとしてエクスポートします',
        ],
        ko: [
          'L10에서 만든 PTB(이중 송금)가 캔버스에 프리로드되어 있습니다',
          'Start → SplitCoins → TransferObjects → SplitCoins → TransferObjects → End 플로우를 확인할 수 있습니다',
          '이 PTB를 TypeScript 코드로 내보냅니다',
        ],
      },
      tip: {
        en: "If you completed L10, this is the same PTB you built. If not, don't worry - the sample is ready to use.",
        ja: 'L10を完了していれば、あのとき作ったPTBと同じものです。完了していなくても大丈夫です。',
        ko: 'L10을 완료했다면 그때 만든 PTB와 같은 구조입니다. 완료하지 않았어도 괜찮습니다.',
      },
    },
    {
      title: {
        en: 'Check the ts-sdk preview window',
        ja: 'ts-sdk previewウインドウを確認',
        ko: 'ts-sdk preview 윈도우 확인',
      },
      instructions: {
        en: [
          'The ts-sdk preview window shows the TypeScript code that corresponds to the visual PTB',
          'The preview updates in real-time as you modify the PTB on the canvas',
        ],
        ja: [
          'ts-sdk previewウインドウには、キャンバス上のPTBに対応するTypeScriptコードが表示されています',
          'キャンバス上のPTBを変更すると、プレビューもリアルタイムで更新されます',
        ],
        ko: [
          'ts-sdk preview 윈도우에는 캔버스의 PTB에 해당하는 TypeScript 코드가 표시되어 있습니다',
          '캔버스의 PTB를 변경하면 미리보기도 실시간으로 업데이트됩니다',
        ],
      },
    },
    {
      title: {
        en: 'Export the .ptb file',
        ja: '.ptbファイルをエクスポート',
        ko: '.ptb 파일 내보내기',
      },
      instructions: {
        en: [
          'Find the "Export" button (floppy disk icon) in the ts-sdk preview window',
          'Click the Export button to download the .ptb file',
          'The .ptb file saves the PTB graph definition in JSON format',
        ],
        ja: [
          'ts-sdk previewウインドウの「Export」ボタン（フロッピーアイコン）を見つけてください',
          'Exportボタンをクリックして、.ptbファイルをダウンロードします',
          '.ptbファイルにはPTBのグラフ定義がJSON形式で保存されます',
        ],
        ko: [
          'ts-sdk preview 윈도우에서 "Export" 버튼(플로피 아이콘)을 찾으세요',
          'Export 버튼을 클릭하여 .ptb 파일을 다운로드합니다',
          '.ptb 파일에는 PTB의 그래프 정의가 JSON 형식으로 저장됩니다',
        ],
      },
      tip: {
        en: 'The .ptb file contains the graph definition (JSON), not TypeScript code. TS code can be copied from the ts-sdk preview window.',
        ja: '.ptbファイルはグラフ定義（JSON）です。TSコードはts-sdk previewウインドウからコピーできます。',
        ko: '.ptb 파일은 그래프 정의(JSON)입니다. TS 코드는 ts-sdk preview 윈도우에서 복사할 수 있습니다.',
      },
    },
  ],
};
