import React, { Component } from 'react';
import VCode from './VCode';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'http://img3.3lian.com/2013/c4/93/d/72.jpg',
    };
  }
  render() {
    return (
      <div className="App">
        <VCode
          value={this.state.value}
          onClick={() => {
            console.log('fdsfsf');
            this.setState({
              value: 'http://pic17.nipic.com/20111012/781185_221208647195_2.jpg',
            });
          }}
        />
        <div style={{ padding: '20px' }}></div>
        <VCode />
      </div>
    );
  }
}

export default App;

