import { createLocalStorage, createSessionStorage } from '../src/create-storage';
import { UseStorage } from '../src/create-storage/types';

interface TestStorage {
  str: string;
  num: number;
  bool: boolean;
}

function useTestCase(useStorage: UseStorage<TestStorage>) {
  const {
    storage: { str, num, bool },
    storageActions,
  } = useStorage();

  str.set('string');
  expect(str.get()).toBe('string');
  expect(str.exist()).toBe(true);

  expect(storageActions.contains('num')).toBe(false);
  expect(storageActions.size()).toBe(2);

  num.set(1);
  expect(num.get()).toBe(1);
  expect(storageActions.size()).toBe(3);

  expect(bool.get()).toBe(true);
  bool.remove();
  expect(storageActions.size()).toBe(2);

  storageActions.clear();
  expect(storageActions.size()).toBe(0);
}

test('createLocalStorage', () => {
  const useStorage = createLocalStorage<TestStorage>('createLocalStorageTest', { bool: true });
  useTestCase(useStorage);
});

test('createSessionStorage', () => {
  const useStorage = createSessionStorage<TestStorage>('createSessionStorageTest', { bool: true });
  useTestCase(useStorage);
});
