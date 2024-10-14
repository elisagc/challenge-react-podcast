import React from 'react';
import classes from './Header.module.css';
const Header = () => {
  return (
    <div className={classes['app-header']}>
      <span>Podcaster</span>
      <span>Loading...</span>
    </div>
  );
};

export default Header;
