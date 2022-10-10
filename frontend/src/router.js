import { createBrowserRouter, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

import Root from './components/Root';

import { useAuth } from './hooks';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.loggedIn ? children : (
      <Navigate to="/login" />
    )
  );
};

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <Root />
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <PrivateRoute><MainPage /></PrivateRoute>,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
]);
