// Function to remove properties from an object
export function removeObjectProperties<T>(object: T, propertyKeys: (keyof T)[]): Partial<T> {
  const newObject = { ...object };
  propertyKeys.forEach((propertyKey) => {
    delete newObject[propertyKey];
  });
  return newObject;
}