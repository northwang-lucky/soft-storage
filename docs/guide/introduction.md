# Introduction

The previous storage management was like this:

- ❌ Magic Strings Everywhere
- ❌ No unified storage module

Or like this:

- ❌ Need to maintain a constant storage key dictionary
- ❌ Frequent import and export

But now it's like this:

- ✅ Smart TypeScript type hints
- ✅ Uniformly maintained storage modules
- ✅ Can be directly associated with Vue's ref or React's state

## How It Works?

Smart Storage will read the storage objects created in the project and serialize them into strings using `JSON`. Then internally call the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) to create storage.

In addition, Smart Storage will use `Proxy` API to create Vue or React responsive variables to facilitate developers to modify storage values

::: warning

- **Proxy** and **Reflect** are used in the source code, so **IE series browsers are not supported**
- The minimum supported Vue version is **3.1.0** and React version is **16.8.0**

:::

## Demo Projects

Here are two demonstration projects (<BeautyLink href="/vue-demo/">Vue 3 Demo</BeautyLink> | <BeautyLink href="/react-demo/">React Demo</BeautyLink>) showing the basic usage of Smart Storage, you can take a look!
