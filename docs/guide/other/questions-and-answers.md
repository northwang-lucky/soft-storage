# Q&A

## About Interface

- Q: Why can't I use `interface` to define TypeScript types?

- A: Because the key of the type defined by `interface` does not have a `string` type signature. But Smart Storage sets type constraints like `Record<string, unknown>` for the incoming generics. So, use `type` to instead of it.

## About Remove and Clear

- Q: Why isn't `remove()` and `clear()` provided?

- A: There are two reasons:

  - **Correlation of component states**

    In the framework, properties in the storage module are associated with states in the component one by one. If `remove()` and `clear()` are called to delete key-value pairs from the storage module, states cannot sense that the storage module has been modified. As a result, non-nullable properties in the storage module and corresponding states in the component are out of sync, resulting in unexpected errors.

  - **Non-nullable definition of properties**

    Semantically, `remove()` and `clear()` are used to delete key-value pairs in the storage module, including non-nullable properties. In this way, these non-nullable properties violate their definition of "non-nullable."
