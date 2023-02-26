# 版本控制

## 何时使用？

假设我们已经使用 `createLocalStorage` API 创建了一个 key 为 “always_change_storage”的存储模块:

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type AlwaysChangeStorage = {
  foo: string;
};

export const storage = createLocalStorage<AlwaysChangeStorage>({
  storageModuleKey: 'always_change_storage',
  initial: { foo: 'Why is it always change?' },
});
```

</CodeScroll>

并且，该存储模块已经在生产环境中运行：

![always-change-storage-v1](~@imgs/guide/advanced/version-control/always-change-storage-v1.png)

有一天，您遇到了一个需求，为了实现该需求，您不得不更改存储模块中字段的名称。但是，由于该存储模块已经在生产环境中运行，如果强行更改字段名，新版本和旧版本将会出现不兼容的问题。

**在这种情况下，一个能够控制存储模块版本的功能是非常必要的！！**

## 怎么用？

> 首先，假设我们正在使用 `localStorage`。

事实上，存储模块的版本控制功能默认是开启的。`createLocalStorage` 中的 `options` 参数有一个叫做 `version` 的可选属性，其默认值为 `1`。

所以，你只需要升级**仅一个版本号**，就可以安全地修改存储模块的默认值了（跨版本升级的具体方法在下一节将详细介绍）。

::: warning
但与此同时，**存储模块的 key 会变成类似“always_change_storage_v2”的格式**，这里的“2”是 `version` 的值。并且 **上一个版本号对应的 key 及 value 将会被删除**。
:::

举个栗子：

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type AlwaysChangeStorage = {
  bar: string;
};

export const storage = createLocalStorage<AlwaysChangeStorage>({
  storageModuleKey: 'always_change_storage',
  version: 2, // 它在未传入时默认为1，现在我们可以将它升级为2
  initial: { bar: "I don't know." }, // 现在您可以安全地修改这里的值了
});
```

</CodeScroll>

现在存储模块是这样的：

![always-change-storage-v2](~@imgs/guide/advanced/version-control/always-change-storage-v2.png)

## 跨版本升级

在上一节的示例中，我们将存储模块的版本从 1 升级到 2。那么，我们能直接从 1 升级到 3 吗？答案是可以，只需要再传递一个配置项即可:

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type AlwaysChangeStorage = {
  bar: string;
};

export const storage = createLocalStorage<AlwaysChangeStorage>({
  storageModuleKey: 'always_change_storage',
  version: 3, // 它在未传入时默认为1，现在我们可以将它升级为3
  preVersion: 1, // 跨版本升级时，该配置项为必选项，表示升级前的版本号
  initial: { bar: "I don't know." }, // 现在您可以安全地修改这里的值了
});
```

</CodeScroll>
