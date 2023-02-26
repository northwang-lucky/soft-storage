---
extractApiHeaders: [2]
---

# Hooks API

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

返回一个对象（[`SoftStorage`](type-definition/hooks.html#softstorage)），该对象包括[`useStorage`](#usestorage) 和 [`useStorageHelper`](#usestoragehelper)所必需的变量

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

从存储模块中获取 `storageInstance`

### 类型

<CodeScroll>

```ts
function useStorage<T>(storage: SoftStorage<T>): StorageInstance<T>;
```

</CodeScroll>

### 参数

- `storage: SoftStorage<T>`

  [`createLocalStorage`](#createlocalstorage)或者[`createSessionStorage`](#createsessionstorage)返回的对象

### 返回值

返回一个对象，包括模块中的所有存储项（类型为 [`StorageItem<T[K]>`](type-definition/hooks.html#storageitem)）

<CodeScroll>

```ts
type StorageInstance<T> = Required<{
  [K in keyof T]: StorageItem<T[K]>;
}>;
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
import { storage } from './storage';
const { token } = useStorage(storage);
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

### 参数

- `storage: SoftStorage<T>`

  [`createLocalStorage`](#createlocalstorage)或者[`createSessionStorage`](#createsessionstorage)返回的对象

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
