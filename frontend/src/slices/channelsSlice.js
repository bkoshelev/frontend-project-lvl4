/* eslint-disable no-param-reassign */

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import userAPI from '../api/user';

import routes from '../routes';

const GENERAL_CHANNEL_ID = 1;

export const fetchChatData = createAsyncThunk(
  'chat/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.dataPath(), {
        headers: userAPI.getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  },
);

export const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    ...channelsAdapter.getInitialState(), currentChannelId: null, loading: 'idle', error: null,
  },
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    changeCurrentChannelId(state, action) {
      state.currentChannelId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.loading = 'succeeded';
        state.error = null;
      })
      .addCase(fetchChatData.rejected, (state) => {
        state.loading = 'failed';
        state.error = null;
      })
      .addCase(channelsSlice.actions.addChannel, (state, action) => {
        state.currentChannelId = action.payload.id;
      })
      .addCase(channelsSlice.actions.removeChannel, (state) => {
        state.currentChannelId = GENERAL_CHANNEL_ID;
      });
  },
});

export const { actions, name } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
