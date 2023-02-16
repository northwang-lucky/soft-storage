---
extractApiHeaders: [2]
---

# Core API

## StorageModule()

创建一个存储模块

### 类型

```ts
new StorageModule<T>(key: string, storageType: StorageType, noUniqueVerify?: boolean): StorageModule<T>;
```

### 参数

- `key: string`

  存储模块的 key

- `storageType: StorageType`

  ```ts
  enum StorageType {
    LOCAL = 'local',
    SESSION = 'session',
  }
  ```

- `noUniqueVerify?: boolean = false`

  当值为 `true` 时，`StorageModule` 不会校验 key 的唯一性

### 返回值

A new `StorageModule` instance.

### 示例

```ts
const storageModule = new StorageModule('user_info', StorageType.LOCAL);
```

## storageModule.getItem()

从存储模块获取存储项的值

### 类型

```ts
StorageModule<T>.getItem<K extends keyof T>(key: K): T[K] | undefined;
```

### 参数

- `key: K`

  存储模块的 key

### 返回值

存储项的值

### 示例

```ts
const token = storageModule.getItem('token');
```

## storageModule.setItem()

在存储模块中设置存储项的值

### 类型

```ts
StorageModule<T>.setItem<K extends keyof T>(key: K, value: T[K]): void;
```

### 参数

- `key: K`

  存储模块的 key

- `value: T[K]`

  要设置的值

### 示例

```ts
storageModule.setItem('token', 'xxx');
```

## storageModule.removeItem()

从存储模块中删除 key 及其值

### 类型

```ts
StorageModule<T>.removeItem<K extends keyof T>(key: K): void;
```

### 参数

- `key: K`

  存储模块的 key

### 示例

```ts
storageModule.removeItem('token');
```

## storageModule.clear()

从存储模块中删除所有 key 及其值

### 类型

```ts
StorageModule<T>.clear(): void;
```

### 示例

```ts
storageModule.clear();
```

## storageModule.contains()

获取存储模块中是否存在该 key

### 类型

```ts
StorageModule<T>.contains(key: string): boolean
```

### 参数

- `key: K`

  存储模块的 key

### 返回值

存储模块中是否存在该 key

### 示例

```ts
storageModule.contains('token');
```

## storageModule.size()

获取存储模块中的存储项的数量

### 类型

```ts
StorageModule<T>.size(): number;
```

### 返回值

存储模块中的存储项的数量

### 示例

```ts
const size = storageModule.size();
```

## storageModule.getHelper()

获取存储模块的 `IStorageModuleHelper` 实例

### 类型

```ts
StorageModule<T>.getHelper(): IStorageModuleHelper<T>;
```

### 返回值

存储模块的 `IStorageModuleHelper` 实例

```ts
interface IStorageModuleHelper<T> {
  getModule(): T;
  setModule(root: T): void;
  clearModule(): void;
  getStorageKey(): string;
  getStorageType(): StorageType;
  getExistence(): boolean;
  protect(): void;
  cancelProtect(): void;
}
```

### 示例

```ts
const helper = storageModule.getHelper();
```

## helper.getModule()

以 JSON 对象的格式获取存储模块的值

### 类型

```ts
IStorageModuleHelper<T>.getModule(): T;
```

### 返回值

存储模块中的所有键值对

### 示例

```ts
const valueDict = helper.getModule();
```

## helper.setModule()

设置一个 JSON 对象作为存储模块的值 <Badge text="覆盖式更新" type="warning" />

### 类型

```ts
IStorageModuleHelper<T>.setModule(root: T): void;
```

### 参数

- `root: T`

  一个 JSON 对象，它将会成为存储模块的值

### 示例

```ts
helper.setModule({ token: 'xxx', hasSigned: true });
```

## helper.clearModule()

清空存储模块

### 类型

```ts
IStorageModuleHelper<T>.clearModule(): void;
```

### 示例

```ts
helper.clearModule();
```

## helper.getStorageKey()

获取存储模块的 key

### 类型

```ts
IStorageModuleHelper<T>.getStorageKey(): string;
```

### 返回值

存储模块的 key

### 示例

```ts
const storageModuleKey = helper.getStorageKey();
```

## helper.getStorageType()

获取存储模块的类型

### 类型

```ts
IStorageModuleHelper<T>.getStorageType(): StorageType;
```

### 返回值

```ts
enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
}
```

### 示例

```ts
const storageType = helper.getStorageType();
```

## helper.getExistence()

判断存储模块是否存在

### 类型

```ts
IStorageModuleHelper<T>.getExistence(): boolean;
```

### 返回值

存储模块是否存在

### 示例

```ts
const exist = helper.getExistence();
```

## helper.protect()

开启[模块保护](/zh/guide/advanced/module-protect.html)

### 类型

```ts
IStorageModuleHelper<T>.protect(): void;
```

### 示例

```ts
helper.protect();
```

## helper.cancelProtect()

关闭[模块保护](/zh/guide/advanced/module-protect.html)

### 类型

```ts
IStorageModuleHelper<T>.cancelProtect(): void;
```

### 示例

```ts
helper.cancelProtect();
```
