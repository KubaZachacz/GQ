import React from 'react';

import './PanelBlock.scss';

const PanelBlock = (props) => {

const classNameText = props.className?props.className:''

return (
  <div className={`PanelBlock addBorder ${classNameText}`}>
    {props.children}
  </div>
)};

export default PanelBlock;
