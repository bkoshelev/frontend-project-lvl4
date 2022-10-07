/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpened: false, type: null, extra: null },
  reducers: {
    openModal(state, action) {
      state.isOpened = true;
      state.type = action.payload.type;
      state.extra = action.payload.extra ?? null;
    },
    closeModal(state) {
      state.isOpened = false;
      state.type = null;
      state.extra = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
