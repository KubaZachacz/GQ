import React, { Component } from 'react';

import MainContent from '../../components/LandingPage/MainContent/MainContent'
import RightSide from '../../components/LandingPage/MainContent/RightSide/RightSide'
import LeftSide from '../../components/LandingPage/MainContent/LeftSide/LeftSide'

import axios from 'axios'

import { createMap, showAddress, loadGeoJson, findAddress } from '../../components/Map/MapFunctions'

import powiaty from "../../assets/powiaty.json";
// import googleLogo from "../../assets/google.json";
import './LandingPage.scss';
import { throwStatement } from '@babel/types';

class LandingPage extends Component {
    state = {
        actualSite: 2,
        location: {
            lat: null,
            lng: null
        },
        result: null
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
        this.props.pageCallback(this.state.actualSite > 1 ? 0 : 1);

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
        }, ()=>{
            if(page === 1) {
                setTimeout(this.resultOpenedHandler, 800);
            }
        })
        // this.props.pageCallback(page)
        this.props.pageCallback(page > 1 ? 0 : 1);

    }

    geocodeClickHandler = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => { findAddress(position.coords.latitude, position.coords.longitude) });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    resultOpenedHandler = async (page) => {

        const fraze = document.getElementById("search-bar").value;
        const map = createMap();
        this.map = map;
        const latLng = await showAddress(map, fraze);

        this.latLng = latLng;
        const geoJson = await loadGeoJson(map, powiaty);

        window.google.maps.event.addListenerOnce(map, 'idle', () => {
            setTimeout(() => { this.findPowiat() }, 1200);
        });
    }


    findPowiat = (latLnag) => {
        const google = window.google;
        let powiat = '';
        this.map.data.forEach((feature) => {
            const testPoly = new google.maps.Polygon({ paths: feature.getGeometry().getAt(0).getAt(0).getArray() });
            if (google.maps.geometry.poly.containsLocation(this.latLng, testPoly)) {
                powiat = feature.getProperty('jpt_nazwa_');
            }
        })
        // document.getElementById("powiat").innerText = 'Powiat ' + powiat;
        axios.get(`http://server184749.nazwa.pl:9007/getdata/powiat/?nazwa=${powiat}&lat=${this.latLng.lat()}&lon=${this.latLng.lng()}`)
            .then(res => {
                this.setState({
                    result: res.data.data
                })

            })
    }


    render() {

        return (
            <div className="LandingPage">
                <MainContent>
                    <LeftSide id="LeftSide" actualSite={this.state.actualSite} linkClick={this.linkClickHandler} resultOpened={this.resultOpenedHandler} resultData={this.state.result} />
                    <RightSide geoClick={this.geocodeClickHandler} searchClick={this.linkClickHandler} />
                </MainContent>
            </div>

        );
    }
}
export default LandingPage;