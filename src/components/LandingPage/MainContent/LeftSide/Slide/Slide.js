import React from 'react';

import './Slide.scss';

const Slide = (props) => {

return (
  <div style={props.style} className={`Slide ${props.selected}`}>
    {props.children}
  </div>
)};

export default Slide;
