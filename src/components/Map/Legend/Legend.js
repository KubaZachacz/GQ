import React from 'react';

import './Legend.scss';

import redDot from '../../../assets/red-dot.png'
import blueDot from '../../../assets/blue-dot.png'

const Legend = (props) => {

  const style = {
    visibility: props.display?'visible':'hidden'
  }

  return (
    <div id="legend" className="Legend addBorder" style={style}>
      <h4>Legenda</h4>
      <div className="l-feature"><img src={redDot} alt="czerwony znacznik"></img> wybrana lokalizacja</div>
      <div className="l-feature"><img src={blueDot} alt="niebieski znacznik"></img> stacja pomiarowa</div>
    </div>
  )
};

export default Legend;
