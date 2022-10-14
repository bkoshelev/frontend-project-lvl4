import socketAPI from '../utils/socket';
import store from '../slices';
import { actions as messagesSliceActions } from '../slices/messagesSlice';

const createNewMessage = async (data) => {
  socketAPI.sendEvent('newMessage', data);
};

socketAPI.subscribe('newMessage', (data) => {
  store.dispatch(messagesSliceActions.addMessage(data));
});

const messagesAPI = {
  createNewMessage,
};

export default messagesAPI;
