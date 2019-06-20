import React, { Component } from 'react';

import MainContent from '../../components/LandingPage/MainContent/MainContent'
import RightSide from '../../components/LandingPage/MainContent/RightSide/RightSide'
import LeftSide from '../../components/LandingPage/MainContent/LeftSide/LeftSide'

import { createMap, showAddress, loadGeoJson, findAddress } from '../../components/Map/MapFunctions'

import powiaty from "../../assets/powiaty.json";
// import googleLogo from "../../assets/google.json";
import './LandingPage.scss';

class LandingPage extends Component {
    state = {
        actualSite: 2,
        location: {
            lat: null,
            lng: null
        },

    }

    map = null;
    latLng = null;

    componentDidMount = () => {
        // console.log(this.state.scriptLoaded)
        // if (!this.state.scriptLoaded) {
        //     loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCyfGjRlQjt9v6WHdQDNh7vgS7l5pntwb8&libraries=places")
        //     this.setState({scriptLoaded:true})
        // }
        this.props.textResize();
        this.props.pageCallback(this.state.actualSite>1?0:1);

    }

    componentDidUpdate(prevProps) {
        
        // will be true
        // const locationChanged = this.props.location !== prevProps.location;

        // this.fixSideSize();
        // INCORRECT, will *always* be false because history is mutable.
    }



    linkClickHandler = (page) => {
        this.setState({
            actualSite: page,
        })
        // this.props.pageCallback(page)
        console.log(page)
        this.props.pageCallback(page>1?0:1);
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
        // const map = showLocal(fraze);
        const map = createMap();
        const latLng = await showAddress(map, fraze);
        this.map = map;
        this.latLng = latLng;
        this.linkClickHandler(page);
        const geoJson = await loadGeoJson(map, powiaty);
        window.google.maps.event.addListenerOnce(map, 'idle', () => {
            setTimeout(this.findPowiat, 500)
        });
    }

    findPowiat = () => {
        const google = window.google;
        this.map.data.forEach((feature) => {
            const testPoly = new google.maps.Polygon({ paths: feature.getGeometry().getAt(0).getAt(0).getArray() });
            if (google.maps.geometry.poly.containsLocation(this.latLng, testPoly)) {
                // console.log(feature.getProperty('jpt_nazwa_'));
                // alert('powiat '+feature.getProperty('jpt_nazwa_'));
                document.getElementById("powiat").innerText = 'Powiat ' + feature.getProperty('jpt_nazwa_');
            }
        })
    }


    render() {

        return (
            <div className="LandingPage">
                <MainContent>
                    <LeftSide id="LeftSide" actualSite={this.state.actualSite} linkClick={this.linkClickHandler} />
                    <RightSide geoClick={this.geocodeClickHandler} searchClick={this.shearchClickHandler} />
                </MainContent>
            </div>

        );
    }
}
export default LandingPage;