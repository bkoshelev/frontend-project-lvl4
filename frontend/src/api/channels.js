import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import store from '../slices/index';
import { fetchChatData, actions as channelsSliceActions } from '../slices/channelsSlice';
import { useSocket } from '../utils/socket';

const useChannelsAPI = () => {
  const dispatch = useDispatch();
  const { subscribe, sendEvent } = useSocket();

  useEffect(() => {
    subscribe('newChannel', (data) => {
      store.dispatch(channelsSliceActions.addChannel(data));
    });

    subscribe('removeChannel', (data) => {
      store.dispatch(channelsSliceActions.removeChannel(String(data.id)));
    });

    subscribe('renameChannel', ({ id, name }) => {
      store.dispatch(channelsSliceActions
        .updateChannel({ id: String(id), changes: { name } }));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chatDataFetch = async () => dispatch(fetchChatData()).unwrap();

  const createNewChannel = async (data) => sendEvent('newChannel', data);

  const removeChannel = async (data) => sendEvent('removeChannel', data);

  const renameChannel = async (data) => sendEvent('renameChannel', data);

  return ({
    chatDataFetch,
    createNewChannel,
    removeChannel,
    renameChannel,
  });
};

export default useChannelsAPI;
