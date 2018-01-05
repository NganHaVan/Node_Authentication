import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';

import Nested from './Nested';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nested/>
      </BrowserRouter>
    );
  }
}

export default App;
