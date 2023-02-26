import { createProxy, Runnable, restorePrefixedString, Supplier, StorageModuleSchema } from '@soft-storage/shared';
import { onUnmounted, ref, Ref, UnwrapRef, watch } from 'vue';
import { StorageRefs, StorageResetters, StorageCheckers, SoftStorage } from '../create-storage/types';
import { GetItemRefArgs, StorageReactions } from './types';

function getItemRef<T extends StorageModuleSchema>(
  property: keyof T,
  { item, itemRefDict, properties }: GetItemRefArgs<T>
): Ref<UnwrapRef<T[keyof T]>> {
  if (properties.indexOf(property) > -1) {
    return itemRefDict[property];
  }
  const itemRef = ref(item.get());
  const unwatch = watch(itemRef, value => item.set(value as T[keyof T]), { deep: true });
  onUnmounted(() => unwatch());
  itemRefDict[property] = itemRef;
  properties.push(property);
  return itemRef;
}

export function useStorage<T extends StorageModuleSchema>({
  storage,
  itemRefDict,
  properties,
}: SoftStorage<T>): StorageReactions<T> {
  const refs = createProxy<object, StorageRefs<T>>(
    {},
    {
      get: (_, property: string): Ref<UnwrapRef<T[keyof T]>> => {
        const item = storage[property];
        return getItemRef(property, {
          item,
          itemRefDict,
          properties,
        });
      },
    }
  );

  const resetters = createProxy<object, StorageResetters<T>>(
    {},
    {
      get: (_, p: string): Runnable => {
        const property = restorePrefixedString(p, 'reset') as keyof T;
        const item = storage[property];
        const itemRef = getItemRef(property, {
          item,
          itemRefDict,
          properties,
        });
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
}
