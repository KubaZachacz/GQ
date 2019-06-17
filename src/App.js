import React, {Component} from 'react';

import LandingPage from './containers/LandingPage/LandingPage'

import './App.css';

class App extends Component{
  render(){
    return (
      <div className="App">
        <LandingPage />
        <div id="map"></div>
      </div>
    );  
  }
}


export default App;
