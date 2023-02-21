import { StorageModuleSchema } from '@smart-storage/shared';
import { SmartStorage } from '../create-storage/types';
import { StorageHelper } from './types';

export function useStorageHelper<T extends StorageModuleSchema>({
  storageModule,
  helper,
  initial,
}: SmartStorage<T>): StorageHelper {
  return {
    size: () => storageModule.size(),
    contains: (key: string) => storageModule.contains(key),
    initialize: () => helper.setModule(initial),
  };
}
