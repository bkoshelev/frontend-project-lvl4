import io from 'socket.io-client';
import { actions as messageSliceActions } from '../slices/messagesSlice';
import { actions as channelsSliceActions } from '../slices/channelsSlice';
import store from '../slices/index';

const createNewSocketConnection = () => {
  const socketData = {};

  return () => {
    if (!socketData.socket) {
      socketData.socket = io();

      socketData.socket.on('connect', () => {
      });

      socketData.socket.on('newMessage', (data) => {
        store.dispatch(messageSliceActions.addMessage(data));
      });

      socketData.socket.on('newChannel', (data) => {
        store.dispatch(channelsSliceActions.addChannel(data));
      });

      socketData.socket.on('removeChannel', (data) => {
        store.dispatch(channelsSliceActions.removeChannel(String(data.id)));
      });

      socketData.socket.on('renameChannel', (data) => {
        store.dispatch(channelsSliceActions
          .updateChannel({ id: String(data.id), changes: { name: data.name } }));
      });
    }
    return socketData.socket;
  };
};

export default createNewSocketConnection();
