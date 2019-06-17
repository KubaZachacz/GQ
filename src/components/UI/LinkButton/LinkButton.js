import React from 'react';

import './LinkButton.scss';

const LinkButton = (props) => {

  return (
    <button style={props.span} className="LinkButton" onClick={() => { props.click(props.id) }}>
      <span>{props.children}</span>
    </button>
  )
};

export default LinkButton;
