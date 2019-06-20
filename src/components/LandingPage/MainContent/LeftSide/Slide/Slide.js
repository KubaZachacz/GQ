import React from 'react';

import './Slide.scss';

const Slide = (props) => {

  return (
    <div style={props.style} className={`Slide ${props.selected}`}>
      <div className="slide-content">
        {props.children}
      </div>

    </div>
  )
};

export default Slide;
