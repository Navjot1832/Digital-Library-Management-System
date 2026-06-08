export const storageKeys = {
  currentUser: 'dlms.currentUser',
  users: 'dlms.users',
  books: 'dlms.books',
  transactions: 'dlms.transactions',
};

export function readStorage(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch (error) {
    console.error(`Failed to read localStorage key "${key}"`, error);
    return fallbackValue;
  }
}

export function writeStorage(key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to write localStorage key "${key}"`, error);
  }
}
