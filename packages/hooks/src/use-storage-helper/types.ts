export type StorageHelper = {
  size: () => number;
  contains: (key: string) => boolean;
  initialize: () => void;
};
