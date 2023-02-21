import { StorageHelper } from '@smart-storage/hooks';
import { StorageModuleSchema } from '@smart-storage/shared';
import { UnwrapRef } from 'vue';
import { SmartStorage } from '../create-storage/types';

export function useStorageHelper<T extends StorageModuleSchema>({
  storage,
  storageHelper,
  itemRefDict,
  properties,
}: SmartStorage<T>): StorageHelper {
  const size = (): number => {
    return storageHelper.size();
  };

  const contains = (key: string): boolean => {
    return storageHelper.contains(key);
  };

  const initialize = (): void => {
    storageHelper.initialize();
    for (let i = 0; i < properties.length; ++i) {
      const key = properties[i];
      const item = storage[key];
      itemRefDict[key].value = item.get() as UnwrapRef<T[keyof T]>;
    }
  };

  return { size, contains, initialize };
}
