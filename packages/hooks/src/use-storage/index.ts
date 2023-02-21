import { createProxy, StorageModuleSchema } from '@smart-storage/shared';
import { SmartStorage } from '../create-storage/types';
import { StorageInstance, StorageItem } from './types';

export function useStorage<T extends StorageModuleSchema>({
  storageModule,
  initial,
}: SmartStorage<T>): StorageInstance<T> {
  const proxyGetter = (_: object, property: string): StorageItem<T, keyof T> => ({
    get: () => storageModule.getItem(property) as T[keyof T],
    set: (value: T[keyof T]) => storageModule.setItem(property, value),
    exist: () => storageModule.contains(property),
    reset: () => {
      if (Object.prototype.hasOwnProperty.call(initial, property)) {
        storageModule.setItem(property, initial[property] as T[keyof T]);
        return;
      }
      storageModule.setItem(property, undefined as T[keyof T]);
    },
  });
  return createProxy<object, StorageInstance<T>>({}, { get: proxyGetter });
}
