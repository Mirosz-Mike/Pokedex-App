export let isAuthenticatedBoolean: boolean = false;

export const login = (username: string, password: string): Promise<boolean> => {
  const isAuthenticated = username === 'pikachu' && password === 'pikachu';
  return new Promise((resolve) => {
    setTimeout(() => {
      isAuthenticatedBoolean = isAuthenticated;
      resolve(isAuthenticatedBoolean);
    }, 1000);
  });
};
