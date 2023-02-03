import { createLocalStorage, createSessionStorage } from '../src';
import { UseStorage, UseStorageHelper } from '../src/create-storage/types';

interface TestStorage {
  str?: string;
  num?: number;
  bool: boolean;
}

function useTestCase(useStorage: UseStorage<TestStorage>, useStorageHelper: UseStorageHelper) {
  const { str, num, bool } = useStorage();
  const storageHelper = useStorageHelper();

  str.set('string');
  expect(str.get()).toBe('string');
  expect(str.exist()).toBe(true);

  expect(storageHelper.contains('num')).toBe(false);
  expect(storageHelper.size()).toBe(2);

  num.set(1);
  expect(num.get()).toBe(1);
  expect(storageHelper.size()).toBe(3);

  expect(bool.get()).toBe(true);
  bool.remove();
  expect(storageHelper.size()).toBe(2);

  storageHelper.clear();
  expect(storageHelper.size()).toBe(0);

  storageHelper.initialize();
  expect(storageHelper.size()).toBe(1);
  expect(bool.get()).toBe(true);
}

test('createLocalStorage', () => {
  const { useStorage, useStorageHelper } = createLocalStorage<TestStorage>({
    rootNodeKey: 'createLocalStorageTest',
    initial: { bool: true },
  });
  useTestCase(useStorage, useStorageHelper);
});

test('createSessionStorage', () => {
  const { useStorage, useStorageHelper } = createSessionStorage<TestStorage>({
    rootNodeKey: 'createSessionStorageTest',
    initial: { bool: true },
  });
  useTestCase(useStorage, useStorageHelper);
});

test('storageProtect', () => {
  const { useStorage } = createSessionStorage<TestStorage>({
    rootNodeKey: 'storageProtectTest',
    protect: true,
    initial: { bool: true },
  });

  (() => {
    const { bool } = useStorage();
    try {
      window.sessionStorage.setItem('storageProtectTest', '123');
    } catch (err: any) {
      const message = `Direct calls for setItem to "storageProtectTest" are disabled! Do not use the 'protect' property if this is not your preference.`;
      expect(err.message).toBe(message);
    }

    try {
      window.sessionStorage.removeItem('storageProtectTest');
    } catch (err: any) {
      const message = `Direct calls for removeItem to "storageProtectTest" are disabled! Do not use the 'protect' property if this is not your preference.`;
      expect(err.message).toBe(message);
    }

    expect(bool.get()).toBe(true);

    bool.set(false);
    expect(bool.get()).toBe(false);
  })();
});

test('storageVersion', () => {
  createSessionStorage({
    rootNodeKey: 'storageVersionKey',
    initial: { key: 1 },
  });

  const { useStorageHelper } = createSessionStorage({
    rootNodeKey: 'storageVersionKey',
    version: 2,
    initial: { newKey: 1 },
  });

  (() => {
    const storageHelper = useStorageHelper();
    expect(storageHelper.contains('newKey')).toBe(true);
    expect(storageHelper.contains('key')).toBe(false);
  })();
});

test('storagePreVersion', () => {
  createLocalStorage({
    rootNodeKey: 'storagePreVersionKey',
    version: 2,
    initial: { key: 1 },
  });

  const { useStorageHelper } = createLocalStorage({
    rootNodeKey: 'storagePreVersionKey',
    version: 4,
    preVersion: 2,
    initial: { newKey: 1 },
  });

  (() => {
    const storageHelper = useStorageHelper();
    expect(storageHelper.contains('newKey')).toBe(true);
    expect(storageHelper.contains('key')).toBe(false);
  })();
});

test('storageVersionMinimumError', () => {
  try {
    createSessionStorage({
      rootNodeKey: 'storageVersionMinimumErrorKey',
      initial: { key: 1 },
    });

    const { useStorageHelper } = createSessionStorage({
      rootNodeKey: 'storageVersionMinimumErrorKey',
      version: 0,
      initial: { newKey: 1 },
    });

    (() => {
      const storageHelper = useStorageHelper();
      expect(storageHelper.contains('newKey')).toBe(true);
      expect(storageHelper.contains('key')).toBe(false);
    })();
  } catch (err: any) {
    expect(err.message).toBe("The minimum value of property 'version' is 1!");
  }
});

test('storagePreVersionGreaterThenVersion', () => {
  try {
    createLocalStorage({
      rootNodeKey: 'storagePreVersionGreaterThenVersionKey',
      version: 2,
      initial: { key: 1 },
    });

    const { useStorageHelper } = createLocalStorage({
      rootNodeKey: 'storagePreVersionGreaterThenVersionKey',
      version: 1,
      preVersion: 2,
      initial: { newKey: 1 },
    });

    (() => {
      const storageHelper = useStorageHelper();
      expect(storageHelper.contains('newKey')).toBe(true);
      expect(storageHelper.contains('key')).toBe(false);
    })();
  } catch (err: any) {
    expect(err.message).toBe("Property 'preVersion' must be less than property 'version'!");
  }
});
