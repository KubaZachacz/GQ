import React from 'react';

import './SearchBar.scss';

const SearchBar = (props) => {

  const inputEnterHandler = (event) => {
    if (event.keyCode === 13) {
      // event.preventDefault();
      props.searchClick(1)
    }
  }

  return (

    <div style={props.style} className="SearchBar myInputs" action="index.html" method="post">
      <input 
      value = {props.fraze}
      onChange={(e) => {props.typeFraze(e)}} 
      onKeyUp={(e) => inputEnterHandler(e)}
       type="text" name="search" placeholder="Wyszukaj adres" id="search-bar" />
      <button onClick={() => { props.geoClick() }} className="localization" title="Znajdź adres"><i className="far fa-dot-circle"></i></button>
      <button onClick={() => { props.searchClick(1) }} className="search-icon" title="Wyszukaj"><i className="fas fa-search"></i></button>
    </div>
  )
};

export default SearchBar;
