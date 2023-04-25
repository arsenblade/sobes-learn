import React, { InputHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './SearchInput.module.scss';

const searchImg = require('../../../assets/img/search-icon-white.png');

interface ISearchInput extends InputHTMLAttributes<HTMLInputElement> { }

const SearchInput = React.forwardRef<HTMLInputElement, ISearchInput>(({ className, ...rest }, ref) => (
  <>
    <input id="search-input" ref={ref} className={cn(styles.searchInput, className)} {...rest} />
    <label className={styles.searchInputLabel}>
      <img alt="search-icon" src={searchImg} />
    </label>
  </>
));

export default SearchInput;
