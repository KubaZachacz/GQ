import React from 'react';

import './Map.scss';

const Map = (props) => {

  const mapStyle = {
    width: "100%",
    height: "340px"
  }

  return (
    <div id="map" className="Map" style={mapStyle}></div>
  )
};

export default Map;
