import React, { Component } from 'react';
import * as R from 'ramda';
import * as firebase from 'firebase';
import Location from './utils/Location';
import { toGeoJson } from './utils/GeoJson';
import Map from './Map';
import './App.css';

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
      position: {},
      locations: {}
    };
  }

  componentDidMount() {
    Location.get()
      .then(position => {
        // Push geojson to firebase
        this.setState(
          R.mergeDeepRight(this.state, {
            position
          })
        );
      })
      .catch(err => console.log(err));
    // database.ref('/').once('value').then(snapshot => {
    //   const newState = R.mergeDeepRight(this.state, {
    //     locations: snapshot.val()
    //   });
    //   console.log('Mounted with ', newState);
    //   this.setState(newState);
    // });
    this.rootRef = database.ref('/');
    this.rootRef.on('child_added', data => {
      // console.log('child added for ' + data.key, data.val());
      this.setState(
        R.mergeDeepRight(this.state, {
          locations: { [data.key]: data.val() }
        })
      );
    });
  }

  pushLocation() {
    console.log('Got location', this.state.position);
    if (this.state.position && this.state.position.coords) {
      console.log('Pushing ', toGeoJson(this.state.position));
      database.ref().push().set(toGeoJson(this.state.position));
    } else {
      console.log('No position available');
    }
  }

  render() {
    return (
      <div className="App">
        <button
          className="abuseButton"
          onClick={this.pushLocation.bind(this)}
          content="PUSH LOCATION"
        >
        <div className="abuseButtonText">
        PUSH LOCATION</div>
        </button>
        <Map zoom={[17]} locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
