export const makeStorageItem = (storage, key) => {
  return (data = null) => {
    if (data) {
      return storage.setItem(key, JSON.stringify(data));
    }

    const item = storage.getItem(key);
    return item ? JSON.parse(item) : null;
  };
};

export const makeSessionStorageItem = (key) => {
  return makeStorageItem(sessionStorage, key);
};
export const makeLocalStorageItem = (key) => {
  return makeStorageItem(localStorage, key);
};
