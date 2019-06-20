import React from 'react';

import './Map.scss';

const Map = (props) => {

  const mapStyle = {
    width: "90%",
    height: "140px"
  }

  return (
    <div id="map" className="Map" style={mapStyle}></div>
  )
};

export default Map;
