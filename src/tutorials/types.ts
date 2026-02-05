export type TutorialStep = {
  title: string;
  instructions: string[];
  tip?: string;
};

export type Tutorial = {
  id: string;
  steps: TutorialStep[];
};
