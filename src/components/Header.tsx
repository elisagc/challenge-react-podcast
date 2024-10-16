import React from 'react';
import classes from './Header.module.css';
import Loader from './common/Loader';
import { Link } from 'react-router-dom';
const Header = () => {
  return (
    <div className={classes['app-header']}>
      <Link to={'/'}>Podcaster</Link>
      <Loader />
    </div>
  );
};

export default Header;
