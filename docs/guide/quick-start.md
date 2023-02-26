# Quick Start

Soft Storage provides three ways to manage storage:

- Combined with the `ref` API in **Vue 3**
- Combined with `useState` API in **React**
- Standalone use in any project that supports **cjs modules** or **esm modules**

In addition, if you only want to use a shallow modular wrapper for the browser's Storage API, you can go straight to the [Raw Usage](#raw-usage) section.

::: warning
Attention please! You should never use `interface` to define a type in Soft Storage, to instead of it, you can use `type`. Click [Q&A > About Interface](./other/questions-and-answers.html#about-interface) for more details.
:::

## For Vue 3 <Badge text="vue >= 3.1.0" />

### Install

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

<CodeScroll>

```bash
npm install @soft-storage/vue-hooks
```

</CodeScroll>

:::

::: slot yarn

<CodeScroll>

```bash
yarn add @soft-storage/vue-hooks
```

</CodeScroll>

:::

::: slot pnpm

<CodeScroll>

```bash
pnpm add @soft-storage/vue-hooks
```

</CodeScroll>

:::

</CodeSwitcher>

### Create a Storage Module

Create a new file anywhere, and use like this:

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  // This is storage key
  storageModuleKey: 'user_info',
  // Used to initialize
  initial: {
    hasSigned: false, // Non-nullable properties must be initialized
    // Optional properties cannot be initialized
  },
});
```

</CodeScroll>

### Use Hooks in Component

<CodeScroll>

```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { useStorage } from '@soft-storage/vue-hooks';
import { storage } from './storage';

/* You can easily deconstruct the hook's return value,
because TypeScript will give you great type hints */
const {
  refs: { token, hasSigned },
  resetters: { resetToken, resetHasSigned },
  checkers: { containsToken, containsHasSigned },
} = useStorage(storage);

onMounted(() => {
  getUserInfo().then(res => {
    token.value = res.token; // It's a ref
    hasSigned.value = true; // Same as above
  });
});

const onSignOut = () => {
  resetToken(); // Reset the value of token
  resetHasSigned(); // Reset the value of hasSigned
};
</script>

<template>
  <div>Contains token: {{ containsToken() }}</div>
  <div>Contains hasSigned: {{ containsHasSigned() }}</div>
  <button @click="onSignOut">Sign out</button>
</template>
```

</CodeScroll>

## For React <Badge text="react >= 16.8.0" />

### Install

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

<CodeScroll>

```bash
npm install @soft-storage/react-hooks
```

</CodeScroll>

:::

::: slot yarn

<CodeScroll>

```bash
yarn add @soft-storage/react-hooks
```

</CodeScroll>

:::

::: slot pnpm

<CodeScroll>

```bash
pnpm add @soft-storage/react-hooks
```

</CodeScroll>

:::

</CodeSwitcher>

### Create a Storage Module

Create a new file anywhere, and use like this:

<CodeScroll>

```ts
// storage.ts
import { createSessionStorage } from '@soft-storage/react-hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  // This is storage key
  storageModuleKey: 'user_info',
  // Used to initialize
  initial: {
    hasSigned: false, // Non-nullable properties must be initialized
    // Optional properties cannot be initialized
  },
});
```

</CodeScroll>

### Use Hooks in Component

<CodeScroll>

```tsx
import React, { useEffect } from 'react';
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { useStorage } from '@soft-storage/react-hooks';
import { storage } from './storage';

function UserInfoFC() {
  /* You can easily deconstruct the hook's return value,
  because TypeScript will give you great type hints */
  const {
    tokenState: { token, setToken, resetToken, containsToken },
    hasSignedState: { hasSigned, setHasSigned, resetHasSigned, containsHasSigned },
  } = useStorage(storage);

  useEffect(() => {
    getUserInfo().then(res => {
      setToken(res.token);
      setHasSigned(true);
    });
  }, []);

  const onSignOut = () => {
    resetToken(); // Reset the value of token
    resetHasSigned(); // Reset the value of hasSigned
  };

  return (
    <>
      <div>Contains token: {containsToken()}</div>
      <div>Contains hasSigned: {containsHasSigned()}</div>
      <button onClick={onSignOut}>Sign out</button>
    </>
  );
}

