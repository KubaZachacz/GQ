import React, { useEffect } from 'react';
import Button from '../UI/Button/Button'

import { Link } from 'react-router-dom'

import Logo from '../../assets/LogoQG.png'

import BackgroundImg from '../../assets/background.jpg'

import './Header.scss';

const Header = (props) => {

  let navStyle = {}

  if (props.actualPage > 2) {
    navStyle = {
      //   backgroundImage: `url(${BackgroundImg})`,
      //   backgroundPosition: 'center',
      //   backgroundRepeat: 'no-repeat',
      //   backgroundSize: 'cover'
      // backgroundColor: 'black'
    }
    console.log(navStyle)
  }

  let logoWidth = "15%"
  if (props.actualPage > 0) {
    logoWidth = "7%"
  }
  const logoStyle = {
    width: logoWidth
  }

  let logoLink = "/";
  if (props.actualPage > 2) {
    logoLink = "/panel"
  }

  return (
    <header style={navStyle} className="Header">
      <nav >
        <Link to={logoLink}><img style={logoStyle} className="logo" src={Logo} alt="Logo" /></Link>
        <div className="nav-btns">
          <div className="accessibility-btns">
            <Button click={props.resizeClick} param="up">A+</Button>
            <Button click={props.resizeClick} param="norm">A</Button>
            <Button click={props.resizeClick} param="down">A-</Button>
            <Button><i className="fas fa-adjust"></i></Button>
            <Button><i className="fas fa-adjust contrast-"></i></Button>
          </div>
          <div className="login"><Link to='/login'><Button click={props.loginClick}>Zaloguj się</Button></Link></div>
        </div>
      </nav>
    </header>

  )
};

export default Header;
