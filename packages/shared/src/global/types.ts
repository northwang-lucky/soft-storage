import { PrefixedKey } from '../key-tools/types';
import { PickNonNullable } from '../type-tools/types';

export type StorageModuleSchema = Record<string, unknown>;

export type Initial<T extends object> = PickNonNullable<T> extends T ? PickNonNullable<T> : never;

export type ResetterKey<T> = PrefixedKey<T, 'reset'>;
export type CheckerKey<T> = PrefixedKey<T, 'contains'>;

export type Resetter = () => void;
export type Checker = () => boolean;
