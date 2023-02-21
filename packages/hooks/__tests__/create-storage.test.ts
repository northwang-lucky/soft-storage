import { createLocalStorage, createSessionStorage, SmartStorage, useStorage, useStorageHelper } from '../src';

type TestStorage = {
  str?: string;
  num?: number;
  bool: boolean;
};

function useTestCase(storage: SmartStorage<TestStorage>): void {
  const { str, num, bool } = useStorage(storage);
  const storageHelper = useStorageHelper(storage);

  str.set('string');
  expect(str.get()).toBe('string');
  expect(str.exist()).toBe(true);

  expect(storageHelper.contains('num')).toBe(false);
  expect(storageHelper.size()).toBe(2);

  num.set(1);
  expect(num.get()).toBe(1);
  expect(storageHelper.size()).toBe(3);

  num.reset();
  expect(num.get()).toBe(undefined);
  expect(storageHelper.size()).toBe(2);

  str.reset();
  expect(str.get()).toBe(undefined);
  expect(storageHelper.size()).toBe(1);

  num.set(100);
  expect(num.get()).toBe(100);
  bool.set(false);
  expect(bool.get()).toBe(false);
  expect(storageHelper.size()).toBe(2);

  storageHelper.initialize();
  expect(storageHelper.size()).toBe(1);
  expect(bool.get()).toBe(true);

  bool.set(false);
  expect(bool.get()).toBe(false);
  bool.reset();
  expect(bool.get()).toBe(true);
}

test('createLocalStorage', () => {
  const storage = createLocalStorage<TestStorage>({
    storageModuleKey: 'createLocalStorageTest',
    initial: { bool: true },
  });
  useTestCase(storage);
});

test('createSessionStorage', () => {
  const storage = createSessionStorage<TestStorage>({
    storageModuleKey: 'createSessionStorageTest',
    initial: { bool: true },
  });
  useTestCase(storage);
});

test('storageProtect', () => {
  const storage = createSessionStorage<TestStorage>({
    storageModuleKey: 'storageProtectTest',
    protect: true,
    initial: { bool: true },
  });

  ((): void => {
    const { bool } = useStorage(storage);
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

  const storage = createSessionStorage({
    storageModuleKey: 'storageVersionKey',
    version: 2,
    initial: { newKey: 1 },
  });

  ((): void => {
    const storageHelper = useStorageHelper(storage);
    expect(storageHelper.contains('newKey')).toBe(true);
    expect(storageHelper.contains('key')).toBe(false);
  })();
});

test('storagePreVersion', () => {
  const storage = createLocalStorage({
    storageModuleKey: 'storagePreVersionKey',
    version: 2,
    initial: { key: 1 },
  });

  const newStorage = createLocalStorage({
    storageModuleKey: 'storagePreVersionKey',
    version: 4,
    preVersion: 2,
    initial: { newKey: 1 },
  });

  ((): void => {
    const storageHelper = useStorageHelper(storage);
    const storageNewHelper = useStorageHelper(newStorage);
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
