export const generateUID = () => {
  let counter = 1;

  const map = new WeakMap<any, number>();

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

export const generatedUID = generateUID();