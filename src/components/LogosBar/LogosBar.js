import React from 'react';

import logo1 from '../../assets/logos/logo1.png'
import logo2 from '../../assets/logos/logo2.png'
import logo3 from '../../assets/logos/logo3.png'
import logo4 from '../../assets/logos/logo4.jpg'
import logo5 from '../../assets/logos/logo5.png'
import logo6 from '../../assets/logos/logo6.jpg'
import logo7 from '../../assets/logos/logo7.jpg'

import './LogosBar.scss';

const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7]

const LogosBar = (props) => {

const logoElements = logos.map((logo, id) => {
  return <img key={id} src={logo} style={props.style} alt="logo dostawcy danych"/>
});

return (
  <div className="LogosBar" >
    {logoElements}
  </div>
)};

export default LogosBar;
