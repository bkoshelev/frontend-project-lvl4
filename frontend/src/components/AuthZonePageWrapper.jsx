import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

import routes from '../routes';
import { useSocket } from '../utils/socket';

const AuthZonePageWrapper = () => {
  const { loggedIn } = useSelector((state) => state.auth);
  const { makeSocketConnection, socketDisconnect } = useSocket();

  useEffect(() => {
    makeSocketConnection();
    return () => {
      socketDisconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loggedIn ? <Outlet /> : <Navigate to={routes.loginPage()} />;
};

export default AuthZonePageWrapper;
