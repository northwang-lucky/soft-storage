import { StorageModule, StorageType } from '../src';
import { storageModulePool } from '../src/storage-module-pool';

type TestStorage = {
  num: number;
  str: string;
};

function testStorageModule(storageType: StorageType): void {
  const storageModule = new StorageModule<TestStorage>('storageModuleTest', storageType);

  storageModule.setItem('num', 1);
  let numValue = storageModule.getItem('num');
  expect(numValue).toBe(1);

  let exist = storageModule.contains('num');
  expect(exist).toBe(true);

  exist = storageModule.contains('str');
  expect(exist).toBe(false);

  expect(storageModule.size()).toBe(1);

  storageModule.removeItem('num');
  numValue = storageModule.getItem('num');
  expect(numValue).toBe(undefined);

  storageModule.setItem('num', 1);
  storageModule.setItem('str', 'string');
  storageModule.removeItem('str');
  const strValue = storageModule.getItem('str');
  expect(strValue).toBe(undefined);

  const helper = storageModule.getHelper();
  const rootValue = helper.getModule();
  expect(rootValue).toStrictEqual({ num: 1 });
}

test('StorageModuleLocal', () => {
  testStorageModule(StorageType.LOCAL);
});
test('StorageModuleSession', () => {
  testStorageModule(StorageType.SESSION);
});

test('ConflictCheckLocal', () => {
  const storageModule = new StorageModule<TestStorage>('conflictCheckLocalTest', StorageType.LOCAL);
  storageModule.getHelper().setModule({ num: 1, str: '2' });

  try {
    const anotherStorageModule = new StorageModule<TestStorage>('conflictCheckLocalTest', StorageType.LOCAL);
    anotherStorageModule.getHelper().setModule({ num: 1, str: '2' });
  } catch (err: any) {
    expect(err.message).toBe("Storage module key 'conflictCheckLocalTest' is already existed!");
  }
});

test('ConflictCheckSession', () => {
  const storageModule = new StorageModule<TestStorage>('conflictCheckSessionTest', StorageType.SESSION);
  storageModule.getHelper().setModule({ num: 1, str: '2' });

  try {
    const anotherStorageModule = new StorageModule<TestStorage>('conflictCheckSessionTest', StorageType.SESSION);
    anotherStorageModule.getHelper().setModule({ num: 1, str: '2' });
  } catch (err: any) {
    expect(err.message).toBe("Storage module key 'conflictCheckSessionTest' is already existed!");
  }
});

test('NoPoolStorageModule', () => {
  const storageModule = new StorageModule('noPoolStorageModuleTest', StorageType.SESSION, true);
  const contains = storageModulePool.contains(storageModule);
  expect(contains).toBe(false);
});
