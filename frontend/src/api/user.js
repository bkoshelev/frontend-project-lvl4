import storageAPI, { STORAGE_FIELDS } from '../utils/storage';

const setUserData = (userData) => {
  storageAPI.setItem(STORAGE_FIELDS.userId, JSON.stringify(userData));
};

const removeUserData = () => {
  storageAPI.removeItem(STORAGE_FIELDS.userId);
};

const getUserData = () => {
  const userDataString = storageAPI.getItem(STORAGE_FIELDS.userId);
  return JSON.parse(userDataString);
};

const getAuthToken = () => getUserData()?.token;

const getAuthHeader = () => {
  const userId = getUserData();

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const userAPI = {
  setUserData,
  removeUserData,
  getUserData,
  getAuthToken,
  getAuthHeader,
};

export default userAPI;
