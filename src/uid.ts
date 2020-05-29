/**
 * generates a UID factory
 * @internal
 * @example
 * const uid = generateUID();
 * uid(object) = 1;
 * uid(object) = 1;
 * uid(anotherObject) = 2;
 */
export const generateUID = () => {
  let counter = 1;

  const map = new WeakMap<any, number>();

  /**
   * @borrows {uid}
   */
  const uid = (item: any, index?: number): string => {
    if (
      typeof item === 'number' ||
      typeof item === 'string'
    ) {
      return index ? `idx-${index}` : `val-${item}`;
    }

    if (!map.has(item)) {
      map.set(item, counter++);
      return uid(item)
    }
    return 'uid' + map.get(item);
  };

  return uid;
}

/**
 * @name uid
 * returns an UID associated with {item}
 * @param {Object} item - object to generate UID for
 * @param {Number} index, a fallback index
 * @example
 * uid(object) == 1;
 * uid(object) == 1;
 * uid(anotherObject) == 2;
 * uid("not object", 42) == 42
 *
 * @see {@link useUID}
 */
export const uid = generateUID();