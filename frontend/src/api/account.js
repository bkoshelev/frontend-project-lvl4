import { useDispatch } from 'react-redux';
import { logInRequest, signUpRequest, logout } from '../slices/accountSlice';

const useAccountAPI = () => {
  const dispatch = useDispatch();

  const logIn = async (data) => dispatch(logInRequest(data)).unwrap();
  const logOut = async () => dispatch(logout());
  const signUp = async (data) => dispatch(signUpRequest(data)).unwrap();

  return {
    logIn,
    logOut,
    signUp,
  };
};

export default useAccountAPI;
