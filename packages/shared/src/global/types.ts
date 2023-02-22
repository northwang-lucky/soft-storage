import { PrefixedKey } from '../key-tools/types';

export type StorageModuleSchema = Record<string, unknown>;

export type ResetterKey<T> = PrefixedKey<T, 'reset'>;
export type CheckerKey<T> = PrefixedKey<T, 'contains'>;

export type Resetter = () => void;
export type Checker = () => boolean;
