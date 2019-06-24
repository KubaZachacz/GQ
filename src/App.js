import React, { Component } from 'react';
import Header from './components/Header/Header'

import LandingPage from './containers/LandingPage/LandingPage'
import LoginPage from './containers/LoginPage/LoginPage'
import UserPanel from './containers/UserPanel/UserPanel'
import InstPanel from './containers/InstPanel/InstPanel'
// import InstPanel from './containers/InstPanel/InstPanel'

import { HashRouter, Switch, Route } from 'react-router-dom'

import './App.scss';

class App extends Component {
  state = {
    actualPage: 1,
    fontSizeText: null,
    contrastMode: 'normal',
    isLogged: false,
    isLogging: false,
    scriptLoaded: false,
  }

  componentDidMount = () => {
    if (!this.state.scriptLoaded) {
      // loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfGjRlQjt9v6WHdQDNh7vgS7l5pntwb8&libraries=places")
      this.setState({ scriptLoaded: true })
    }
    if (!this.state.storageLoaded) {
      const fontSizeText = localStorage.getItem('fontSizeText');
      const contrastMode = localStorage.getItem('contrastMode');
      this.setState({
        fontSizeText: fontSizeText,
        contrastMode: contrastMode,
        storageLoaded: true
      })
    }
    // this.fixSideSize();
  }

  componentDidUpdate = () => {
    if (this.state.fontSizeText) {
      // this.textResizeHandler(this.state.fontSizeText);
      this.textResizeFn(this.state.fontSizeText);
    }
    this.contrastChangeFn(this.state.contrastMode);
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
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("fontSizeText", size);
    }
  }

  textResizeTrigger = () => {
    this.textResizeFn(this.state.fontSizeText);
  }


  contrastClickHandler = (mode) => {
    this.setState({
      contrastMode: mode
    })
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("contrastMode", mode);
    }
  }

  contrastChangeTrigger = () => {
    this.contrastChangeFn(this.state.contrastMode)
  }

  textResizeFn = (size) => {
    const el = document.querySelector("body");
    const FONT_SCALE = 1.15;
    let n, a = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
    while (n = walk.nextNode()) {
      const element = n.parentNode;
      if (!a.includes(element) && element.tagName !== "BODY") {

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

  contrastChangeFn = (color) => {
    const el = document.querySelector("body");
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);

    const prefix = "contrast";

    const background = document.querySelector(".pageContent");
    const logo = document.querySelector(".logo");
    const mask = document.querySelector(".mask");
    const contentBox = document.querySelector(".contentBox");
    const buttons = document.querySelectorAll("button, .myButton");
    const addBorder = document.querySelectorAll(".addBorder");
    const inputs = document.querySelectorAll(".myInputs")
    const radios = document.querySelectorAll(".RadioBtn")

    const contrastElements = [background, logo, mask, contentBox, buttons, addBorder, inputs, radios];

    contrastElements.forEach((element) => {
      // element.classList.contains("contrast");
      if (element && element.className) {
        const classes = element.className.split(" ").filter(function (c) {
          return c.lastIndexOf(prefix, 0) !== 0;
        });
        element.className = classes.join(" ").trim();
      }
      else if (element) {
        const elements = [...element];
        elements.forEach((el) => {
          const classes = el.className.split(" ").filter(function (c) {
            return c.lastIndexOf(prefix, 0) !== 0;
          });
          el.className = classes.join(" ").trim();
        })
      }
      // console.log(element.attr("class").match(/[\w-]*contrast[\w-]*/g))
    })

    let n, a = [];

    while (n = walk.nextNode()) {
      const element = n.parentNode;
      if (!a.includes(element) && element.tagName !== "BODY") {

        a.push(element)
        element.classList.remove("font-yellow");
      }
    }

    if (color === "black") {
      background.classList.add("contrast-background-white")
      buttons.forEach((button) => {
        button.classList.add("contrast-button-inverted")
      })
      inputs.forEach((button) => {
        button.classList.add("contrast-black-input")
      })
      if (mask) mask.classList.add("contrast-mask-black")
      if (contentBox) contentBox.classList.add("contrast-contentBox-dark")
      radios.forEach((button) => {
        button.classList.add("contrast-black-radio")
      })
    }

    if (color === "yellow") {
      background.classList.add("contrast-background-white")
      if (mask) mask.classList.add("contrast-mask-black")

      if (logo) logo.classList.add("contrast-yellow-logo")

      if (contentBox) contentBox.classList.add("contrast-contentBox-dark")

      buttons.forEach((button) => {
        button.classList.add("contrast-button-yellow")
      })

      addBorder.forEach((button) => {
        button.classList.add("contrast-yellow-border")
      })

      inputs.forEach((button) => {
        button.classList.add("contrast-yellow-input")
      })
      radios.forEach((button) => {
        button.classList.add("contrast-yellow-radio")
      })

      const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
      let n, a = [];

      while (n = walk.nextNode()) {
        const element = n.parentNode;
        if (!a.includes(element) && element.tagName !== "BODY") {

          a.push(element)
          element.classList.add("font-yellow");
        }
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
          <Header actualPage={this.state.actualPage} resizeClick={this.textResizeClickHandler} contrastClick={this.contrastClickHandler} loginClick={this.loginClickHandler} />
          {/* {visibleArea} */}
          <Switch>
            <Route path="/" exact render={(props) => <LandingPage {...props}
              pageCallback={this.pageCallback}
              textResize={this.textResizeTrigger}
              contrastChange={this.contrastChangeTrigger} />} />

            <Route path="/login" render={(props) => <LoginPage {...props}
              pageCallback={this.pageCallback}
              textResize={this.textResizeTrigger}
              contrastChange={this.contrastChangeTrigger} />} />

            <Route path="/panel/user" render={(props) => <UserPanel {...props}
              pageCallback={this.pageCallback}
              textResize={this.textResizeTrigger}
              contrastChange={this.contrastChangeTrigger} />} />

            <Route path="/panel/institution" render={(props) => <InstPanel {...props}
              pageCallback={this.pageCallback}
              textResize={this.textResizeTrigger}
              contrastChange={this.contrastChangeTrigger} />} />

          </Switch>
        </div>
      </HashRouter>
    );
  }
}


export default App;
