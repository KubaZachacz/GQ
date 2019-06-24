import React from 'react';
import LogosBar from '../../../../LogosBar/LogosBar'
import LinkButton from '../../../../UI/LinkButton/LinkButton'

import './About.scss';

const About = (props) => {

  return (
    <div className="About">
      <h2>O stronie</h2>
      <p className="About-p"><strong>QuickGreen </strong> to platforma integracji i&nbsp;dystrybucji danych na temat inwestycji w&nbsp;energetykę solarną. W&nbsp;jednym miejscu znajdziesz między innymi informacje o&nbsp;nasłonecznieniu, cenie prądu i&nbsp;zanieczyszczeniu powietrza. </p>
      <p className="About-p">
      Jeżeli jesteś przedstawicielem instytucji publicznej znajdziesz tu również informacje o średnim zużyciu energii elektrycznej oraz o ilości azbestu wymagającego usunięcia w&nbsp;wybranym powiecie.</p>
      <p className="About-p">Strona powstała w oparciu o otwarte dane.</p>
      <LogosBar style={{height: '50px'}}/>
      <LinkButton click={props.backClick} id={2}><i className="fas fa-long-arrow-alt-left"></i> Powrót</LinkButton>
    </div>
  )
};

export default About;
