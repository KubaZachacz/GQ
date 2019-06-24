import React from 'react';

import './Map.scss';

const Map = (props) => {

  let mapStyle = {
    width: "90%",
    height: "210px"
  }

  if (props.mapStyle) {
    mapStyle.width = props.mapStyle.width;
    mapStyle.height = props.mapStyle.height;
  }

  const resizeBtn = props.resizeMap ? <button onClick={props.resizeMap} title="Powiększ mapę" className="map-res"><i className="fas fa-expand"></i></button> : null;

  return (
    <div className="map-wrap" style={mapStyle}>
      <div id="map" className="Map"></div>
      {resizeBtn}
      {props.children}
    </div>
  )
};

export default Map;
