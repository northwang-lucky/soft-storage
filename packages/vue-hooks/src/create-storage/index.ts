import { Ref, ref, UnwrapRef, watch } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import {
  createLocalStorage as createLocalStorageRaw,
  createSessionStorage as createSessionStorageRaw,
  CreateStorageOptions,
  StorageItem,
  UseStorage,
  UseStorageHelper,
} from '@smart-storage/hooks';
import { createProxy, restorePrefixedKey, Runnable, Supplier, StorageModuleSchema } from '@smart-storage/shared';
import { CreateStorage, StorageCheckers, StorageRefs, StorageResetters } from './types';

function createStorage<T extends StorageModuleSchema>(
  useStorage: UseStorage<T>,
  useStorageHelper: UseStorageHelper,
  { initial }: CreateStorageOptions<T>
): CreateStorage<T> {
  const storage = useStorage();
  const storageHelperRaw = useStorageHelper();

  const itemRefDict = {} as Record<keyof T, Ref<UnwrapRef<T[keyof T]>>>;
  const properties: (keyof T)[] = [];

  function useItemRef(item: StorageItem<T[keyof T]>, property: keyof T): Ref<UnwrapRef<T[keyof T]>> {
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
      const resetter = (
        property: keyof T,
        itemRef: Ref<UnwrapRef<T[keyof T]>>,
        item: StorageItem<T[keyof T]>
      ): void => {
        if (initial && Object.prototype.hasOwnProperty.call(initial, property)) {
          const defVal = initial[property];
          itemRef.value = (defVal instanceof Object ? cloneDeep(defVal) : defVal) as UnwrapRef<T[keyof T]>;
          item.set(defVal);
          return;
        }
        itemRef.value = undefined as UnwrapRef<T[keyof T]>;
        item.remove();
      };

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
            const property = restorePrefixedKey(p, 'reset') as keyof T;
            const item = storage[property];
            const itemRef = useItemRef(item, property);
            return () => resetter(property, itemRef, item);
          },
        }
      );

      const checkers = createProxy<object, StorageCheckers<T>>(
        {},
        {
          get: (_, p: string): Supplier<boolean> => {
            const property = restorePrefixedKey(p, 'contains') as keyof T;
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
          if (initial && Object.prototype.hasOwnProperty.call(initial, key)) {
            const defVal = initial[key];
            itemRefDict[key].value = (defVal instanceof Object ? cloneDeep(defVal) : defVal) as UnwrapRef<T[keyof T]>;
          } else {
            itemRefDict[key].value = undefined as UnwrapRef<T[keyof T]>;
          }
        }
      },
    }),
  };
}

export function createLocalStorage<T extends StorageModuleSchema>(options: CreateStorageOptions<T>): CreateStorage<T> {
  const { useStorage, useStorageHelper } = createLocalStorageRaw<T>(options);
  return createStorage(useStorage, useStorageHelper, options);
}

export function createSessionStorage<T extends StorageModuleSchema>(
  options: CreateStorageOptions<T>
): CreateStorage<T> {
  const { useStorage, useStorageHelper } = createSessionStorageRaw<T>(options);
  return createStorage(useStorage, useStorageHelper, options);
}
