import type { Tutorial } from './types';
import { ptbDoubleTransferTutorial } from './ptb-double-transfer';

const TUTORIALS: Tutorial[] = [ptbDoubleTransferTutorial];

export function findTutorial(id: string): Tutorial | undefined {
  return TUTORIALS.find((t) => t.id === id);
}
