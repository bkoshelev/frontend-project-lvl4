import { configureStore } from '@reduxjs/toolkit';

import messagesReducer from './messagesSlice';
import channelsReducer from './channelsSlice';
import modalReducer from './modalSlice';
import authSlice from './accountSlice';

export default configureStore({
  reducer: {
    messages: messagesReducer,
    channels: channelsReducer,
    modal: modalReducer,
    auth: authSlice,
  },
});
