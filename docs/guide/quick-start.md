# Quick Start

Smart Storage provides three ways to manage storage:

- Combined with the ref API in **Vue 3**
- Combined with useState API in **React**
- Standalone use in any project that supports **cjs modules** or **esm modules**

## For Vue 3

### Install

```sh
npm install @smart-storage/vue-hooks --save
```

### Create a storage module

Create a new file anywhere, and use like this:

```ts
// storage.ts
import { createLocalStorage } from '@smart-storage/vue-hooks';

interface TestStorage {
  str?: string;
  num?: number;
  bool: boolean;
  arr: string[];
}

export const { useStorage } = createLocalStorage<TestStorage>({
  // This is storage key
  rootNodeKey: 'vue_test_key',
  // Optional properties must be initialed
  initial: { bool: false, arr: [] },
});
```

### Use hooks in component

```vue
<script setup lang="ts">
import { useStorage } from './storage';

/* You can safely destructure the return value of this hook,
because TypeScript will provide you with great type hints */
const {
  refs: { str, num, bool, arr },
  resetters: { resetStr, resetNum, resetBool, resetArr },
  checkers: { containsStr, containsNum, containsBool, containsArr },
} = useStorage();

str.value = 'string'; // It's a ref
console.log(str.value);
resetStr(); // Reset the value of str
containsStr(); // Whether the key exists in the module (Recommended)
</script>

<template>
  <div>{{ str }}</div>
</template>
```

## For React

### Install

```sh
npm install @smart-storage/react-hooks --save
```

### Create a storage module

Create a new file anywhere, and use like this:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/vue-hooks';

interface TestStorage {
  str?: string;
  num?: number;
  bool: boolean;
  arr: string[];
}

export const { useStorage } = createSessionStorage<TestStorage>({
  // This is storage key
  rootNodeKey: 'react_test_key',
  // Optional properties must be initialed
  initial: { bool: false, arr: [] },
});
```

### Use hooks in a component

```tsx
import React, { useEffect } from 'react';
import { useStorage } from './storage';

function TestComponent() {
  /* You can safely destructure the return value of this hook,
  because TypeScript will provide you with great type hints */
  const {
    strState: { str, setStr, resetStr, containsStr },
    numState: { num, setNum, resetNum, containsNum },
    boolState: { bool, setBool, resetBool, containsBool },
    arrState: { arr, setArr, resetArr, containsArr },
  } = useStorage();

  useEffect(() => {
    setStr('string');
    resetStr(); // Reset the value of str
    containsStr(); // Whether the key exists in the module (Recommended)
  }, []);

  return <div>{str}</div>;
}

export default TestComponent;
```

## Other

### Install

```sh
npm install @smart-storage/hooks --save
```

### Create a storage module

Create a new file anywhere, and use like this:

```ts
// storage.ts
import { createSessionStorage } from '@smart-storage/hooks';

interface TestStorage {
  str?: string;
  num?: number;
  bool: boolean;
  arr: string[];
}

export const { useStorage } = createSessionStorage<TestStorage>({
  // This is storage key
  rootNodeKey: 'react_test_key',
  // Optional properties must be initialed
  initial: { bool: false, arr: [] },
});
```

### Use hooks in a script file

```ts
import { useStorage } from './storage';

const { str, num, bool, arr } = useStorage();
str.get();
str.set('string');
str.remove(); // Will delete the key and value from storage module
str.exist();
```

## Raw usage

### Install

```sh
npm install @smart-storage/core --save
```

### Usage

```ts
import { RootNode, StorageType } from '@smart-storage/core';

interface TestStorage {
  num: number;
  str: string;
}

const rootNode = new RootNode<TestStorage>('raw_usage', StorageType.SESSION);

rootNode.setItem('num', 1);
rootNode.getItem('num');
rootNode.removeItem('num');
rootNode.contains('num');
rootNode.clear();
rootNode.size();
```

## Next

Now, you can enjoy the type hints brought by TypeScript!
