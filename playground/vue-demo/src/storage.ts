import { createLocalStorage } from '@smart-storage/vue-hooks';

type TestStorage = {
  str?: string;
  num?: number;
  bool: boolean;
  arr: string[];
  obj: { key?: string };
  nestedObj: {
    arr: { str: string }[];
    obj: { str?: string };
  };
};

export const storage = createLocalStorage<TestStorage>({
  storageModuleKey: 'vue_test_key',
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

export const protectedStorage = createLocalStorage<{ test: string }>({
  storageModuleKey: 'vue_test_protect_key',
  protect: true,
  initial: { test: '456' },
});
