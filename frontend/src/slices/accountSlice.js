/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import userAPI from '../api/user';
import routes from '../routes';

const hasToken = !!userAPI.getAuthToken();

export const logInRequest = createAsyncThunk(
  'account/logIn',
  async (data) => {
    const res = await axios.post(routes.loginPath(), data);
    userAPI.setUserData(res.data);
  },
);

export const signUpRequest = createAsyncThunk(
  'account/signUp',
  async (data) => {
    const res = await axios.post(routes.signupPath(), data);
    userAPI.setUserData(res.data);
  },
);

export const logout = createAsyncThunk(
  'account/logOut',
  () => {
    userAPI.removeUserData();
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState: { loggedIn: hasToken },
  extraReducers: (builder) => {
    builder
      .addCase(logInRequest.fulfilled, (state) => {
        state.loggedIn = true;
      })
      .addCase(signUpRequest.fulfilled, (state) => {
        state.loggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
      });
  },
});

export const { actions } = accountSlice;
export default accountSlice.reducer;
