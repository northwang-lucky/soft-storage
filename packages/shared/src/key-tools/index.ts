export function restorePrefixedString(target: string, prefix: string, uncapitalize = true): string {
  const reg = RegExp(`^${prefix}([a-zA-Z]+)$`);
  return target.replace(reg, (_, first) => {
    const str = first as string;
    return uncapitalize ? str.replace(/^[A-Z]/, c => c.toLowerCase()) : str;
  });
}

export function restoreSuffixedString(target: string, suffix: string, autoCapitalizeSuffix = true): string {
  const _suffix: string = autoCapitalizeSuffix ? suffix.replace(/^[a-z]/, c => c.toUpperCase()) : suffix;
  const reg = RegExp(`^([a-zA-Z]+)${_suffix}$`);
  return target.replace(reg, (_, first) => first);
}
