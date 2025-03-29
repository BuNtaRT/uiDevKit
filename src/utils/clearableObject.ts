export function clearableObject<T extends object>(obj: T): Partial<T> | undefined {
  const filteredObj: Partial<T> = {};

  for (const key in obj) {
    const value = obj[key];
    if (value !== null && value !== undefined) {
      filteredObj[key] = value;
    }
  }

  return Object.keys(filteredObj).length ? filteredObj : undefined;
}
