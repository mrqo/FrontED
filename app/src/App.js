import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ControlsWidget from './modules/Manipulation/components/ControlsWidget';
import StructureWidget from './modules/Manipulation/components/StructureWidget';
import EditingWidget from './modules/Design/components/EditingWidget';
import PropertiesWidget from './modules/Customization/components/PropertiesWidget';

import ProjectManager from './modules/Domain/Managers/ProjectManager';

const styles = {
  card: {
    width: '500px',
    margin: '20px',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this._projManager = new ProjectManager();
    this._projManager.initSubscriptions();
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <div className="col-3 App-area">
            <div className="App-subarea">
              <ControlsWidget />
            </div>
            <div>
              <StructureWidget />
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
