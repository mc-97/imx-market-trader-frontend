export const getEnumKeys = <T extends { [name: string]: any }>(
  enumToDeconstruct: T
): Array<keyof typeof enumToDeconstruct> => {
  return Object.keys(enumToDeconstruct) as Array<keyof typeof enumToDeconstruct>;
};
