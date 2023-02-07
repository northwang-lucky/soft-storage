import { Dispatch, SetStateAction } from 'react';
import { StorageHelper } from '@smart-storage/hooks';
import {
  Checker,
  CheckerKey,
  PrefixedKey,
  Resetter,
  ResetterKey,
  RestoreSuffixedKey,
  SuffixedKeys,
} from '@smart-storage/shared';

export type Setter<T> = Dispatch<SetStateAction<T>>;
export type SetterKey<T> = PrefixedKey<T, 'set'>;

export type StorageState<T, K extends keyof T> = {
  [Key in K]: T[K];
} & {
  [Key in SetterKey<K>]: Setter<T[K]>;
} & {
  [Key in ResetterKey<K>]: Resetter;
} & {
  [Key in CheckerKey<K>]: Checker;
};

export type StateKey<T> = SuffixedKeys<T, 'state'>;
export type StorageStates<T> = {
  [SK in StateKey<T>]: RestoreSuffixedKey<SK, 'state'> extends keyof T
    ? StorageState<T, RestoreSuffixedKey<SK, 'state'>>
    : never;
};

export type UseState<T> = [T, Setter<T>];

export type UseStorage<T> = () => StorageStates<T>;

export type StorageSafeHelper = Omit<StorageHelper, 'clear'>;
export type UseStorageHelper = () => StorageSafeHelper;

export type CreateStorage<T> = {
  useStorage: UseStorage<T>;
  useStorageHelper: UseStorageHelper;
};
