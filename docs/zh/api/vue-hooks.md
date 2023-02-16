---
extractApiHeaders: [2]
---

# Vue Hooks API

## createLocalStorage()

使用 `localStorage` 创建一个存储模块

### 类型

```ts
function createLocalStorage<T>(options: CreateStorageOptions<T>): CreateStorage<T>;
```

### 参数

- `options: CreateStorageOptions<T>`

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

### 返回值

返回一个包含两个钩子函数（[`useStorage`](#usestorage) 和 [`useStorageHelper`](#usestoragehelper)）的对象

```ts
type CreateStorage<T> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};
```

### 示例

```ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createLocalStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## createSessionStorage()

使用 `sessionStorage` 创建一个存储模块

### 类型

```ts
function createSessionStorage<T>(options: CreateStorageOptions<T>): CreateStorage<T>;
```

### 参数

与 [`createLocalStorage() > 参数`](#参数) 相同

### 返回值

与 [`createLocalStorage() > 返回值`](#返回值) 相同

### 示例

```ts
type UserInfo = {
  token?: string;
  hasSigned: boolean;
};

export const { useStorage } = createSessionStorage<UserInfo>({
  storageModuleKey: 'user_info',
  initial: { hasSigned: false },
});
```

## useStorage()

从存储模块中获取 `refs`、`resetters` 和 `checkers`

### 类型

```ts
type UseStorage<T> = () => StorageReactions<T>;
```

### 返回值

返回一个对象，包括：

- [`refs: StorageRefs<T>`](type-definition/vue-hooks.html#storagerefs)
- [`resetters: StorageResetters<T>`](type-definition/vue-hooks.html#storageresetters)
- [`checkers: StorageCheckers<T>`](type-definition/vue-hooks.html#storagecheckers)

```ts
type StorageReactions<T> = {
  refs: StorageRefs<T>;
  resetters: StorageResetters<T>;
  checkers: StorageCheckers<T>;
};
```

### 示例

```ts
const {
  refs: { token },
  resetters: { resetToken },
  checkers: { containsToken },
} = useStorage();
```

## useStorageHelper()

获取存储模块助手的实例

### 类型

```ts
type UseStorageHelper = () => StorageHelper;
```

### 返回值

```ts
type StorageHelper = {
  contains: (key: string) => boolean;
  size: () => number;
  initialize: () => void;
};
```

### 示例

```ts
const storageHelper = useStorageHelper();
```
