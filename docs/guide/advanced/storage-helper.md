# Storage Helper

Smart Storage provides a hook function called useStorageHelper to use the other capabilities of the storage module.

## For Vue and React

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks'; // or @smart-storage/react-hooks

interface TestStorage {
  str: string;
  num?: number;
}

export const { useStorageHelper } = createLocalStorage<TestStorage>({
  rootNodeKey: 'test_storage_key',
  initial: { str: '' },
});
```

Now, you can use the hook in a component (React is the same as Vue):

```vue
<script setup lang="ts">
import { useStorageHelper } from './storage';

const storageHelper = useStorageHelper();

// Get the size of storage module (the count of keys)
storageHelper.size();
// Whether the key is in the storage module (Do not have type hints)
storageHelper.contains('nonexistent');
// Restore the storage module to its initial state
// (that is, the value of the initial attribute when the storage module was created)
storageHelper.initialize();
</script>
```

:::warning
The `storageHelper.clear()` is not recommended in the framework because in the framework, properties in the storage module are associated with variables in the component one by one. If `storageHelper.clear()` is used to clear the storage module, variables in the component cannot sense that the storage module is cleared. As a result, non-nullable properties in the storage module and corresponding variables in the component are out of sync, resulting in unexpected errors.
:::

## For Raw Usage

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/hooks';

interface TestStorage {
  str: string;
  num?: number;
}

export const { useStorageHelper } = createLocalStorage<TestStorage>({
  rootNodeKey: 'test_storage_key',
  initial: { str: '' },
});
```

Use anywhere:

```ts
import { useStorageHelper } from './storage.ts';

const storageHelper = useStorageHelper();

// Get the size of storage module (the count of keys)
storageHelper.size();
// Whether the key is in the storage module (Do not have type hints)
storageHelper.contains('nonexistent');
// Restore the storage module to its initial state
// (that is, the value of the initial attribute when the storage module was created)
storageHelper.initialize();
// Clear storage module
storageHelper.clear();
```