export default UserInfoFC;
```

</CodeScroll>

## For Standalone Use

### Install

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

<CodeScroll>

```bash
npm install @soft-storage/hooks
```

</CodeScroll>

:::

::: slot yarn

<CodeScroll>

```bash
yarn add @soft-storage/hooks
```

</CodeScroll>

:::

::: slot pnpm

<CodeScroll>

```bash
pnpm add @soft-storage/hooks
```

</CodeScroll>

:::

</CodeSwitcher>

### Create a Storage Module

Create a new file anywhere, and use like this:

<CodeScroll>

```ts
// storage.ts
import { createSessionStorage } from '@soft-storage/hooks';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  // This is storage key
  storageModuleKey: 'user_info',
  // Used to initialize
  initial: {
    hasSigned: false, // Non-nullable properties must be initialized
    // Optional properties cannot be initialized
  },
});
```

</CodeScroll>

### Use Hooks in a Script File

<CodeScroll>

```ts
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { useStorage } from '@soft-storage/hooks';
import { storage } from './storage';

const { token, hasSigned } = useStorage(storage);

(() => {
  getUserInfo().then(res => {
    token.set(res.token);
    hasSigned.set(true);
    console.log(hasSigned.get()); // Output: true
  });
})();

const onSignOut = () => {
  token.reset(); // Set value to initial value, if not, it is set to undefined
  hasSigned.reset();
  console.log(token.get(), token.exist()); // Output: undefined, false
  console.log(hasSigned.get(), hasSigned.exist()); // Output: false, true
};
```

</CodeScroll>

## How about `remove()` API?

::: tip
`remove()` is an unsupported API. Click [Q&A > About Remove and Clear](./other/questions-and-answers.html#about-remove-and-clear) for more details.
:::

## Raw Usage

### Install

<CodeSwitcher :languages="{ npm: 'npm', yarn: 'yarn', pnpm: 'pnpm' }">

::: slot npm

<CodeScroll>

```bash
npm install @soft-storage/core
```

</CodeScroll>

:::

::: slot yarn

<CodeScroll>

```bash
yarn add @soft-storage/core
```

</CodeScroll>

:::

::: slot pnpm

<CodeScroll>

```bash
pnpm add @soft-storage/core
```

</CodeScroll>

:::

</CodeSwitcher>

### Create a Storage Module

<CodeScroll>

```ts
// storage.ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

const storageModule = new StorageModule<UserInfo>('user_info', StorageType.SESSION);

const helper = storageModule.getHelper();
if (!helper.getExistence()) {
  // Here the initialization is arbitrary, no restrictions
  helper.setModule({
    token: '',
    hasSigned: false,
  });
}

export { storageModule };
```

</CodeScroll>

### Use in Any Script File

<CodeScroll>

```ts
import { StorageModule, StorageType } from '@soft-storage/core';
import { getUserInfo } from '@/api'; // Suppose you have a function that gets user information
import { storageModule } from './storage.ts';

type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

(() => {
  getUserInfo().then(res => {
    storageModule.setItem('token', res.token);
    storageModule.setItem('hasSigned', true);
    console.log(storageModule.getItem('hasSigned')); // Output: true
    console.log(storageModule.contains('token')); // Output: true
  });
})();

const onSignOut = () => {
  storageModule.removeItem('token');
  storageModule.setItem('hasSigned', false);
  console.log(storageModule.getItem('token')); // Output: undefined
  console.log(storageModule.size()); // Output: 1

  // Or
  storageModule.clear();
  console.log(storageModule.size()); // Output: 0
};
```

</CodeScroll>

## Next

Now, you can enjoy the type hints brought by TypeScript!
