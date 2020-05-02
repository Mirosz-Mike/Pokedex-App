const random = (arr: string[]) => {
  const resultrandom = Math.floor(Math.random() * arr.length);

  return arr[resultrandom];
};

export default random;
