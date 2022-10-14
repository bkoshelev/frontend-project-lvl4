import store from '../slices';
import { logInRequest, signUpRequest, logout } from '../slices/accountSlice';

const logIn = async (data) => store.dispatch(logInRequest(data)).unwrap();

const logOut = async () => store.dispatch(logout());

const signUp = async (data) => store.dispatch(signUpRequest(data)).unwrap();

const accountAPI = {
  logIn,
  logOut,
  signUp,
};

export default accountAPI;