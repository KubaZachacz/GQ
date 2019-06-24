import React from 'react';

import './InputText.scss';

const InputText = (props) => {

  const classNameTxt = props.className ? props.className : '';

  return (

    <div className={`InputText ${classNameTxt}`}>
      <label>{props.label}</label>
      <input

        onChange={(e) => { props.onChange(e) }}
        onKeyUp={(e) => { if (props.onEnter) props.onEnter(e) }}
        placeholder={props.placeholder}
        type="number" />
    </div>
  )
};

export default InputText;
