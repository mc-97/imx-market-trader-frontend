export const checkEnumValue = <T extends { [name: string]: any }>(
  enumT: T,
  value: any
): boolean => {
  return Object.values(enumT).includes(value);
};
