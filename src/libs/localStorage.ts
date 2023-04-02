const getLocalStorage = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : undefined;
};

const setLocalStorage = (key: string, value: string) =>
  localStorage.setItem(key, JSON.stringify(value));

const removeLocalStorage = (key: string) => localStorage.removeItem(key);

export { getLocalStorage, setLocalStorage, removeLocalStorage };
