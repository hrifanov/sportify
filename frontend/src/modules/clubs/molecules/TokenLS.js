export const putTokenLS = (label, token) => {
  try {
    localStorage.setItem(label, token);
    console.log('putting token value: ' + token);
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
      console.log('Token is not defined, tokenLabel: ' + label);
      return undefined;
    }
    return t;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
