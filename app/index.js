import React, { Component } from 'react';
import { Actions,Router, Scene } from 'react-native-router-flux';
import  scenes from './scenes';


import {
  StyleSheet,
  Text,
  AsyncStorage,
  View
} from 'react-native';


class App extends Component {
  render() {
    return(
      <Router scenes={scenes}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default App;