import type { Locale, ResolvedTutorialStep, Tutorial } from './types';
import { ptbDoubleTransferTutorial } from './ptb-double-transfer';

const TUTORIALS: Tutorial[] = [ptbDoubleTransferTutorial];

export type ResolvedTutorial = {
  id: string;
  steps: ResolvedTutorialStep[];
};

export function findTutorial(id: string, locale: string = 'en'): ResolvedTutorial | undefined {
  const tutorial = TUTORIALS.find((t) => t.id === id);
  if (!tutorial) return undefined;

  const loc = (['en', 'ja', 'ko'].includes(locale) ? locale : 'en') as Locale;

  return {
    id: tutorial.id,
    steps: tutorial.steps.map((step) => ({
      title: step.title[loc] ?? step.title.en,
      instructions: step.instructions[loc] ?? step.instructions.en,
      tip: step.tip ? (step.tip[loc] ?? step.tip.en) : undefined,
    })),
  };
}
