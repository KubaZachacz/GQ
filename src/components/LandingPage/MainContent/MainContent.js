import React from 'react';

import Background from '../../../hoc/Background/Background'

// import Background from '../../../assets/background.jpg'

import './MainContent.scss';

const MainContent = (props) => {

  // const style = {
  //   backgroundImage: `url(${Background})`
  // }

  return (
    <Background>
      <div className="MainContent">
        <div className="mask"></div>
        <div className="wrapper">
          {props.children}
        </div>
      </div>
    </Background>
  )
};

export default MainContent;
