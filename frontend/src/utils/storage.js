export const STORAGE_FIELDS = {
  userId: 'userId',
};

const storageAPI = {
  setItem: window.localStorage.setItem.bind(localStorage),
  removeItem: window.localStorage.removeItem.bind(localStorage),
  getItem: window.localStorage.getItem.bind(localStorage),
};

export default storageAPI;
