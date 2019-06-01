import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ControlsWidget from './modules/Manipulation/components/ControlsWidget';
import StructureWidget from './modules/Manipulation/components/StructureWidget';
import EditingWidget from './modules/Design/components/EditingWidget';
import PropertiesWidget from './modules/Customization/components/PropertiesWidget';
import PageBar from './modules/IDE/components/PageBar';
import ControllersManager from './modules/Domain/Managers/ControllersManager';
import WidgetsManager from './modules/Domain/Managers/WidgetsManager';

const styles = {
  card: {
    width: '500px',
    margin: '20px',
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this._widgetsManager = new WidgetsManager();
    this._controllersManager = new ControllersManager();
    this._controllersManager.initSubscriptions();
  }

  render() {
    return (
      <div className="App">
        <div className="row">
          <PageBar/>
        </div>
        <div className="row">
          <div className="col-3 App-area">
            <div className="App-subarea">
              <ControlsWidget manager={this._widgetsManager}/>
            </div>
            <div>
              <StructureWidget manager={this._widgetsManager}/>
            </div>
          </div>
          <div className="col-7 App-area">
              <EditingWidget manager={this._widgetsManager}/>
          </div>
          <div className="col-2 App-area">
            <PropertiesWidget manager={this._widgetsManager}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
