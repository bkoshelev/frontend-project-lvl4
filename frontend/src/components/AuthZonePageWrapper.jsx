import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import routes from '../routes';
import socketAPI from '../utils/socket';

const AuthZonePageWrapper = () => {
  const { loggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    socketAPI.makeConnection();
    return () => {
      socketAPI.disconnect();
    };
  });

  return loggedIn ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

export default AuthZonePageWrapper;
