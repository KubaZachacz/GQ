import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import MainContent from '../../components/LandingPage/MainContent/MainContent'
import RightSide from '../../components/LandingPage/MainContent/RightSide/RightSide'
import LeftSide from '../../components/LandingPage/MainContent/LeftSide/LeftSide'
import loadScript from '../../components/Map/loadScript'
import {createMap, showAddress, loadGeoJson, findAddress} from '../../components/Map/MapFunctions'

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

    map = null;
    latLng = null;

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

    shearchClickHandler = async (page) => {
        const fraze = document.getElementById("search-bar").value;
        console.log(fraze);
        // const map = showLocal(fraze);
        const map = createMap();
        const latLng = await showAddress(map, fraze);
        console.log(latLng)
        this.map = map;
        this.latLng = latLng;
        // console.log(powiaty)
        this.linkClickHandler(page);
        const geoJson = await loadGeoJson(map, powiaty);
        console.log(geoJson)
        window.google.maps.event.addListenerOnce(map, 'idle', ()=>{
            // this.pizdaHandler();
            console.log("loaded")
        });
    }

    pizdaHandler = () => {
        const google = window.google;
        console.log(this.latLng)
        this.map.data.forEach((feature)=>{
            const testPoly = new google.maps.Polygon( { paths:feature.getGeometry().getAt(0).getAt(0).getArray() } );
            if ( google.maps.geometry.poly.containsLocation(this.latLng, testPoly) ) {
                // console.log(feature.getProperty('jpt_nazwa_'));
                // alert('powiat '+feature.getProperty('jpt_nazwa_'));
                document.getElementById("powiat").innerText = 'Powiat '+feature.getProperty('jpt_nazwa_');
            // This works now, still have to loop through the arrays for the multipolygons
            }
        })

    }

    render() {

        return (
            <div className="LandingPage">
                <Header actualSite={this.state.actualSite}/>
                <MainContent>
                    <LeftSide actualSite={this.state.actualSite} linkClick={this.linkClickHandler} />
                    <RightSide geoClick={this.geocodeClickHandler} searchClick={this.shearchClickHandler} />
                </MainContent>
                <button onClick={this.pizdaHandler}>Powiat</button>
            </div>

        );
    }
}
export default LandingPage;