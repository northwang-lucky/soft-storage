import { createLocalStorage } from '@smart-storage/vue-hooks';

interface TestStorage {
  str?: string;
  num?: number;
  bool: boolean;
  arr: string[];
  obj: { key?: string };
  nestedObj: {
    arr: { str: string }[];
    obj: { str?: string };
  };
}

export const { useStorage, useStorageHelper } = createLocalStorage<TestStorage>({
  rootNodeKey: 'vue_test_key',
  initial: {
    bool: false,
    arr: [],
    obj: {},
    nestedObj: {
      arr: [],
      obj: {},
    },
  },
});

export const { useStorage: useProtectedStorage } = createLocalStorage<{ test: string }>({
  rootNodeKey: 'vue_test_protect_key',
  protect: true,
  initial: { test: '456' },
});
