export const getUserId = () => JSON.parse(localStorage.getItem('userId'));

export const getAuthHeader = () => {
  const userId = getUserId();

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};
