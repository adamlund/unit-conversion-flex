import React, { Component, Fragment } from 'react';
import UnitConversion from './conversion.component';
import './app.css';

class App extends Component {
    render() {
      return (
        <Fragment>
          <h1>Temperature Conversion</h1>
          <UnitConversion />
        </Fragment>
      );
    }
}

export default App;
