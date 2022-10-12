import React, { createContext } from 'react';
import createNewSocketConnection from '../utils/socket';

export const SocketContext = createContext({});

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={createNewSocketConnection()}>
    {children}
  </SocketContext.Provider>
);
