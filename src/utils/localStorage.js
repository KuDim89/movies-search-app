export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
}

export const removeFromLocalStorage = (key) => {
  localStorage.removeItem(key);
}