import React, { Component } from 'react';
import { Actions,Router, Scene } from 'react-native-router-flux';
import mainScreen from './main';
import profileScreen from './profile';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


const scenes=Actions.create(
  <Scene key="root">
        <Scene key="main"
          hideNavBar={true}
          component={mainScreen}
          title="main"
          initial
        />
        <Scene
          key="profile"
          hideNavBar={true}
          component={profileScreen}
          title="profile"
        />
      </Scene>
);
const App = () => {
  return <Router 
  scenes={scenes}/>
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