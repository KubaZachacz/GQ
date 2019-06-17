import React from 'react';
import Button from '../UI/Button/Button'

import Logo from '../../assets/logo.png'

import './Header.scss';

const Header = (props) => {
  let logoWidth = "15%"
  if (props.actualSite < 2) {
    logoWidth = "7%"
  }
  const logoStyle = {
    width: logoWidth
  }

  return (
    <header className="Header">
    <nav>
      <img style={logoStyle} className="logo" src={Logo} alt="Logo" />
      <div className="accessibility-btns">
        <Button>A+</Button>
        <Button>A-</Button>
        <Button><i className="fas fa-adjust"></i></Button>
        <Button><i className="fas fa-adjust contrast-"></i></Button>
      </div>
      <div className="login"><Button>Zaloguj się</Button></div>
    </nav>
    </header>

  )
};

export default Header;
