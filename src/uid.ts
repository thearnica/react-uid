export const generateUID = () => {
  let counter = 1;

  const map = new Map<any, number>();

  const uid = (item: any): string => {
    if (
      typeof item === 'number' ||
      typeof item === 'string'
    ) {
      return 'not-uid' + String(item);
    }

    if (!map.has(item)) {
      map.set(item, counter++)
      return uid(item)
    }
    return 'uid' + map.get(item);
  };

  return uid;
}