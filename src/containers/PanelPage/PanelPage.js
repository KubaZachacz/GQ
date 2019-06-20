import React, { Component } from 'react';

// import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import Background from '../../hoc/Background/Background'

import './PanelPage.scss';

class PanelPage extends Component {

    componentDidMount = () => {

        this.props.textResize();
        this.props.pageCallback(3);
    }

    render() {
        return (
            <Background>
                <div className="PanelPage">
                    <div className="PanelContent">
                        Siema HENIU
                    </div>
                </div>
            </Background>
        )
    }

}

export default PanelPage;
