export const makeStorageItem = (storage, key) => {
  return (data = null) => {
    if (data) {
      return storage.setItem(key, JSON.stringify(data));
    }

    try {
      return JSON.parse(storage.getItem(key));
    } catch (e) {
      return null;
    }
  };
};

export const makeSessionStorageItem = (key) => {
  return makeStorageItem(sessionStorage, key);
};
export const makeLocalStorageItem = (key) => {
  return makeStorageItem(localStorage, key);
};
