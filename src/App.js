import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import * as firebase from 'firebase';

import './App.css';
import Location from './utils/Location'
import { toGeoJson } from './utils/GeoJson'

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

database.ref().push().set({
  username: 'hej',
  email: 'hej@hej.com'
});

// var userId = firebase.auth().currentUser.uid;
database.ref('/').once('value').then(function(snapshot) {
  console.log(snapshot.val());
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: []
    };
  }

  pushLocation() {
    Location.get()
      .then(pos => {
        // push to firebase
        console.log(pos)

        const geoJson = toGeoJson(pos)

        console.log(geoJson)
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <button
          className="App-intro"
          onClick={ this.pushLocation.bind(this) }
        >
          Push location
        </button>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
          <Layer
            type="symbol"
            id="marker"
            layout={{ 'icon-image': 'marker-15' }}
          >
            <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
            <Feature coordinates={[56.6875, 16.327]} />
            <Feature coordinates={[16.327, 56.6875]} />
          </Layer>
        </Map>
      </div>
    );
  }
}

export default App;
