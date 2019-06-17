import React from 'react';

import './Map.scss';

const Map = (props) => {

  const mapStyle = {
    width: "70%",
    height: "240px"
  }

  return (
    <div id="map" className="Map" style={mapStyle}></div>
  )
};

export default Map;
