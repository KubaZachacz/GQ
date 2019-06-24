import React from 'react';

import './Button.scss';

const Button = (props) => {

  const addClass = props.className?props.className:'';

return (
  <button className={`Button ${addClass}`} style={props.style} onClick={()=>{if(props.click)props.click(props.param)}}>
    <div className="btnContent">{props.children}</div>
  </button>
)};

export default Button;
