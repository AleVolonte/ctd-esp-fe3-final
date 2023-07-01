import React, { useContext } from 'react';
import { ContextGlobal } from '../Components/utils/global.context';

const Footer = () => {
  const { state: { theme } } = useContext(ContextGlobal);

  return (
    <footer className={`footer ${theme}`}>
      <div className="left-content">
        <img src={`${process.env.PUBLIC_URL}/images/DH.png`} alt="DH-logo" />
      </div>
      <div className="right-content">
        <img src={`${process.env.PUBLIC_URL}/images/ico-facebook.png`} alt="Facebook" />
        <img src={`${process.env.PUBLIC_URL}/images/ico-instagram.png`} alt="Instagram" />
        <img src={`${process.env.PUBLIC_URL}/images/ico-tiktok.png`} alt="TikTok" />
        <img src={`${process.env.PUBLIC_URL}/images/ico-whatsapp.png`} alt="WhatsApp" />
      </div>
    </footer>
  );
};

export default Footer;