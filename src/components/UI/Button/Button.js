import React from 'react';

import './Button.scss';

const Button = (props) => {

return (
  <button className="Button" style={props.style} onClick={()=>{if(props.click)props.click(props.param)}}>
    {props.children}
  </button>
)};

export default Button;
