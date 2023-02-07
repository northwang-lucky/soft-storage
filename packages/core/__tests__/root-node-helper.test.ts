import { StorageType } from '../src';
import { StorageModuleHelper } from '../src/root-node-helper';

interface TestStorage {
  key: string;
}

test('StorageModuleHelper', () => {
  const origin = { key: 'test-value' };
  const helper = new StorageModuleHelper<TestStorage>('storageModuleHelperTest', StorageType.SESSION);

  const storageKey = helper.getStorageKey();
  expect(storageKey).toBe('storageModuleHelperTest');

  helper.setRootValue(origin);
  let storageModule = helper.getRootValue();
  expect(storageModule).toStrictEqual(origin);

  storageModule = helper.getRootValue();
  expect(storageModule).toStrictEqual(origin);

  helper.removeRootValue();
  storageModule = helper.getRootValue();
  expect(storageModule).toStrictEqual({});
  expect(helper.getExistence()).toBe(false);
});

interface FirstModule {
  keep: number;
  first?: string;
}

interface SecondModule {
  keep: number;
  second?: string;
}

function disableDirectCalls(storageType: StorageType) {
  const firstKey = 'disableDirectCallsFirstTest';
  const firstHelper = new StorageModuleHelper<FirstModule>(firstKey, storageType);
  firstHelper.setRootValue({ keep: 1, first: '1' });
  firstHelper.protect();

  const secondKey = 'disableDirectCallsSecondTest';
  const secondHelper = new StorageModuleHelper<SecondModule>(secondKey, storageType);
  secondHelper.setRootValue({ keep: 2, second: '2' });
  secondHelper.protect();

  const windowStorage = storageType === StorageType.LOCAL ? window.localStorage : window.sessionStorage;

  // Test setItem()
  try {
    windowStorage.setItem(firstKey, '123');
  } catch (err: any) {
    const message = `Direct calls for setItem to "${firstKey}" are disabled! Do not use the 'protect' property if this is not your preference.`;
    expect(err.message).toBe(message);
  }

  try {
    windowStorage.setItem(secondKey, '123');
  } catch (err: any) {
    const message = `Direct calls for setItem to "${secondKey}" are disabled! Do not use the 'protect' property if this is not your preference.`;
    expect(err.message).toBe(message);
  }

  windowStorage.setItem('noProtectKey', '123');
  expect(windowStorage.getItem('noProtectKey')).toBe('123');

  windowStorage.setItem('noProtectKey', '123');
  expect(windowStorage.getItem('noProtectKey')).toBe('123');

  firstHelper.setRootValue({ keep: 11 });
  expect(firstHelper.getRootValue()).toStrictEqual({ keep: 11 });

  secondHelper.setRootValue({ keep: 22 });
  expect(secondHelper.getRootValue()).toStrictEqual({ keep: 22 });

  // Test removeItem()
  try {
    windowStorage.removeItem(firstKey);
  } catch (err: any) {
    const message = `Direct calls for removeItem to "${firstKey}" are disabled! Do not use the 'protect' property if this is not your preference.`;
    expect(err.message).toBe(message);
  }

  try {
    windowStorage.removeItem(secondKey);
  } catch (err: any) {
    const message = `Direct calls for removeItem to "${secondKey}" are disabled! Do not use the 'protect' property if this is not your preference.`;
    expect(err.message).toBe(message);
  }

  windowStorage.removeItem('noProtectKey');
  expect(windowStorage.getItem('noProtectKey')).toBe(null);

  windowStorage.removeItem('noProtectKey');
  expect(windowStorage.getItem('noProtectKey')).toBe(null);

  firstHelper.removeRootValue();
  expect(firstHelper.getRootValue()).toStrictEqual({});

  secondHelper.removeRootValue();
  expect(secondHelper.getRootValue()).toStrictEqual({});

  // Test clear()
  windowStorage.setItem('noProtectKey', '123');
  expect(windowStorage.getItem('noProtectKey')).toBe('123');

  firstHelper.setRootValue({ keep: 11 });
  expect(firstHelper.getRootValue()).toStrictEqual({ keep: 11 });

  secondHelper.setRootValue({ keep: 22 });
  expect(secondHelper.getRootValue()).toStrictEqual({ keep: 22 });

  windowStorage.clear();
  expect(firstHelper.getRootValue()).toStrictEqual({ keep: 11 });
  expect(secondHelper.getRootValue()).toStrictEqual({ keep: 22 });
  expect(windowStorage.length).toBe(2);
  expect(windowStorage.getItem('noProtectKey')).toBe(null);

  // For coverage
  expect(windowStorage.foo()).toBe(undefined);

  // Test cancelProtect()
  firstHelper.cancelProtect();
  secondHelper.cancelProtect();
  expect(JSON.parse(windowStorage.getItem(firstKey) ?? '{}')).toStrictEqual({ keep: 11 });
  expect(JSON.parse(windowStorage.getItem(secondKey) ?? '{}')).toStrictEqual({ keep: 22 });

  windowStorage.setItem(firstKey, '123');
  expect(windowStorage.getItem(firstKey)).toBe('123');

  windowStorage.removeItem(firstKey);
  expect(windowStorage.getItem(firstKey)).toBe(null);

  windowStorage.clear();
  expect(windowStorage.getItem(secondKey)).toBe(null);
}

test('StorageModuleHelper.disableDirectCalls', () => {
  disableDirectCalls(StorageType.SESSION);
});

test('StorageModuleHelper.disableDirectCalls.reverse', () => {
  disableDirectCalls(StorageType.LOCAL);
});
