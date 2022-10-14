import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

import Root from './components/Root';
import AuthZonePageWrapper from './components/AuthZonePageWrapper';

export default createBrowserRouter([
  {
    path: '/',
    element: (
      <Root />
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AuthZonePageWrapper />,
        children: [
          {
            path: '/',
            element: <MainPage />,
          },
        ],
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
