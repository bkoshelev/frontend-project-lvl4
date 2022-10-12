/* eslint-disable react/jsx-no-constructed-context-values */

import React, { createContext, useState } from 'react';
import { getUserId } from '../utils';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const hasToken = !!getUserId()?.token;
  const [loggedIn, setLoggedIn] = useState(hasToken);

  const logIn = () => {
    setLoggedIn(true);
  };
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
