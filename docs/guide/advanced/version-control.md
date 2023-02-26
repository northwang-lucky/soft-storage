# Version Control

## When Is It Used?

Suppose we have used the `createLocalStorage` API to create a storage module whose key content is "always_change_storage":

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

And the storage module is already running in the production environment:

![always-change-storage-v1](~@imgs/guide/advanced/version-control/always-change-storage-v1.png)

One day, you get a requirement that requires you to change the name of the field in the storage module in order to implement the requirement. However, since the storage module is already running in a production environment, if you change the field name, the new and old versions will be incompatible.

**In this case, a feature that controls the storage version is necessary!!**

## How to Use?

> First, suppose we are using `localStorage`.

In fact, version control of storage modules is enabled by default. The `options` parameter in `createLocalStorage` has an optional parameter called `version`, whose default value is 1.

**That is, when you create a storage module, its default version number is 1.**

So, you only need to upgrade version by **only one version number**, and you can safely change the initial of the storage module (the exact method of cross-version upgrading is detailed in the next section).

::: warning
But at the same time, **the key of the storage module will change to something like "always_change_storage_v2"**, where "2" is the value of version. And **the key of the previous version and its value will be deleted**.
:::

For example:

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type AlwaysChangeStorage = {
  bar: string;
};

export const storage = createLocalStorage<AlwaysChangeStorage>({
  storageModuleKey: 'always_change_storage',
  version: 2, // It defaults to 1 when not passed in, and now we can upgrade it to 2
  initial: { bar: "I don't know." }, // Now you can safely modify the values here
});
```

</CodeScroll>

And the storage will become like this:

![always-change-storage-v2](~@imgs/guide/advanced/version-control/always-change-storage-v2.png)

## Cross Version Upgrade

In the example in the previous section, we upgraded the version of the storage module from 1 to 2. So, can we go straight from 1 to 3? The answer is yes, you just need to pass one more configuration item:

<CodeScroll>

```ts
// storage.ts
import { createLocalStorage } from '@soft-storage/vue-hooks';

type AlwaysChangeStorage = {
  bar: string;
};

export const storage = createLocalStorage<AlwaysChangeStorage>({
  storageModuleKey: 'always_change_storage',
  version: 3, // It defaults to 1 when not passed in, and now we can upgrade it to 3
  preVersion: 1, // For cross-version upgrade, this configuration item is required, it represents the version number before the upgrade
  initial: { bar: "I don't know." }, // Now you can safely modify the values here
});
```

</CodeScroll>
