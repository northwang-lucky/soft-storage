# Storage Helper

Smart Storage provides a hook function called `useStorageHelper` to use the other capabilities of the storage module.

## For Vue and React

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks';
// import { createLocalStorage } from '@smart-storage/react-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

Now, you can use the `useStorageHelper` hook in a component (React is the same as Vue):

```vue
<script setup lang="ts">
import { useStorageHelper } from '@smart-storage/vue-hooks';
import { storage } from './storage';

const storageHelper = useStorageHelper(storage);

// Get the size of storage module (the count of keys)
storageHelper.size();
// Whether the key is in the storage module (Do not have type hints)
storageHelper.contains('nonexistent');
// Restore the storage module to its initial state
// (that is, the value of the initial attribute when the storage module was created)
storageHelper.initialize();
</script>
```

## For Standalone Use

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

Use anywhere:

```ts
import { useStorageHelper } from '@smart-storage/hooks';
import { storage } from './storage';

const storageHelper = useStorageHelper(storage);

// Get the size of storage module (the count of keys)
storageHelper.size();
// Whether the key is in the storage module (Do not have type hints)
storageHelper.contains('nonexistent');
// Restore the storage module to its initial state
// (that is, the value of the initial attribute when the storage module was created)
storageHelper.initialize();
```

## How about `clear()` API?

::: tip
`storageHelper.clear()` is an unsupported API. Click [Q&A > About Remove and Clear](./../other/questions-and-answers.html#about-remove-and-clear) for more details.
:::
