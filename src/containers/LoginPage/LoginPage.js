import React, { Component } from 'react';

// import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import Background from '../../hoc/Background/Background'
import RadioBtn from '../../components/UI/RadioBtn/RadioBtn'

import './LoginPage.scss';

class LoginPage extends Component {

  state = {
    userType: 'user'
  }

  componentDidMount = () => {

    this.props.textResize();
    this.props.contrastChange();
    this.props.pageCallback(2);
  }

  componentDidUpdate() {
    // alert(document.querySelector('input[name=myRadio]:checked').value);
  }

  radioChangeHandler = (val) => {
    this.setState({ userType:val})
  }

  render() {
    return (
      <Background>
        <div className="LoginPage">
          <div className="loginWrapper contentBox">
            <h2>Dostęp dla zarejestrowanych użytkowników</h2>
            <p><strong>QuickGreen </strong> to platforma integracji i&nbsp;dystrybucji danych na temat inwestycji w&nbsp;energetykę solarną. Będąc zarejestrowanym użytkownikiem w&nbsp;jednym miejscu znajdziesz między innymi informacje o&nbsp;nasłonecznieniu, cenie prądu i&nbsp;zanieczyszczeniu powietrza. Dodatkowe informacje udostępniane są przedstawicielom instytucji publicznych.</p>
            {/* <form className="myInputs"> */}
              {/* <label>Login</label> */}
              {/* <input  type="text" /> */}
              {/* <label>Hasło</label> */}
              {/* <input  type="password" /> */}
              <div className="inlines">
                <RadioBtn value='user' checked={this.state.userType === 'user'} change={this.radioChangeHandler}>Użytkownik indywidualny</RadioBtn>
                <RadioBtn value='institution' checked={this.state.userType === 'institution'} change={this.radioChangeHandler}>Instytucja publiczna</RadioBtn>
                {/* <label>Użytkownik indywidualny</label>
                <input type='radio' id='radio-1' name='myRadio' value='user'
                  checked={this.state.userType === 'user'} onChange={(e) => this.radioChangeHandler(e)} />
                <label>Instytucja publiczna</label>
                <input type='radio' id='radio-2' name='myRadio' value='institution'
                  checked={this.state.userType === 'institution'} onChange={(e) => this.setState({ userType: e.target.value })} /> */}
              </div>
            {/* </form> */}
            <div className="inlines">
              <button disabled onClick={e => e.preventDefault()}>Zarejestruj</button>
              <Link to={`/panel/${this.state.userType}`}><div className="btn-link myButton">Zaloguj sie</div></Link>
            </div>
          </div>
        </div>
      </Background>
    )
  }

}

export default LoginPage;
