// Function to remove properties from an object
export function removeObjectProperties<T>(object: T, propertyKeys: (keyof T)[]): Partial<T> {
  const newObject = { ...object };
  propertyKeys.forEach((propertyKey) => {
    delete newObject[propertyKey];
  });
  return newObject;
}

export function isJSON<T>(obj: T) {
  try {
    JSON.parse(obj)
    return true;
  } catch (e) {
    return false;
  }
}