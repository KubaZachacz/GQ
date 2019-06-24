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
      Jest to w pełni funkcjonalny prototyp strony powstawły w ciągu 7 dni w ramach <a href="https://hackathon.gov.pl/">Hackathon #OtwarteDane</a>. Zachęcamy do wypróbowania!</p>
      <p className="About-p">
      Kontakt: <a href="mailto:zachacz.jakub@gmail.com">zachacz.jakub@gmail.com</a>.</p>
      <p className="About-p">Strona powstała w oparciu o otwarte dane pochodzące&nbsp;z:</p>
      <LogosBar style={{height: '50px'}}/>
      <LinkButton click={props.backClick} id={2}><i className="fas fa-long-arrow-alt-left"></i> Powrót</LinkButton>
    </div>
  )
};

export default About;
