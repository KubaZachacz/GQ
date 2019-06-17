import React from 'react';

import Slide from './Slide/Slide'
import MainInfo from './MainInfo/MainInfo'
import About from './About/About'
import Result from './Result/Result'

import './LeftSide.scss';

const LeftSide = (props) => {

  let resultStyle = {
    left: `${100-props.actualSite*100}%`
  }
  let mainStyle = {
    left: `${200-props.actualSite*100}%`
  }
  let aboutStyle = {
    left: `${300-props.actualSite*100}%`
  }

  return (
    <div className="LeftSide">
      <Slide style={mainStyle}>
        <MainInfo aboutClick={props.linkClick}/>
      </Slide>
      <Slide style={aboutStyle}>
        <About backClick={props.linkClick}/>
      </Slide>
      <Slide style={resultStyle}>
        <Result backClick={props.linkClick}/>
      </Slide>
    </div>
  )
};

export default LeftSide;
