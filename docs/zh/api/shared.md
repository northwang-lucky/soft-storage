---
extractApiHeaders: [2]
---

# Shared API

## createProxy()

创建一个 `Proxy` 实例

### 类型

```ts
function createProxy<T extends object = object, R = T>(target: T, handler: ProxyHandler<T>): R;
```

### 参数

- `target: T`

  被代理的对象

- `handler: ProxyHandler<T>`

  与 `Proxy` 的 `handler` 相同 👉🏻 [Handler Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions)

### 返回值

代理包装过的对象

### 示例

```ts
type Greeter = {
  hello(): void;
};

const proxy = createProxy<object, Greeter>(
  {},
  {
    get(_, property) {
      if (property === 'hello') {
        return () => void console.log('hello');
      }
      return undefined;
    },
  }
);

proxy.hello(); // Output: hello
```

## restorePrefixedString()

还原一个加了前缀的字符串

### Type

```ts
function restorePrefixedString(target: string, prefix: string, uncapitalize?: boolean): string;
```

### Parameters

- `target: string`

  加了前缀的字符串

- `prefix: string`

  前缀

- `uncapitalize?: boolean = true`

  是否自动将还原后的字符串的首字母改为小写

### Return Value

还原后的字符串

### Example

```ts
const prefixed = 'setToken';
const key = restorePrefixedString(prefixed, 'set'); // key = 'token'
```

## restoreSuffixedString()

还原一个加了后缀的字符串

### Type

```ts
function restoreSuffixedString(target: string, suffix: string, autoCapitalizeSuffix?: boolean): string;
```

### Parameters

- `target: string`

  加了后缀的字符串

- `suffix: string`

  后缀

- `autoCapitalizeSuffix?: boolean = true`

  是否自动将 `suffix` 的第一个字母大写

### Return Value

还原后的字符串

### Example

```ts
const suffixed = 'tokenState';
const key = restoreSuffixedString(suffixed, 'state'); // key = 'token'
```
