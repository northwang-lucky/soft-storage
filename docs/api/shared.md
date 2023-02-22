---
extractApiHeaders: [2]
---

# Shared API

## createProxy()

Create a `Proxy` instance.

### Type

<CodeScroll>

```ts
function createProxy<T extends object = object, R = T>(target: T, handler: ProxyHandler<T>): R;
```

</CodeScroll>

### Parameters

- `target: T`

  The target object to be brokered.

- `handler: ProxyHandler<T>`

  Same as handler for `Proxy` 👉🏻 [Handler Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy#handler_functions)

### Return Value

Proxy-wrapped object.

### Example

<CodeScroll>

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

</CodeScroll>

## restorePrefixedString()

Restore a prefixed string.

### Type

<CodeScroll>

```ts
function restorePrefixedString(target: string, prefix: string, uncapitalize?: boolean): string;
```

</CodeScroll>

### Parameters

- `target: string`

  Prefixed string.

- `prefix: string`

  Prefix string.

- `uncapitalize?: boolean = true`

  Whether to automatically change the first letter of the restored string to lower case.

### Return Value

Restored string.

### Example

<CodeScroll>

```ts
const prefixed = 'setToken';
const key = restorePrefixedString(prefixed, 'set'); // key = 'token'
```

</CodeScroll>

## restoreSuffixedString()

Restore a suffixed string.

### Type

<CodeScroll>

```ts
function restoreSuffixedString(target: string, suffix: string, autoCapitalizeSuffix?: boolean): string;
```

</CodeScroll>

### Parameters

- `target: string`

  Suffixed string.

- `suffix: string`

  Suffix string.

- `autoCapitalizeSuffix?: boolean = true`

  Whether to automatically capitalize the first letter of the `suffix`.

### Return Value

Restored string.

### Example

<CodeScroll>

```ts
const suffixed = 'tokenState';
const key = restoreSuffixedString(suffixed, 'state'); // key = 'token'
```

</CodeScroll>
