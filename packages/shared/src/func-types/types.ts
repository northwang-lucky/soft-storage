export type Function<T, R> = (arg: T) => R;

export type BiFunction<T extends Array<unknown>, R> = (...arg: T) => R;

export type Supplier<R> = () => R;

export type Runnable = () => void;

export type Consumer<T> = (arg: T) => void;

export type BiConsumer<T extends Array<unknown>> = (...arg: T) => void;
