import React from 'react';

import LinkButton from '../../../../UI/LinkButton/LinkButton'
import Map from '../../../../Map/Map'

import { Link } from 'react-router-dom'

import './Result.scss';

const Result = ({ resultData, backClick }) => {

  let title = 'Ładuję ...';
  let result = null;

  if (resultData) {
    console.log(resultData)
    title = `Powiat ${resultData.nazwa_teryt}`
    result = <>
        <p className="single-result">
          <i className="fas fa-money-bill-wave"></i> Cena prądu:
          <span>{resultData.cena_pradu}</span> zł
        </p>
        <p className="single-result">
          <i className="fas fa-sun"></i> Nasłonecznienie:
          <span>{resultData.nasłonecznienie}</span> promyczków
        </p>
        <Link to="/login">Dowiedz się więcej jako zarejestrowany użytkownik</Link>
    </>
    //  const sun = <i class="fas fa-sun"></i>
  }


  return (
    <div className="Result">
      <h2>Wynik</h2>
      <h3 id="powiat">{title}</h3>
      <div className="result-set">
        {result}
      </div>

      <Map />
      <LinkButton click={backClick} id={2}><i className="fas fa-long-arrow-alt-left"></i> Powrót</LinkButton>
    </div>
  )
};

export default Result;

