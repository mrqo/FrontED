import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import CssBaseline from '@material-ui/core/CssBaseline';

import Main from './modules/IDE/pages/Main';
import ElementCard from './modules/IDE/components/ElementCard';
import ControlsBrowser from './modules/IDE/components/ControlsBrowser';
import PageBar from './modules/IDE/components/PageBar';
import ProjectDrawer from './modules/IDE/components/ProjectDrawer';
import DetailsDrawer from './modules/IDE/components/DetailsDrawer';

import Widget from './modules/Common/components/Widget';
import ControlsWidget from './modules/Manipulation/components/ControlsWidget';
import StructureWidget from './modules/Manipulation/components/StructureWidget';
import EditingWidget from './modules/Design/components/EditingWidget';
import PropertiesWidget from './modules/Customization/components/PropertiesWidget';

const styles = {
  card: {
    width: '500px',
    margin: '20px',
  }
}

class App extends Component {
  render() {
    return (
      /*
       <CssBaseline/>
          <ProjectDrawer/>
          {<PageBar/>}
          
          
          {<div style={styles.card}>
            <ControlsBrowser/>
          </div>}
          <DetailsDrawer/>
      */
      <div className="App">
        <div className="row">
          <div className="col-3 App-area">
            <div className="App-subarea">
              <ControlsWidget/>
            </div>
            <div>
              <StructureWidget/>
            </div>
          </div>
          <div className="col-7 App-area">
            <EditingWidget />
          </div>
          <div className="col-2 App-area">
            <PropertiesWidget />
          </div>
        </div>
      </div>

    );
  }
}

export default App;
