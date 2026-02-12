export type Locale = 'en' | 'ja' | 'ko';

export type LocalizedText = Record<Locale, string>;
export type LocalizedTextArray = Record<Locale, string[]>;

export type TutorialStep = {
  title: LocalizedText;
  instructions: LocalizedTextArray;
  tip?: LocalizedText;
};

export type ResolvedTutorialStep = {
  title: string;
  instructions: string[];
  tip?: string;
};

export type Tutorial = {
  id: string;
  steps: TutorialStep[];
};
