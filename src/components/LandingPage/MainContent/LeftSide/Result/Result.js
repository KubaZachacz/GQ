import React from 'react';

import LinkButton from '../../../../UI/LinkButton/LinkButton'
import Map from '../../../../Map/Map'


import './Result.scss';

const Result = (props) => {
  return (
    <div className="Result">
      <h2>Wynik</h2>
      <h3 id="powiat">Powiat ...</h3>
      <Map />
      <LinkButton click={props.backClick} id={2}><i className="fas fa-long-arrow-alt-left"></i> Powrót</LinkButton>
    </div>
  )
};

export default Result;

