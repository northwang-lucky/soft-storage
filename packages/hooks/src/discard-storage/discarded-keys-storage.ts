import { createLocalStorage } from '../create-storage';

export const useStorage = createLocalStorage<Partial<Record<string, boolean>>>({
  rootNodeKey: '__discarded_keys__',
  initial: {},
});
