---
extractApiHeaders: [2]
---

# React Hooks API

## createLocalStorage()

使用 `localStorage` 创建一个存储模块

### 类型

<CodeScroll>

```ts
function createLocalStorage<T>(options: CreateStorageOptions<T>): SoftStorage<T>;
```

</CodeScroll>

### 参数

- `options: CreateStorageOptions<T>`

  <CodeScroll>

  ```ts
  type CreateStorageOptions<T> = {
    /* 存储模块的key（必须是唯一的）*/
    storageModuleKey: string;
    /* 用于初始化存储模块（非空属性必须有默认值，可选属性不能有默认值） */
    initial: PickNonNullable<T>;
    /* 是否开启模块保护 */
    protect?: boolean;
    /* 存储模块的版本号 */
    version?: number;
    /* 存储模块的上一个版本号 */
    preVersion?: number;
  };
  ```

  </CodeScroll>

### 返回值

返回一个对象（[`SoftStorage`](type-definition/react-hooks.html#softstorage)），该对象包括[`useStorage`](#usestorage) 和 [`useStorageHelper`](#usestoragehelper)所必需的变量

### 示例

<CodeScroll>

```ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

</CodeScroll>

## createSessionStorage()

使用 `sessionStorage` 创建一个存储模块

### 类型

<CodeScroll>

```ts
function createSessionStorage<T>(options: CreateStorageOptions<T>): SoftStorage<T>;
```

</CodeScroll>

### 参数

与 [`createLocalStorage() > 参数`](#参数) 相同

### 返回值

与 [`createLocalStorage() > 返回值`](#返回值) 相同

### 示例

<CodeScroll>

```ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const storage = createSessionStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

</CodeScroll>

## useStorage()

从存储模块中获取 `states`、`setters`、`resetters` 和 `checkers`

### 类型

<CodeScroll>

```ts
function useStorage<T>(storage: SoftStorage<T>): StorageStates<T>;
```

</CodeScroll>

### 参数

- `storage: SoftStorage<T>`

  [`createLocalStorage`](#createlocalstorage)或者[`createSessionStorage`](#createsessionstorage)返回的对象

### 返回值

返回一个 `Record` 对象，它的 key 类型为 [`StateKey<T>`](type-definition/react-hooks.html#statekey)，值类型为 [`StorageState<T, K extends keyof T>`](type-definition/react-hooks.html#storagestate)

<CodeScroll>

```ts
type StorageStates<T> = {
  [SK in StateKey<T>]: RestoreSuffixedKey<SK, 'state'> extends keyof T
    ? StorageState<T, RestoreSuffixedKey<SK, 'state'>>
    : never;
};
```

</CodeScroll>

::: tip
这里的 [`RestoreSuffixedKey<SK, 'state'>`](type-definition/shared.html#restoresuffixedkey) 用来还原 `StateKey<T>`，例如，“tokenState” 会被还原成 “token”
:::

<hr>

[`StateKey<T>`](type-definition/react-hooks.html#statekey) 是一个字符串 (例如 “tokenState”):

<CodeScroll>

```ts
type StateKey<T> = SuffixedKeys<T, 'state'>;
```

</CodeScroll>

::: tip
这里的 [`SuffixedKeys<T, 'state'>`](type-definition/shared.html#suffixedkeys) 用来添加后缀，例如，“token” 会变成 “tokenState”
:::

<hr>

此外，`StorageState<T, K extends keyof T>` 是一个对象，包括：

- `xxx: T[K]`
- [`setXxx: Setter<T[K]>`](type-definition/react-hooks.html#setter)，`setXxx` 的类型是 [`SetterKey<K>`](type-definition/react-hooks.html#setterkey)
- [`resetXxx: Resetter`](type-definition/react-hooks.html#resetter)，`resetXxx` 的类型是 [`ResetterKey<K>`](type-definition/react-hooks.html#resetterkey)
- [`containsXxx: Checker`](type-definition/react-hooks.html#checker)，`containsXxx` 的类型是 [`CheckerKey<K>`](type-definition/react-hooks.html#checkerkey)

<CodeScroll>

```ts
type StorageState<T, K extends keyof T> = {
  [Key in K]: T[K];
} & {
  [Key in SetterKey<K>]: Setter<T[K]>;
} & {
  [Key in ResetterKey<K>]: Resetter;
} & {
  [Key in CheckerKey<K>]: Checker;
};
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
import { storage } from './storage';
const {
  tokenState: { token, setToken, resetToken, containsToken },
} = useStorage(storage);
```

</CodeScroll>

## useStorageHelper()

获取存储模块助手的实例

### 类型

<CodeScroll>

```ts
function useStorageHelper<T>(storage: SoftStorage<T>): StorageHelper;
```

</CodeScroll>

### 返回值

<CodeScroll>

```ts
type StorageHelper = {
  contains: (key: string) => boolean;
  size: () => number;
  initialize: () => void;
};
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
import { storage } from './storage';
const storageHelper = useStorageHelper(storage);
```

</CodeScroll>
