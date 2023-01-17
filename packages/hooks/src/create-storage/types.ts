export type StorageItem<T> = {
  get(): T;
  set(value: T): void;
  remove(): void;
  exist(): boolean;
};

export type StorageInstance<T> = {
  [K in keyof T]: StorageItem<T[K]>;
};

export type StorageActions = {
  size: () => number;
  contains: (key: string) => boolean;
  clear: () => void;
};

export type UseStorage<T> = () => {
  storage: StorageInstance<T>;
  storageActions: StorageActions;
};
