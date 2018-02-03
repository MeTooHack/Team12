import React, { Component } from 'react';
import * as R from 'ramda';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as firebase from 'firebase';

import './App.css';
import Location from './utils/Location';
import { toGeoJson } from './utils/GeoJson';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiaGEwMDYiLCJhIjoiY2pkNzVvZjN4MGM2MDJ5bzkwamJob3B1bSJ9.F-UPJyfQ2Ht0u-voxsEKtA'
});

var config = {
  apiKey: 'AIzaSyCAN-ZR-1WKnDx9uP-zOcDkVWFvfXSG0bY',
  authDomain: 'metoo-c6174.firebaseapp.com',
  databaseURL: 'https://metoo-c6174.firebaseio.com',
  projectId: 'metoo-c6174',
  storageBucket: 'metoo-c6174.appspot.com',
  messagingSenderId: '525843351324'
};
firebase.initializeApp(config);

var database = firebase.database();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: {}
    };
  }

  componentDidMount() {
    // database.ref('/').once('value').then(snapshot => {
    //   const newState = R.mergeDeepRight(this.state, {
    //     locations: snapshot.val()
    //   });
    //   console.log('Mounted with ', newState);
    //   this.setState(newState);
    // });
    this.rootRef = database.ref('/');
    this.rootRef.on('child_added', data => {
      console.log('child added for ' + data.key, data.val());
      this.setState(
        R.mergeDeepRight(this.state, {
          locations: { [data.key]: data.val() }
        })
      );
    });
  }

  pushLocation() {
    Location.get()
      .then(position => {
        // Push geojson to firebase
        console.log('Pushing ', toGeoJson(position));
        database.ref().push().set(toGeoJson(position));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state)}
        <button className="App-intro" onClick={this.pushLocation.bind(this)}>
          Push location
        </button>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
          center={[16.327, 56.6875]}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={ [16.327, 56.6875] } />
          </Layer>
        </Map>
      </div>
    );
  }
}

export default App;
