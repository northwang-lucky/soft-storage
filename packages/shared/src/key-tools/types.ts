export type PrefixedKey<T, Prefix extends string> = T extends string ? `${Prefix}${Capitalize<T>}` : never;
export type SuffixedKey<T, Suffix extends string> = T extends string ? `${T}${Capitalize<Suffix>}` : never;

export type RestorePrefixedKey<T, Prefix extends string> = T extends `${Prefix}${infer U}` ? Uncapitalize<U> : never;
export type RestoreSuffixedKey<T, Suffix extends string> = T extends `${infer U}${Capitalize<Suffix>}` ? U : never;

export type PrefixedKeys<T, Prefix extends string> = PrefixedKey<keyof T, Prefix>;
export type SuffixedKeys<T, Suffix extends string> = SuffixedKey<keyof T, Suffix>;
