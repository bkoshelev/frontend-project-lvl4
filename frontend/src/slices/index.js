import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice'
import messagesReducer from './messagesSlice'
import channelsReducer from './channelsSlice'
import modalReducer from './modalSlice'

export default configureStore({
    reducer: {
        chat: chatReducer,
        messages: messagesReducer,
        channels: channelsReducer,
        modal: modalReducer
    },
});
