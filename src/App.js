import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import './App.css';
import * as firebase from 'firebase';
import Location from './utils/Location'

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A'
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

// var userId = firebase.auth().currentUser.uid;
database.ref('/').once('value').then(function(snapshot) {
  console.log(snapshot.val());
});

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      locations: []
    }
  }

  pushLocation() {
    Location.get()
      .then(pos => {
        // push to firebase
        console.log(pos)
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
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
            <Feature coordinates={ [-0.481747846041145, 51.3233379650232] } />
          </Layer>
        </Map>

        <button
          className="App-intro"
          onClick={ this.pushLocation.bind(this) }
        >
          Push location
        </button>
    </div>
    )
  }
}

export default App
