import React, { Component } from 'react';

import Header from './Components/layouts/header';
import Footer from './Components/layouts/footer';
import Routes from './Components/routes';

export default class Nested extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Routes/>
                <Footer/>
            </div>
        )
    }
}
