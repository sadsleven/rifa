/**
 * Function to parse an input value and convert it to a specific type.
 * @param {any} value - The value to be parsed.
 * @returns {T} The parsed value converted to the type specified by T.
 * @template T
 * @type {number | string | boolean | [] | object | Date}
 */
export const parse = <T extends number | string | boolean | [] | object | Date>(value: any): T => {
  try {
    value = JSON.parse(value);
  } catch (e) {}

  if (typeof value === 'string') {
    if (!isNaN(+value)) {
      return +value as T;
    }

    const date = Date.parse(value);
    if (!isNaN(date)) {
      return new Date(date) as T;
    }
  }

  return value;
};

function counter() {
  let value = 0;

  return function () {
    value++;
    return value;
  };
}
