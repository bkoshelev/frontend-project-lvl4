
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchChatData } from './chatSlice';

export const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
    name: 'channels',
    initialState: channelsAdapter.getInitialState(),
    reducers: {
        addChannel: channelsAdapter.addOne,
        removeChannel: channelsAdapter.removeOne,
        updateChannel: channelsAdapter.updateOne
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatData.fulfilled, (state, action) => {
                channelsAdapter.addMany(state, action.payload.channels)
            })
    },
})

export const { actions } = channelsSlice;
export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
