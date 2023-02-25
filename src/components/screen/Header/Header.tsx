import { FC } from 'react';
import styles from './Header.module.scss';
import Logo from './Logo/Logo';
import NavBar from './NavBar/NavBar';

interface IHeaderProps {
    Auth: boolean
  }

const Header:FC<IHeaderProps> = ({ Auth }) => (
  <header className={styles.Header}>
    <Logo />
    <NavBar Auth={Auth} />
  </header>
);

export default Header;
