# 模块保护

## 让我们来看看这个案例

我们已经使用 `createLocalStorage` API 创建了一个 key 为“unprotected_storage_key”的存储模块：

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type UnprotectedStorage = {
  str: string;
  num?: number;
};

export const storage = createLocalStorage<UnprotectedStorage>({
  storageModuleKey: 'unprotected_storage_key',
  initial: { str: '' },
});
```

</CodeScroll>

我们可以在 chrome 的开发者工具中看到我们的存储模块：

![devtools-storage](~@imgs/guide/advanced/module-protect/origin-storage.jpg)

然后，有人写了这样的代码：

<CodeScroll>

```ts
window.localStorage.setItem('unprotected_storage_key', 'foo');
```

</CodeScroll>

然而，我们都知道，一旦执行了这行代码，存储模块的数据结构就会被破坏：

![foo-storage](~@imgs/guide/advanced/module-protect/foo-storage.jpg)

而一旦存储模块被破坏，Soft Storage 将无法正常工作！！！

## 如何解决？

为了防止存储模块的数据结构被破坏，Soft Storage 提供了一个配置项，用来防止存储 API 对存储模块的 key 进行原始调用：

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type ProtectedStorage = {
  str: string;
  num?: number;
};

export const storage = createLocalStorage<ProtectedStorage>({
  storageModuleKey: 'protected_storage_key',
  protect: true, // 只需要把它设为true
  initial: { str: '' },
});
```

</CodeScroll>

像这样打开模块保护之后，`setItem()`, `removeItem()` 和 `clear()` 这三个 API 将会被 `Proxy` 重写（假设我们正在使用 `localStorage`）：

- 当调用 `localStorage.setItem('protected_storage_key', 'foo')` 时，你会收到一个像这样的报错：

  ![set-item-error](~@imgs/guide/advanced/module-protect/set-item-error.png)

- 当调用 `localStorage.removeItem('protected_storage_key')` 时，你会收到一个像这样的报错：

  ![remove-item-error](~@imgs/guide/advanced/module-protect/remove-item-error.png)

- 当调用 `localStorage.clear()` 时，**“protected_storage_key” 和其关联的 value 将会被保留**，其余的将会被删除。

::: tip
`setItem()`, `removeItem()` 只有在你试图修改与“属于受保护模块的 key”关联的 value 之时，才会被阻断（比如上面的“protected_storage_key”），在其他情况下仍会正常工作。
:::
