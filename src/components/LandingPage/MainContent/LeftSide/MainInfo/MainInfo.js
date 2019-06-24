import React from 'react';

import LinkButton from '../../../../UI/LinkButton/LinkButton'

import './MainInfo.scss';

const MainInfo = (props) => {

  return (
    <div className="MainInfo">
      <h1>Inteligentna ocena lokalizacji
        pod kątem zwrotu inwestycji
        w&nbsp;odnawialne źródła energii.</h1>
      <LinkButton click={props.aboutClick} id={3}>Dowiedz się więcej</LinkButton>
    </div>
  )
};

export default MainInfo;
