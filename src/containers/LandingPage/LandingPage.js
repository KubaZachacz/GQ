import React, { Component } from 'react';

import MainContent from '../../components/LandingPage/MainContent/MainContent'
import RightSide from '../../components/LandingPage/MainContent/RightSide/RightSide'
import LeftSide from '../../components/LandingPage/MainContent/LeftSide/LeftSide'

import axios from 'axios'

import { createMap, addMarker, clearMarkers, showAddress, loadGeoJson, findAddress } from '../../components/Map/MapFunctions'

import powiaty from "../../assets/powiaty.json";
// import googleLogo from "../../assets/google.json";
import './LandingPage.scss';

class LandingPage extends Component {
    state = {
        actualSite: 2,
        result: null,
        searchFraze: '',
        marker: null
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
        this.props.contrastChange();
        this.props.pageCallback(this.state.actualSite > 1 ? 0 : 1);
        this.map = createMap();
        const geoJson = loadGeoJson(this.map, powiaty);

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
        this.props.pageCallback(page > 1 ? 0 : 1);

    }

    geocodeClickHandler = async () => {
        const fraze = await findAddress();
        this.setState({
            searchFraze: fraze
        })
    }

    resultOpenedHandler = async (page) => {

        const fraze = this.state.searchFraze;
        // const map = createMap();
        const map = this.map;
        const latLng = await showAddress(map, fraze);
        if (latLng) {
            clearMarkers(this.state.marker);
            const marker = addMarker(map, latLng)
            this.latLng = latLng;
            this.setState({
                marker: marker
            })
            this.findPowiat()
            this.linkClickHandler(1)
        }

    }

    findPowiat = (latLnag) => {
        const google = window.google;
        let powiat = '';
        let mapFeature;
        this.map.data.forEach((feature) => {
            feature.setProperty('isSelected', false);
            const testPoly = new google.maps.Polygon({ paths: feature.getGeometry().getAt(0).getAt(0).getArray() });
            if (google.maps.geometry.poly.containsLocation(this.latLng, testPoly)) {
                powiat = feature.getProperty('jpt_nazwa_');
                // this.map.data.revertStyle();
                // this.map.data.setStyle(feature, {fillColor: '#EF0000'})
                mapFeature = feature;
            }
        })
        mapFeature.setProperty('isSelected', true);
        const lat = this.latLng.lat().toFixed(3);
        const lon = this.latLng.lng().toFixed(3);
        // document.getElementById("powiat").innerText = 'Powiat ' + powiat;

        axios.get(`http://server184749.nazwa.pl:9007/getdata/landing?nazwa=${powiat}&lat=${lat}&lon=${lon}`)
            .then(res => {
                this.setState({
                    result: res.data.dane
                })
            })
    }

    inputTypeHandler = (e) => {
        this.setState({
            searchFraze: e.target.value
        })
    }

    render() {

        return (
            <div className="LandingPage">
                <MainContent>
                    <LeftSide id="LeftSide" actualSite={this.state.actualSite} linkClick={this.linkClickHandler} resultOpened={this.resultOpenedHandler} resultData={this.state.result} />
                    <RightSide fraze={this.state.searchFraze} typeFraze={this.inputTypeHandler} geoClick={this.geocodeClickHandler} searchClick={this.resultOpenedHandler} />
                </MainContent>
            </div>

        );
    }
}
export default LandingPage;