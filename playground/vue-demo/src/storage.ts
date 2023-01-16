import { createLocalStorage } from '@smart-storage/hooks';

export const useStorage = createLocalStorage<{
  str: string;
  num: number;
  bool: boolean;
  arr: string[];
  obj: {
    key: string;
  };
  nestObj: {
    arr: {
      str: string;
    }[];
    sub: {
      str: string;
    };
  };
}>('test-key', {
  str: '',
  bool: false,
});
