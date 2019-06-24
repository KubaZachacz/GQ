import React from 'react';

import './CalcResult.scss';

const CalcResult = (props) => {

  let resultOutput = <p>Za mała powierzchnia paneli. Polecamy inwestycje w elektrownię wiatrową.</p>

  const HOURS = 6;

  const calcPrice = props.sq_meters * props.avg_ghi * HOURS * props.price.replace(/,/, '.')/1000 * 31;
  console.log(calcPrice);
  if (calcPrice < props.cost) {
    resultOutput = <p>Za mała powierzchnia paneli. Polecamy inwestycje w elektrownię wiatrową.</p>
  }
  else {
    resultOutput = <><p>Instalacja pokryje Twoje potrzeby</p>
      <p>Inwestycja przyniesie {(calcPrice*0.14).toFixed(2)} zł przychodu miesięcznie.</p>
    </>
  }

  return (
    <div className="CalcResult">
      {resultOutput}
      <div className="inlines">
        <a href="">Dostawca paneli</a>
        <a href="">Dofinansowania</a>
        <a href="">Dowiedz się więcej!</a>
      </div>
    </div>
  )
};

export default CalcResult;
