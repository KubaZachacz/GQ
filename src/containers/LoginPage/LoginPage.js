import React, { Component } from 'react';

import Button from '../../components/UI/Button/Button'

import Background from '../../hoc/Background/Background'

import './LoginPage.scss';

class LoginPage extends Component {

  componentDidMount = () => {

    this.props.textResize();
}

  render() {
    return (
      <Background>
        <div className="LoginPage">
          <div className="wrapper">
            <h2>Dostęp dla intytucji inwestujących :)</h2>
            <p>Krótko o tym co daje Green Quick</p>
            <p>Będą zarejestrowanym użtykownikiem dostajesz możliwość... Tutaj plusy, jeśli jakieś wymyślicie</p>
            <p>To są naprawdę fajne featury i wszystko to dlaczego warto się zarejestrować i być zalogowanym</p>
            <form>
              <label>Login</label>
              <input type="text" />
              <label>Hasło</label>
              <input type="text" />
              <div className="inlines">
                <button onClick={e=>e.preventDefault()}>Zarejestruj</button>
                <button onClick={e=>e.preventDefault()}>Zaloguj sie</button>
              </div>
            </form>
          </div>
        </div>
      </Background>
    )
  }

}

export default LoginPage;
