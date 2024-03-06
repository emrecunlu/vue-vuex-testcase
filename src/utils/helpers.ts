export enum STORAGE_KEYS {
  token = "token",
  userInformation = "user",
}

export function setLocalStorage<T>(key: STORAGE_KEYS, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage<T>(key: STORAGE_KEYS): T | null {
  const storage = localStorage.getItem(key);

  return typeof storage === "string" ? (JSON.parse(storage) as T) : null;
}

export function removeLocalStorage(key: STORAGE_KEYS): void {
  localStorage.removeItem(key);
}
