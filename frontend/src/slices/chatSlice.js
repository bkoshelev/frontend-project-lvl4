
import axios from 'axios';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import routes from './../routes'
import { getAuthHeader } from '../utils';
import { actions as channelsSliceActions } from "../slices/channelsSlice"

const GENERAL_CHANNEL_ID = 1

export const fetchChatData = createAsyncThunk(
    'chat/fetchData',
    async () => {
        const response = await axios.get(routes.dataPath(), {
            headers: getAuthHeader()
        });
        return response.data;
    }
);


const chatSlice = createSlice({
    name: 'chat',
    initialState: { currentChannelId: null, loading: 'idle', error: null },
    reducers: {
        changeCurrentChannelId(state, action) {
            state.currentChannelId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatData.fulfilled, (state, action) => {
                state.currentChannelId = action.payload.currentChannelId
                state.loading = 'succeeded';
                state.error = null;
            })
        builder
            .addCase(fetchChatData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = null;

            })
            .addCase(channelsSliceActions.addChannel, (state, action) => {
                state.currentChannelId = action.payload.id
            })
            .addCase(channelsSliceActions.removeChannel, (state) => {
                state.currentChannelId = GENERAL_CHANNEL_ID
            })
    },
})

export const { actions } = chatSlice;
export default chatSlice.reducer;
