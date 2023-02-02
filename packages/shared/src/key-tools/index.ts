export function restorePrefixedKey(prefixedKey: string, prefix: string, uncapitalize = true): string {
  const reg = RegExp(`^${prefix}([a-zA-Z]+)$`);
  return prefixedKey.replace(reg, (_, first) => {
    const str = first as string;
    return uncapitalize ? str.replace(/^[A-Z]/, c => c.toLowerCase()) : str;
  });
}

export function restoreSuffixedKey(suffixedKey: string, _suffix: string, autoCapitalizeSuffix = true): string {
  const suffix: string = autoCapitalizeSuffix ? _suffix.replace(/^[a-z]/, c => c.toUpperCase()) : _suffix;
  const reg = RegExp(`^([a-zA-Z]+)${suffix}$`);
  return suffixedKey.replace(reg, (_, first) => first);
}
