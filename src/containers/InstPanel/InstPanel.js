import React, { Component } from 'react';
import axios from 'axios';
// import Button from '../../components/UI/Button/Button'
// import { Link } from 'react-router-dom'
import Background from '../../hoc/Background/Background'
import SearchBar from '../../components/UI/SearchBar/SearchBar'
import Map from '../../components/Map/Map';
import Legend from '../../components/Map/Legend/Legend';

import PanelBlock from '../../components/UserPanel/PanelBlock/PanelBlock'
import CalculatorUser from '../../components/UserPanel/CalculatorUser/CalculatorUser'
import CalcResult from '../../components/UserPanel/CalcResult/CalcResult'

import { createMap, addMarker, clearMarkers, showAddress, loadGeoJson, findAddress } from '../../components/Map/MapFunctions'

import Loader from 'react-loader-spinner'

import powiaty from "../../assets/powiaty.json";
import blueMarker from "../../assets/blue-dot.png";



import './InstPanel.scss';
import { async } from 'q';

const searchStyle = {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

const MAP_HEIGHT = 300;

class InstPanel extends Component {
    state = {
        result: [],
        searchFraze: '',
        resultText: null,
        powierzchniaUser: '',
        cenaUser: '',
        isResult: true,
        isCalculated: false,
        marker: null,
        stationMarker: null,
        legendDisplay: false,
        mapStyle: { width: '80%', height: `${MAP_HEIGHT}px` },
        mapResized: false,
        addListener: true
    }

    map = null;

    componentDidMount = () => {
        this.props.pageCallback(3);
        this.map = createMap();
        loadGeoJson(this.map, powiaty);
    }

    componentDidUpdate = () => {
        this.props.textResize();
        this.props.contrastChange();
        if (this.state.addListener) {
            this.addMapClickHandler();
            this.setState({
                addListener: false,
            })
        }
    }

    addMapClickHandler = () => {
        const google = window.google;
        google.maps.event.addListener(this.map, 'click', (event) => {
            this.displayAddres(event.latLng);
        });

    }

    map = null;
    latLng = null;

    geocodeClickHandler = async () => {
        const fraze = await findAddress();
        this.setState({
            searchFraze: fraze,

        })
    }

    resultOpenedHandler = async () => {

        const fraze = this.state.searchFraze;
        const map = this.map;
        const latLng = await showAddress(map, fraze);
        if (latLng) this.displayAddres(latLng);
    }

    displayAddres = async (latLng) => {
        const map = this.map;
        clearMarkers(this.state.marker);
        const marker = addMarker(map, latLng)
        this.latLng = latLng;
        this.setState({
            marker: marker,
            // resultText: text,
            legendDisplay: true,
            isResult: false
        })

        this.findPowiat()
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
                mapFeature = feature;
            }
        })
        mapFeature.setProperty('isSelected', true);
        const lat = this.latLng.lat().toFixed(3);
        const lon = this.latLng.lng().toFixed(3);
        // document.getElementById("powiat").innerText = 'Powiat ' + powiat;

        axios.get(`http://server184749.nazwa.pl:9007/getdata/powiat?nazwa=${powiat}&lat=${lat}&lon=${lon}`)
            .then(res => {
                const text = this.setStationMarker(res.data.dane)
                let resArr = this.state.result;
                resArr.push(res.data.dane);
                this.setState({
                    result: resArr,
                    isResult: true,
                })

            })
    }

    fakeData = {
        nazwa_teryt: 'Gdańsk',
        stan_ludnosci: 100101,
        cena_pradu: '10,99',
        zuzycie_energii_na_mieszkanca: 99,
        ilosc_azbestu: 69,
        avg_GHI: 50,
        procent_bezchmurnych_dni: 5,
        siła_wiatru: 7,
        kierunek_wiatru: 'WE',
        zapylenie: {
            P10: 10,
            P25: 25,
        }
    }

    formResult = (resultData, id) => {
        console.log(resultData)
        const resultText = <PanelBlock key={id}>
            <button className="delete-btn" onClick={() => { this.removeResult(id) }}><i className="far fa-times-circle"></i></button>
            <h3>Powiat {resultData.nazwa_teryt}</h3>
            <div className="result-set">
                <p className="single-result">
                    <i className="fas fa-user-friends"></i> Liczba mieszkańców:<br /><span>{(resultData.stan_ludnosci / 1000).toFixed(0)}</span>tys.
                </p>
                <p className="single-result">
                    <i className="fas fa-money-bill-wave"></i> Cena energii elektrycznej:<br /><span>{parseFloat(resultData.cena_pradu.replace(',', '.')).toFixed(2)}</span> zł
                </p>
                <p className="single-result">
                    <i className="far fa-lightbulb"></i> Średnie zużycie energii na mieszkańca:<br /><span>{resultData.zuzycie_energii_na_mieszkanca}</span> kWh
                </p>
                <p className="single-result">
                    <i className="fas fa-house-damage"></i> Ilość azbestu:<br /><span>{(resultData.ilosc_azbestu / 1000).toFixed(2)}</span> ton
                </p>
                <p className="single-result">
                    <i className="fas fa-sun"></i> Nasłonecznienie:<br /><span>{resultData.avg_GHI.toFixed(2)}</span> Wh/m2
                </p>
                <p className="single-result">
                    <i className="fas fa-cloud-sun"></i> Pochmurne dni:<br /><span>{resultData.procent_bezchmurnych_dni.toFixed(2)}</span> %
                </p>
                <p className="single-result">
                    <i className="fas fa-wind"></i> Siła wiatru:<br /><span>{resultData.siła_wiatru.toFixed(2)}</span> m/s
                </p>
                <p className="single-result">
                    <i className="far fa-compass"></i> Kierunek wiatru:<br /><span>{resultData.kierunek_wiatru}</span>
                </p>
                <p className="single-result">
                    <i className="fas fa-smog"></i> Pyły:<br />P2,5 <span>{resultData.zapylenie.P25.toFixed(2)}</span> ug/m3<br />P10 <span>{resultData.zapylenie.P10.toFixed(2)}</span> ug/m3
                </p>

            </div>
        </PanelBlock>
        return resultText
    }

    removeResult = (id) => {
        const resArr = [...this.state.result];
        const removed = resArr.splice(id, 1);
        this.setState({
            result: resArr
        })

    }

    setStationMarker = (resultData) => {
        const stationLatLng = { lat: parseFloat(resultData.zapylenie.lat_stacji), lng: parseFloat(resultData.zapylenie.lon_stacji) }
        clearMarkers(this.state.stationMarker);
        const stationMarker = addMarker(this.map, stationLatLng, 'Stacja pomiarowa', blueMarker);
        this.setState({
            stationMarker: stationMarker
        })
    }

    inputTypeHandler = (e) => {
        this.setState({
            searchFraze: e.target.value
        })
    }

    inputPowierzchniaHandler = (e) => {
        this.setState({
            powierzchniaUser: e.target.value
        })
    }

    inputCenaHandler = (e) => {
        this.setState({
            cenaUser: e.target.value
        })
    }

    calculateClickHandler = () => {
        this.setState({
            isCalculated: true,
        })
    }

    resizeMapHandler = () => {
        if (!this.state.mapResized) {
            const resizedVal = MAP_HEIGHT * 2;
            let mapStyle = this.state.mapStyle;
            mapStyle.height = `${resizedVal}px`;
            this.setState({
                mapStyle: mapStyle,
                mapResized: true
            })
        }
        else {
            let mapStyle = this.state.mapStyle;
            mapStyle.height = `${MAP_HEIGHT}px`;
            this.setState({
                mapStyle: mapStyle,
                mapResized: false
            })
        }

    }

    render() {
        // const calcResult = this.state.isCalculated === true ? <PanelBlock><CalcResult pannels={100} price={9000} time={'25 lat'} /></PanelBlock> : null;
        // const calculator = this.state.isResult === true ? <PanelBlock><CalculatorUser powierzchniaChange={this.inputPowierzchniaHandler} cenaChange={this.inputCenaHandler} calcClick={this.calculateClickHandler} /></PanelBlock> : null;

        const loader = !this.state.isResult ? <PanelBlock>
            <div className="loader-wrap">
                <Loader
                    type="ThreeDots"
                    color="#f7f8f9"
                    height="50"
                    width="50" />
            </div>
        </PanelBlock> : null

        console.log(this.state.result);
        // const resultOutput = this.state.result.map((value, id) => this.formResult(value, id));
        const resultOutput = this.formResult(this.fakeData, 1);


        return (
            <Background>
                <div className="UserPanel contentBox">
                    {/* <aside>
                        <nav>

                        </nav>
                    </aside> */}
                    <div className="PanelContent">
                        <h2>Wyszukaj miejsce</h2>
                        <SearchBar style={searchStyle} fraze={this.state.searchFraze} typeFraze={this.inputTypeHandler} geoClick={this.geocodeClickHandler} searchClick={this.resultOpenedHandler} />
                        <Map mapStyle={this.state.mapStyle} resizeMap={this.resizeMapHandler} ><Legend display={this.state.legendDisplay} /></Map>

                        {resultOutput}
                        {loader}
                        {/* {calculator}
                        {calcResult} */}
                    </div>
                </div>
            </Background>
        )
    }

}

export default InstPanel;
