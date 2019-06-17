import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import MainContent from '../../components/LandingPage/MainContent/MainContent'
import RightSide from '../../components/LandingPage/MainContent/RightSide/RightSide'
import LeftSide from '../../components/LandingPage/MainContent/LeftSide/LeftSide'
import showLocal from '../../components/Map/showLocal'
import loadScript from '../../components/Map/loadScript'
import findAddress from '../../components/Map/findAddress'
import loadGeoJson from '../../components/Map/loadGeoJson'

import powiaty from "../../assets/powiaty.json";
// import googleLogo from "../../assets/google.json";
import './LandingPage.scss';

class LandingPage extends Component {
    state = {
        actualSite: 2,
        location: {
            lat: null,
            lng: null
        }
    }

    componentDidMount = () => {
        // showLocal();
        loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfGjRlQjt9v6WHdQDNh7vgS7l5pntwb8&libraries=places")
    }

    linkClickHandler = (page) => {
        this.setState({
            actualSite: page,
        })
    }

    geocodeClickHandler = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { findAddress(position.coords.latitude, position.coords.longitude) });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    shearchClickHandler = (page) => {
        const fraze = document.getElementById("search-bar").value;
        console.log(fraze);
        const map = showLocal(fraze);
        // console.log(powiaty)

        loadGeoJson(map, powiaty);
        this.linkClickHandler(page);
    }

    render() {

        return (
            <div className="LandingPage">
                <Header actualSite={this.state.actualSite}/>
                <MainContent>
                    <LeftSide actualSite={this.state.actualSite} linkClick={this.linkClickHandler} />
                    <RightSide geoClick={this.geocodeClickHandler} searchClick={this.shearchClickHandler} />
                </MainContent>
            </div>
        );
    }
}
export default LandingPage;