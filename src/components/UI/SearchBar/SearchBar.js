import React from 'react';

import './SearchBar.scss';

const SearchBar = (props) => {

  return (
    <div className="SearchBar" action="index.html" method="post">
      <input type="text" name="search" placeholder="Wyszukaj adres" id="search-bar"/>
      <button onClick={()=>{props.geoClick()}} className="localization" title="Znajdź adres"><i className="far fa-dot-circle"></i></button>
      <button onClick={()=>{props.searchClick(1)}} className="search-icon" title="Wyszukaj"><i className="fas fa-search"></i></button>
    </div>
  )
};

export default SearchBar;
