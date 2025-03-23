export const getAuth = () => {
  return localStorage.getItem("credentials");
};

export const setAuth = (login: string, password: string) => {
  const base64Credentials = btoa(`${login}:${password}`);

  localStorage.setItem("credentials", base64Credentials);
};

export const clearAuth = () => {
  return localStorage.removeItem("credentials");
};
