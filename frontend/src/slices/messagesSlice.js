import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChatData, actions as channelsSliceActions } from './channelsSlice';

export const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter
      .addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(channelsSliceActions.removeChannel, (state, action) => {
        const keys = state.ids
          .filter((key) => String(state.entities[key].channelId) === action.payload)
          .map((key) => String(key));
        messagesAdapter.removeMany(state, keys);
      });
  },
});

export const { actions } = messagesSlice;
export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
