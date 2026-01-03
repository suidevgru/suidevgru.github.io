import type { Chain, PTBDoc } from '@zktx.io/ptb-builder';

export type PTBTemplateItem = {
  id: string;
  label: string;
  description?: string;
  detail?: string;
  defaultName?: string;
  getDoc: (opts: { chain: Chain; sender?: string }) => PTBDoc;
};

