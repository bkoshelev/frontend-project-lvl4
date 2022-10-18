import { useEffect } from 'react';

import { useSocket } from '../utils/socket';
import store from '../slices';
import { actions as messagesSliceActions } from '../slices/messagesSlice';

const useMessagesAPI = () => {
  const { subscribe, sendEvent } = useSocket();

  const createNewMessage = async (data) => {
    sendEvent('newMessage', data);
  };

  useEffect(() => {
    subscribe('newMessage', (data) => {
      store.dispatch(messagesSliceActions.addMessage(data));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ({
    createNewMessage,
  });
};

export default useMessagesAPI;
