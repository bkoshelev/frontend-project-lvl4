import store from '../slices/index';
import { fetchChatData, actions as channelsSliceActions } from '../slices/channelsSlice';
import socketAPI from '../utils/socket';

const chatDataFetch = async () => store.dispatch(fetchChatData());

const createNewChannel = async (data) => socketAPI.sendEvent('newChannel', data);

const removeChannel = async (data) => socketAPI.sendEvent('removeChannel', data);

const renameChannel = async (data) => socketAPI.sendEvent('renameChannel', data);

socketAPI.subscribe('newChannel', (data) => {
  store.dispatch(channelsSliceActions.addChannel(data));
});

socketAPI.subscribe('removeChannel', (data) => {
  store.dispatch(channelsSliceActions.removeChannel(String(data.id)));
});

socketAPI.subscribe('renameChannel', ({ id, name }) => {
  store.dispatch(channelsSliceActions
    .updateChannel({ id: String(id), changes: { name } }));
});

const channelsAPI = {
  chatDataFetch,
  createNewChannel,
  removeChannel,
  renameChannel,
};

export default channelsAPI;
