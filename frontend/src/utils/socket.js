import React, { createContext, useContext } from 'react';
import io from 'socket.io-client';

const createIoPromise = (socket) => (eventName, data) => {
  const promise = new Promise((resolve) => {
    socket.emit(eventName, data, (response) => {
      if (!response) {
        throw new Error();
      }
      resolve(response);
    });
  });
  return promise;
};

export const socketInstance = io({
  autoConnect: false,
});

export const SocketContext = createContext();

export const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);

export const useSocket = () => {
  const socket = useContext(SocketContext);

  const makeSocketConnection = () => {
    socket.connect();
  };

  const socketDisconnect = () => {
    socket.disconnect();
  };

  const sendEvent = (eventName, data) => createIoPromise(socket)(eventName, data);

  const subscribe = (eventName, action) => {
    socket.on(eventName, action);
  };

  return {
    makeSocketConnection,
    socketDisconnect,
    sendEvent,
    subscribe,
  };
};
