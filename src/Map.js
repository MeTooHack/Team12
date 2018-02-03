import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as R from 'ramda';

import Location from './utils/Location';
import { toGeoJson } from './utils/GeoJson';

const Map = ReactMapboxGl({
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
        style="mapbox://styles/mapbox/dark-v9"
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        zoom={this.props.zoom}
        center={[11.965245699999999, 57.704194599999994]}
      >
        <Layer type="symbol" layout={{ 'icon-image': 'star-15' }}>
          {R.values(this.props.locations).map((e, i) =>
            <Feature key={i} coordinates={e.geometry.coordinates} />
          )}
        </Layer>
      </Map>
    );
  }
}

export default App;
