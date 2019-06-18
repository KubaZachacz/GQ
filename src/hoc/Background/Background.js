import React from 'react';
import BackgroundImg from '../../assets/background.jpg'
import './Background.scss';

const Background = (props) => {
  
  const style = {
    backgroundImage: `url(${BackgroundImg})`
  }
  
  return (
    <div style={style} className="Background">
      {props.children}
    </div>
  )
};

export default Background;
