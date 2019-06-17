import React from 'react';

import Background from '../../../assets/background.jpg'

import './MainContent.scss';

const MainContent = (props) => {

  const style = {
    backgroundImage: `url(${Background})`
  }

  return (
    <div style={style} className="MainContent">
      <div className="mask"></div>
      <div className="wrapper">
        {props.children}
      </div>
    </div>
  )
};

export default MainContent;
