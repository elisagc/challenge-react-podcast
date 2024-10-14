import React from 'react';
import classes from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className={classes['app-layout']}>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
