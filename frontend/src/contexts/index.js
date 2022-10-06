import { createContext, useMemo, useState } from 'react';
import { getUserId } from '../utils';
import { createNewSocketConnection } from '../utils/socket';

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

  const value = useMemo(() => ({ loggedIn, logIn, logOut }), [loggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={createNewSocketConnection()}>
    {children}
  </SocketContext.Provider>
);
