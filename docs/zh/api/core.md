---
extractApiHeaders: [2]
---

# Core API

## StorageModule()

创建一个存储模块

### 类型

<CodeScroll>

```ts
new StorageModule<T>(key: string, storageType: StorageType, noUniqueVerify?: boolean): StorageModule<T>;
```

</CodeScroll>

### 参数

- `key: string`

  存储模块的 key

- `storageType: StorageType`

  <CodeScroll>

  ```ts
  enum StorageType {
    LOCAL = 'local',
    SESSION = 'session',
  }
  ```

  </CodeScroll>

- `noUniqueVerify?: boolean = false`

  当值为 `true` 时，`StorageModule` 不会校验 key 的唯一性

### 返回值

A new `StorageModule` instance.

### 示例

<CodeScroll>

```ts
const storageModule = new StorageModule('user_info', StorageType.LOCAL);
```

</CodeScroll>

## storageModule.getItem()

从存储模块获取存储项的值

### 类型

<CodeScroll>

```ts
StorageModule<T>.getItem<K extends keyof T>(key: K): T[K] | undefined;
```

</CodeScroll>

### 参数

- `key: K`

  存储模块的 key

### 返回值

存储项的值

### 示例

<CodeScroll>

```ts
const token = storageModule.getItem('token');
```

</CodeScroll>

## storageModule.setItem()

在存储模块中设置存储项的值

### 类型

<CodeScroll>

```ts
StorageModule<T>.setItem<K extends keyof T>(key: K, value: T[K]): void;
```

</CodeScroll>

### 参数

- `key: K`

  存储模块的 key

- `value: T[K]`

  要设置的值

### 示例

<CodeScroll>

```ts
storageModule.setItem('token', 'xxx');
```

</CodeScroll>

## storageModule.removeItem()

从存储模块中删除 key 及其值

### 类型

<CodeScroll>

```ts
StorageModule<T>.removeItem<K extends keyof T>(key: K): void;
```

</CodeScroll>

### 参数

- `key: K`

  存储模块的 key

### 示例

<CodeScroll>

```ts
storageModule.removeItem('token');
```

</CodeScroll>

## storageModule.clear()

从存储模块中删除所有 key 及其值

### 类型

<CodeScroll>

```ts
StorageModule<T>.clear(): void;
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
storageModule.clear();
```

</CodeScroll>

## storageModule.contains()

获取存储模块中是否存在该 key

### 类型

<CodeScroll>

```ts
StorageModule<T>.contains(key: string): boolean
```

</CodeScroll>

### 参数

- `key: K`

  存储模块的 key

### 返回值

存储模块中是否存在该 key

### 示例

<CodeScroll>

```ts
storageModule.contains('token');
```

</CodeScroll>

## storageModule.size()

获取存储模块中的存储项的数量

### 类型

<CodeScroll>

```ts
StorageModule<T>.size(): number;
```

</CodeScroll>

### 返回值

存储模块中的存储项的数量

### 示例

<CodeScroll>

```ts
const size = storageModule.size();
```

</CodeScroll>

## storageModule.getHelper()

获取存储模块的 `IStorageModuleHelper` 实例

### 类型

<CodeScroll>

```ts
StorageModule<T>.getHelper(): IStorageModuleHelper<T>;
```

</CodeScroll>

### 返回值

存储模块的 `IStorageModuleHelper` 实例

<CodeScroll>

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

</CodeScroll>

### 示例

<CodeScroll>

```ts
const helper = storageModule.getHelper();
```

</CodeScroll>

## helper.getModule()

以 JSON 对象的格式获取存储模块的值

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.getModule(): T;
```

</CodeScroll>

### 返回值

存储模块中的所有键值对

### 示例

<CodeScroll>

```ts
const valueDict = helper.getModule();
```

</CodeScroll>

## helper.setModule()

设置一个 JSON 对象作为存储模块的值 <Badge text="覆盖式更新" type="warning" />

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.setModule(root: T): void;
```

</CodeScroll>

### 参数

- `root: T`

  一个 JSON 对象，它将会成为存储模块的值

### 示例

<CodeScroll>

```ts
helper.setModule({ token: 'xxx', hasSigned: true });
```

</CodeScroll>

## helper.clearModule()

清空存储模块

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.clearModule(): void;
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
helper.clearModule();
```

</CodeScroll>

## helper.getStorageKey()

获取存储模块的 key

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.getStorageKey(): string;
```

</CodeScroll>

### 返回值

存储模块的 key

### 示例

<CodeScroll>

```ts
const storageModuleKey = helper.getStorageKey();
```

</CodeScroll>

## helper.getStorageType()

获取存储模块的类型

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.getStorageType(): StorageType;
```

</CodeScroll>

### 返回值

<CodeScroll>

```ts
enum StorageType {
  LOCAL = 'local',
  SESSION = 'session',
}
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
const storageType = helper.getStorageType();
```

</CodeScroll>

## helper.getExistence()

判断存储模块是否存在

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.getExistence(): boolean;
```

</CodeScroll>

### 返回值

存储模块是否存在

### 示例

<CodeScroll>

```ts
const exist = helper.getExistence();
```

</CodeScroll>

## helper.protect()

开启[模块保护](/zh/guide/advanced/module-protect.html)

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.protect(): void;
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
helper.protect();
```

</CodeScroll>

## helper.cancelProtect()

关闭[模块保护](/zh/guide/advanced/module-protect.html)

### 类型

<CodeScroll>

```ts
IStorageModuleHelper<T>.cancelProtect(): void;
```

</CodeScroll>

### 示例

<CodeScroll>

```ts
helper.cancelProtect();
```

</CodeScroll>
