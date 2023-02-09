export type IsOptional<T extends object, K extends keyof T> = {
  [K1 in Exclude<keyof T, K>]: T[K1];
} & { K?: T[K] } extends T
  ? K
  : never;

export type OptionalKeys<T extends object> = {
  [K in keyof T]-?: IsOptional<T, K>;
}[keyof T];

export type PickNonNullable<T extends object> = Omit<T, OptionalKeys<T>>;
