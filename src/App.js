import React, { Component } from 'react';
import Header from './components/Header/Header'

import loadScript from './components/Map/loadScript'

import LandingPage from './containers/LandingPage/LandingPage'
import LoginPage from './containers/LoginPage/LoginPage'
import PanelPage from './containers/PanelPage/PanelPage'

import { BrowserRouter as Router, HashRouter, Switch, Route } from 'react-router-dom'

import './App.css';

class App extends Component {
  state = {
    actualPage: 1,
    fontSizeText: null,
    isLogged: false,
    isLogging: false,
    scriptLoaded: false,
  }

  componentDidMount = () => {
    if (!this.state.scriptLoaded) {
      loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfGjRlQjt9v6WHdQDNh7vgS7l5pntwb8&libraries=places")
      this.setState({ scriptLoaded: true })
    }
    // this.fixSideSize();
  }

  componentDidUpdate = () => {
    if (this.state.fontSizeText) {
      // this.textResizeHandler(this.state.fontSizeText);
      this.textResizeFn(this.state.fontSizeText);
    }
    // this.fixSideSize();
  }

  fixSideSize = () => {
    const slide = document.querySelector('.selected');
    const leftSide = document.querySelector('.LeftSide');
    // const searchBar = document.querySelector('.action-btns');

    if (leftSide) leftSide.style.height = slide.clientHeight + "px";
    // if(searchBar) searchBar.style.top = `${(window.innerHeight - searchBar.clientHeight)/2}px`;
  }


  pageCallback = (site) => {
    this.setState({
      actualPage: site
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
      <HashRouter basename='/'>
        <div className="App">
          <Header actualPage={this.state.actualPage} resizeClick={this.textResizeClickHandler} loginClick={this.loginClickHandler} />
          {/* {visibleArea} */}
          <Switch>
            <Route path="/" exact render={(props) => <LandingPage {...props} pageCallback={this.pageCallback} textResize={this.textResizeTrigger} />} />
            {/* <Route path="/" exact component={LandingPage} /> */}
            <Route path="/login" render={(props) => <LoginPage {...props} pageCallback={this.pageCallback} textResize={this.textResizeTrigger} />} />
            <Route path="/panel" render={(props) => <PanelPage {...props} pageCallback={this.pageCallback} textResize={this.textResizeTrigger} />} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}


export default App;
