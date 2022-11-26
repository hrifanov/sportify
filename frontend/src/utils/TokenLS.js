export const putTokenLS = (label, token) => {
  try {
    localStorage.setItem(label, token);
    console.log(`Putting value '${token}' to LS variable '${label}'`);
    return 'succes';
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const getTokenLS = (label) => {
  try {
    const t = localStorage.getItem(label);
    if (!t) {
      console.log('Trying to get invite token from LS, but did not find any: ' + label);
      return undefined;
    }
    return t;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
