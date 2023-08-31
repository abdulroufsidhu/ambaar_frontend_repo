export class SessionStorageManager {
  static setItem = <T>(
    key: "user" | "permissions",
    value: T
  ) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }


  static getItem = <T>(key: "user" | "permissions"): T | undefined => {
    const obj = sessionStorage.getItem(key)
    if (!obj) {
      return undefined;
    }
    return JSON.parse(obj) as T
  }

  static removeItem = (...keys: ("user" | "permissions")[]) => keys.forEach(key => sessionStorage.removeItem(key))

}