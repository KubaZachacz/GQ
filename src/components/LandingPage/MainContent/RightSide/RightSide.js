import React from 'react';

import SearchBar from '../../../UI/SearchBar/SearchBar'

import './RightSide.scss';

const RightSide = (props) => {

  return (
    <div className="RightSide">
      <div className="action-btns">
        <p className="try-it">Wypróbuj już teraz</p>
        <SearchBar geoClick={props.geoClick} searchClick={props.searchClick}/>
        <p>
          lub skorzystaj z wyszukiwania obszarów jako&nbsp;<a href="">instytucja&nbsp;publiczna</a>
        </p>
      </div>
    </div>
  )
};

export default RightSide;
