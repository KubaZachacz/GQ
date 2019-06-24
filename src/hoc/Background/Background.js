import React from 'react';
import BackgroundImg from '../../assets/background.jpg'
import './Background.scss';

const Background = (props) => {

  const style = {
    backgroundImage: `url(${BackgroundImg})`
  }

  return (
    <>
      <div style={style} className="Background"></div>
      <div className="pageContent">
        {props.children}
      </div>
    </>
  )
};

export default Background;
