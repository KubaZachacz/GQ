import React from 'react';
import Button from '../UI/Button/Button'

import {Link} from 'react-router-dom'

import Logo from '../../assets/logo.png'

import './Header.scss';

const Header = (props) => {
  let logoWidth = "15%"
  if (props.logoSize === 1) {
    logoWidth = "7%"
  }
  const logoStyle = {
    width: logoWidth
  }

  return (
    <header className="Header">
    <nav>
      <Link to='/'><img style={logoStyle} className="logo" src={Logo} alt="Logo" /></Link>
      <div className="accessibility-btns">
        <Button click={props.resizeClick} param="up">A+</Button>
        <Button click={props.resizeClick} param="norm">A</Button>
        <Button click={props.resizeClick} param="down">A-</Button>
        <Button><i className="fas fa-adjust"></i></Button>
        <Button><i className="fas fa-adjust contrast-"></i></Button>
      </div>
      <div className="login"><Link to='/login'><Button click={props.loginClick}>Zaloguj się</Button></Link></div>
    </nav>
    </header>

  )
};

export default Header;
