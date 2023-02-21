import {
  Checker,
  CheckerKey,
  PrefixedKey,
  Resetter,
  ResetterKey,
  RestoreSuffixedKey,
  StorageModuleSchema,
  SuffixedKeys,
} from '@smart-storage/shared';
import { Setter } from '../create-storage/types';

export type SetterKey<T> = PrefixedKey<T, 'set'>;

export type StorageState<T extends StorageModuleSchema, K extends keyof T> = {
  [Key in K]: T[K];
} & {
  [Key in SetterKey<K>]: Setter<T[K]>;
} & {
  [Key in ResetterKey<K>]: Resetter;
} & {
  [Key in CheckerKey<K>]: Checker;
};

export type StateKey<T extends StorageModuleSchema> = SuffixedKeys<T, 'state'>;

export type StorageStates<T extends StorageModuleSchema> = {
  [SK in StateKey<T>]: RestoreSuffixedKey<SK, 'state'> extends keyof T
    ? StorageState<T, RestoreSuffixedKey<SK, 'state'>>
    : never;
};
