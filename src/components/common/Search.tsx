import React, { InputHTMLAttributes } from 'react';
import classes from './Search.module.css';

interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {}
const Search = (props: SearchProps) => {
  return <input type="text" className={classes['search-input']} {...props} />;
};

export default Search;
