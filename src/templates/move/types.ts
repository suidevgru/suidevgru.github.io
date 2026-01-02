export type FileMap = Record<string, string>;

export type MoveTemplate = {
  id: string;
  label: string;
  description?: string;
  detail?: string;
  defaultName?: string;
  files: (pkg: string) => FileMap;
};

export const withCommon = (content: string) => content.trim();
