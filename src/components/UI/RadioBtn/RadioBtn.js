import React from 'react';

import './RadioBtn.scss';

const RadioBtn = (props) => {

  return (
    <div className="RadioBtn" onClick={()=>{if(!props.checked) props.change(props.value)}}>
      {props.children}
      <input type="radio" name="radio" value={props.value}  checked={props.checked}/>
      <span className="checkmark"></span>
    </div>
  )
};

export default RadioBtn;
