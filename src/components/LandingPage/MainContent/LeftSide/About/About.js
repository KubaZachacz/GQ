import React from 'react';

import LinkButton from '../../../../UI/LinkButton/LinkButton'

import './About.scss';

const About = (props) => {

  return (
    <div className="About">
      <h2>O stronie</h2>
      <p><strong>Green Quick</strong> to jest takie zajebiste. Tutaj trochę bardzo ważnych i mądrych słów o tym jak to działa i dlaczego to działa bardzo dobrze, napisać coś zgrabnie o satelitach i o danych, tak żeby było parę linijek wartościowego tekstu. Lubię placki.</p>
      <p>Tutaj trochę bardzo ważnych i mądrych słów o tym jak to działa i dlaczego to działa bardzo dobrze, napisać coś zgrabnie o satelitach i o danych, tak żeby było parę linijek wartościowego tekstu. Lubię placki.</p>
      <LinkButton click={props.backClick} id={2}><i className="fas fa-long-arrow-alt-left"></i> Powrót</LinkButton>
    </div>
  )
};

export default About;
