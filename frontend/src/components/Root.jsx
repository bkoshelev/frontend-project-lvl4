import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';

const Root = () => (
  <div className="vh-100 d-flex flex-column">
    <Header />
    <Outlet />
  </div>
);

export default Root;
