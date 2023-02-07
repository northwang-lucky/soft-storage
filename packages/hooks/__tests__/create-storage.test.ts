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
    storageModuleKey: 'createLocalStorageTest',
    initial: { bool: true },
  });
  useTestCase(useStorage, useStorageHelper);
});

test('createSessionStorage', () => {
  const { useStorage, useStorageHelper } = createSessionStorage<TestStorage>({
    storageModuleKey: 'createSessionStorageTest',
    initial: { bool: true },
  });
  useTestCase(useStorage, useStorageHelper);
});

test('storageProtect', () => {
  const { useStorage } = createSessionStorage<TestStorage>({
    storageModuleKey: 'storageProtectTest',
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
    storageModuleKey: 'storageVersionKey',
    initial: { key: 1 },
  });

  const { useStorageHelper } = createSessionStorage({
    storageModuleKey: 'storageVersionKey',
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
  const { useStorageHelper } = createLocalStorage({
    storageModuleKey: 'storagePreVersionKey',
    version: 2,
    initial: { key: 1 },
  });

  const { useStorageHelper: useNewStorageHelper } = createLocalStorage({
    storageModuleKey: 'storagePreVersionKey',
    version: 4,
    preVersion: 2,
    initial: { newKey: 1 },
  });

  (() => {
    const storageHelper = useStorageHelper();
    const storageNewHelper = useNewStorageHelper();
    expect(storageHelper.contains('key')).toBe(false);
    expect(storageNewHelper.contains('newKey')).toBe(true);
  })();
});

test('storageVersionMinimumError', () => {
  try {
    createSessionStorage({
      storageModuleKey: 'storageVersionMinimumErrorKey',
      initial: { key: 1 },
    });

    createSessionStorage({
      storageModuleKey: 'storageVersionMinimumErrorKey',
      version: 0,
      initial: { newKey: 1 },
    });
  } catch (err: any) {
    expect(err.message).toBe("The minimum value of property 'version' is 1!");
  }
});

test('storagePreVersionGreaterThenVersion', () => {
  try {
    createLocalStorage({
      storageModuleKey: 'storagePreVersionGreaterThenVersionKey',
      version: 2,
      initial: { key: 1 },
    });

    createLocalStorage({
      storageModuleKey: 'storagePreVersionGreaterThenVersionKey',
      version: 1,
      preVersion: 2,
      initial: { newKey: 1 },
    });
  } catch (err: any) {
    expect(err.message).toBe("Property 'preVersion' must be less than property 'version'!");
  }
});
