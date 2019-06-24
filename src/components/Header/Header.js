import React from 'react';
import Button from '../UI/Button/Button'

import { Link } from 'react-router-dom'

import Logo from '../../assets/LogoQG.png'



import './Header.scss';

const Header = (props) => {

  let navStyle = {}

  let loginButton = <div className="login"><Link to='/login'><Button click={props.loginClick}>Zaloguj się</Button></Link></div>

  if (props.actualPage == 2) {
    loginButton = <div className="login"></div>;
  }
  if (props.actualPage > 2) {
    navStyle = {
      // position: 'static',
      backgroundColor: 'rgba(0,0,0,0.45)'
    }
    loginButton = <div className="login"><Link to='/'><Button click={props.loginClick}>Wyloguj się</Button></Link></div>
  }

  let logoWidth = "100px"
  if (props.actualPage === 0) {
    logoWidth = "35vmin"
  }
  const logoStyle = {
    width: logoWidth
  }

  let logoLink = "/";
  // if (props.actualPage > 2) {
  //   logoLink = "/panel"
  // }

  return (
    <header style={navStyle} className="Header">
      <nav >
        <Link to={logoLink}><img style={logoStyle} className="logo" src={Logo} alt="Logo" /></Link>
        <div className="nav-btns">
          <div className="accessibility-btns">
            <Button click={props.resizeClick} param="up"><span className="sizeUp">A</span></Button>
            <Button click={props.resizeClick} param="norm">A</Button>
            <Button click={props.resizeClick} param="down"><span className="sizeDown">A</span></Button>
            <Button className='normal-ctr' click={props.contrastClick} param="normal" ><i className="fas fa-adjust"></i></Button>
            <Button className='white-ctr' click={props.contrastClick} param="black"><i className="fas fa-adjust"></i></Button>
            <Button className='yellow-ctr' click={props.contrastClick} param="yellow" ><i className="fas fa-adjust "></i></Button>
          </div>
          {loginButton}
        </div>
      </nav>
    </header>

  )
};

export default Header;
