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

class App extends Component {
  constructor(props) {
    super(props);
    this.pushLocation = this.pushLocation.bind(this);
    this.updateData = this.updateData.bind(this);
    this.state = {
      position: {},
      locations: {},
      loading: true
    };
  }

  componentDidMount() {
    this.database = firebase.database();

    Location.get()
      .then(position => {
        this.setState(
          R.mergeDeepRight(this.state, {
            position,
            loading: false
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

    this.database.ref('/').on('child_added', this.updateData);
  }

  updateData(data) {
    this.setState(
      R.mergeDeepRight(this.state, {
        locations: { [data.key]: data.val() }
      })
    );
  }

  pushLocation() {
    console.log('Got location', this.state.position);
    if (this.state.position && this.state.position.coords) {
      console.log('Pushing ', toGeoJson(this.state.position));
      this.database.ref().push().set(toGeoJson(this.state.position));
    } else {
      console.log('No position available');
    }
  }

  render() {
    return (
      <div>
        <button
          className="App-intro"
          disabled={this.state.loading}
          onClick={this.pushLocation}
          style={{ position: 'absolute', zIndex: 100 }}
        >
          Push location
        </button>
        <Map zoom={[17]} locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
