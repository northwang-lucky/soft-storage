# 介绍

在以前，存储管理是这样的:

- ❌ 无处不在的魔法字符串
- ❌ 没有统一的存储模块

或是这样:

- ❌ 需要维护一个存储键字典
- ❌ 频繁的导入导出

但是现在可以是这样:

- ✅ 智能的 TypeScript 类型提示
- ✅ 统一维护的存储模块
- ✅ 可以直接关联 `Vue` 的 ref 或 `React` 的 state

## 工作原理

Smart Storage 将读取项目中创建的存储对象，并使用 JSON 将它们序列化为字符串。然后在内部调用浏览器的 WebStorage API 来创建存储。

此外，Smart Storage 会使用 `Proxy` API 创建 Vue 或 React 响应式变量，方便开发者修改存储值。

::: warning

- 源码中使用了 **Proxy** 和 **Reflect**，不支持 IE 系列浏览器
- 最低支持的 Vue 版本是 **3.1.0**，React 版本是 **16.8.0**

:::

## 演示项目

这里有两个演示项目([Vue 3 演示](https://northwang-lucky.github.io/smart-storage/vue-demo) | [React 演示](https://northwang-lucky.github.io/smart-storage/react-demo)) 展示了 Smart Storage 的基本用法，你可以去看看！
