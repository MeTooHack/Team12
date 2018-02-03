import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as R from 'ramda';

import Location from './utils/Location';
import { toGeoJson } from './utils/GeoJson';

const Map = ReactMapboxGl({
  doubleClickZoom: false,
  accessToken:
    'pk.eyJ1IjoiaGEwMDYiLCJhIjoiY2pkNzVvZjN4MGM2MDJ5bzkwamJob3B1bSJ9.F-UPJyfQ2Ht0u-voxsEKtA'
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/basic-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        zoom={this.props.zoom}
        center={this.props.center}
      >
        <Layer
          type="heatmap"
          paint={{
            'heatmap-opacity': 0.6,
            'heatmap-intensity': 0.1,
            'heatmap-radius': 40,
            'heatmap-weight': 0.5
          }}
        >
          {R.values(this.props.locations).map((e, i) =>
            <Feature key={i} coordinates={e.geometry.coordinates} />
          )}
        </Layer>
      </Map>
    );
  }
}

export default App;
