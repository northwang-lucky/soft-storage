import { Ref, ref, UnwrapRef, watch } from 'vue';
import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  StorageItem,
  UseStorage,
  UseStorageHelper,
} from '@smart-storage/hooks';
import { createProxy, restorePrefixedString, Runnable, Supplier, StorageModuleSchema } from '@smart-storage/shared';
import { CreateStorage, StorageCheckers, StorageRefs, StorageResetters } from './types';

function createStorage<T extends StorageModuleSchema>(
  useStorage: UseStorage<T>,
  useStorageHelper: UseStorageHelper
): CreateStorage<T> {
  const storage = useStorage();
  const storageHelperRaw = useStorageHelper();

  const itemRefDict = {} as Record<keyof T, Ref<UnwrapRef<T[keyof T]>>>;
  const properties: (keyof T)[] = [];

  function useItemRef(item: StorageItem<T, keyof T>, property: keyof T): Ref<UnwrapRef<T[keyof T]>> {
    if (properties.indexOf(property) > -1) {
      return itemRefDict[property];
    }
    const itemRef = ref(item.get());
    watch(itemRef, value => item.set(value as T[keyof T]), { deep: true });
    itemRefDict[property] = itemRef;
    properties.push(property);
    return itemRef;
  }

  return {
    useStorage: () => {
      const refs = createProxy<object, StorageRefs<T>>(
        {},
        {
          get: (_, property: string): Ref<UnwrapRef<T[keyof T]>> => {
            const item = storage[property];
            return useItemRef(item, property);
          },
        }
      );

      const resetters = createProxy<object, StorageResetters<T>>(
        {},
        {
          get: (_, p: string): Runnable => {
            const property = restorePrefixedString(p, 'reset') as keyof T;
            const item = storage[property];
            const itemRef = useItemRef(item, property);
            return () => {
              item.reset();
              itemRef.value = item.get() as UnwrapRef<T[keyof T]>;
            };
          },
        }
      );

      const checkers = createProxy<object, StorageCheckers<T>>(
        {},
        {
          get: (_, p: string): Supplier<boolean> => {
            const property = restorePrefixedString(p, 'contains') as keyof T;
            const item = storage[property];
            return () => item.exist();
          },
        }
      );

      return { refs, resetters, checkers };
    },
    useStorageHelper: () => ({
      size: () => storageHelperRaw.size(),
      contains: (key: string) => storageHelperRaw.contains(key),
      initialize: () => {
        storageHelperRaw.initialize();
        for (let i = 0; i < properties.length; ++i) {
          const key = properties[i];
          const item = storage[key];
          itemRefDict[key].value = item.get() as UnwrapRef<T[keyof T]>;
        }
      },
    }),
  };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): CreateStorage<T> {
  const { useStorage, useStorageHelper } = createLocalStorageRaw<T>(options);
  return createStorage(useStorage, useStorageHelper);
}

export function createSessionStorage<T extends StorageModuleSchema>(
  options: CreateStorageOptions<T>
): CreateStorage<T> {
  const { useStorage, useStorageHelper } = createSessionStorageRaw<T>(options);
  return createStorage(useStorage, useStorageHelper);
}
