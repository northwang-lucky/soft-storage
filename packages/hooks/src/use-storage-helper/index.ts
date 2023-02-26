import { StorageModuleSchema } from '@soft-storage/shared';
import { SoftStorage } from '../create-storage/types';
import { StorageHelper } from './types';

export function useStorageHelper<T extends StorageModuleSchema>({
  storageModule,
  helper,
  initial,
}: SoftStorage<T>): StorageHelper {
  return {
    size: () => storageModule.size(),
    contains: (key: string) => storageModule.contains(key),
    initialize: () => helper.setModule(initial),
  };
}
