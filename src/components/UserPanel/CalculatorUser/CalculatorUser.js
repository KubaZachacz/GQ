import React from 'react';

import InputText from '../../UI/InputText/InputText'

import './CalculatorUser.scss';

const CalculatorUser = (props) => {

  return (
    <div className="CalculatorUser">
      <div className="caluclator-input">
        <h4>Kalkulator kosztów:</h4>
        <div className="inputs">
          <InputText className="myInputs" label={''} placeholder="powierzchnia dachu" onChange={props.powierzchniaChange} /><label>m2</label>
          <InputText className="myInputs" label={''} placeholder="ile płacisz za prąd" onChange={props.cenaChange} /><label>zł</label>
        </div>
        <button className="addBorder calc-btn" onClick={props.calcClick}>Przelicz</button>
      </div>
      <div className="result-output">
        {props.children}
      </div>
    </div>
  )
};

export default CalculatorUser;
