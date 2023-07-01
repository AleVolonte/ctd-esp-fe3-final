import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ContextGlobal } from './utils/global.context';

const Navbar = () => {
  const { state: { theme }, toggleTheme } = useContext(ContextGlobal);

  return (
    <nav className={theme === 'dark' ? 'dark' : 'light'}>
      <div className="left-content">
        <img src={`${process.env.PUBLIC_URL}/DH.ico`} alt="DH-icon" />
      </div>
      <div className="right-content">
        <Link to="/">Inicio</Link>
        <Link to="/contact">Contacto</Link>
        <Link to="/favs">Favoritos</Link>
        <button id="themeButton" onClick={toggleTheme}>
          <img
            src={`${process.env.PUBLIC_URL}/images/drklight.png`}
            alt="Change Theme"
            className="theme-icon"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;