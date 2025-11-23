
export const removeNonNumericCharacters = (value: string): string =>
{
  return value.replace(/\D/g, '');
};
