import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Login from './pages/Login';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';

import Root from './components/Root';
import AuthZonePageWrapper from './components/AuthZonePageWrapper';
import routes from './routes';

export default createBrowserRouter([
  {
    element: <Root />,
    errorElement: <NotFoundPage />,
    children: [
      {
        element: <AuthZonePageWrapper />,
        children: [
          {
            path: routes.mainPage(),
            element: <MainPage />,
          },
        ],
      },
      {
        path: routes.loginPage(),
        element: <Login />,
      },
      {
        path: routes.signupPage(),
        element: <SignupPage />,
      },
    ],
  },
]);
