/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import userAPI from '../api/user';
import routes from '../routes';

const { getAuthToken, setUserData, removeUserData } = userAPI();

const hasToken = !!getAuthToken();

export const logInRequest = createAsyncThunk(
  'account/logIn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.loginPath(), data);
      setUserData(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue({ status: error.response.status });
    }
  },
);

export const signUpRequest = createAsyncThunk(
  'account/signUp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(routes.signupPath(), data);
      setUserData(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue({ status: error.response.status });
    }
  },
);

export const logout = createAsyncThunk(
  'account/logOut',
  () => {
    removeUserData();
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
