import io from 'socket.io-client';

const socketInstance = io({
  autoConnect: false,
});

const createIoPromise = (socket) => function ioPromise(eventName, data) {
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

const makeConnection = () => {
  socketInstance.connect();
};

const disconnect = () => {
  socketInstance.disconnect();
};

const sendEvent = (eventName, data) => createIoPromise(socketInstance)(eventName, data);

const subscribe = (eventName, action) => {
  socketInstance.on(eventName, action);
};

const socketAPI = {
  makeConnection,
  disconnect,
  sendEvent,
  subscribe,
};

export default socketAPI;
