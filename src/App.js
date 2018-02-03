import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';
import * as firebase from 'firebase';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaGEwMDYiLCJhIjoiY2pkNzVvZjN4MGM2MDJ5bzkwamJob3B1bSJ9.F-UPJyfQ2Ht0u-voxsEKtA'
});

class App extends Component {
  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    );
  }
}

export default App;
