import React, { Component } from 'react';
import Header from './components/Header/Header'

import loadScript from './components/Map/loadScript'

import LandingPage from './containers/LandingPage/LandingPage'
import LoginPage from './containers/LoginPage/LoginPage'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import './App.css';

class App extends Component {
  state = {
    logoSize: 2,
    fontSizeText: null,
    isLogged: false,
    isLogging: false,
    scriptLoaded: false,
  }

  componentDidMount = () => {
    console.log(this.state.scriptLoaded)
    if (!this.state.scriptLoaded) {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfGjRlQjt9v6WHdQDNh7vgS7l5pntwb8&libraries=places")
      this.setState({ scriptLoaded: true })
    }
  }

  componentDidUpdate = () => {
    if (this.state.fontSizeText) {
      // this.textResizeHandler(this.state.fontSizeText);
      this.textResizeFn(this.state.fontSizeText);
    }
  }

  changeSiteCallback = (site) => {
    this.setState({
      logoSize: site
    })
  }

  textResizeClickHandler = (size) => {
    this.setState({
      fontSizeText: size
    })
  }

  textResizeTrigger = () => {
    this.textResizeFn(this.state.fontSizeText)
  }

  textResizeFn = (size) => {
    const el = document.querySelector("body");
    const FONT_SCALE = 1.15;
    let n, a = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) {
      const element = n.parentNode;
      if (!a.includes(element) && element.tagName !== "BODY" && element.tagName !== "STRONG") {

        a.push(element);

        const computedFontSize = window.getComputedStyle(element).fontSize.replace("px", "");
        let fontSize;

        if (size === "up" && element.getAttribute('resized') !== 'up') {
          fontSize = `${computedFontSize * FONT_SCALE}px`;
          if (element.getAttribute('resized') === 'down') fontSize = `${computedFontSize * FONT_SCALE * FONT_SCALE}px`;
          element.setAttribute('resized', 'up')
        }

        else if (size === "down" && element.getAttribute('resized') !== 'down') {
          fontSize = `${computedFontSize / FONT_SCALE}px`;
          if (element.getAttribute('resized') === 'up') fontSize = `${computedFontSize / FONT_SCALE / FONT_SCALE}px`;
          element.setAttribute('resized', 'down')
        }

        else if (size === "norm") {
          if (element.getAttribute('resized') === 'down') fontSize = `${computedFontSize * FONT_SCALE}px`;
          if (element.getAttribute('resized') === 'up') fontSize = `${computedFontSize / FONT_SCALE}px`;
          element.removeAttribute('resized');
        }

        element.style.fontSize = fontSize;
      }
    }
  }

  loginClickHandler = () => {
    this.setState({ isLogging: true });
    console.log("logging")
  }

  render() {
    // let visibleArea = <LandingPage passSite={this.changeSiteCallback} />
    // if (this.state.isLogging) visibleArea = <LoginPage />
    return (
      <Router >
        <div className="App">
          <Header logoSize={this.state.logoSize} resizeClick={this.textResizeClickHandler} loginClick={this.loginClickHandler} />
          {/* {visibleArea} */}
          <Switch>
            <Route path="/" exact render={(props) => <LandingPage {...props} passSite={this.changeSiteCallback} textResize={this.textResizeTrigger}/>} />
            {/* <Route path="/" exact component={LandingPage} /> */}
            <Route path="/login" render={(props) => <LoginPage {...props} textResize={this.textResizeTrigger}/>} />
          </Switch>
        </div>
      </Router>
    );
  }
}


export default App;
