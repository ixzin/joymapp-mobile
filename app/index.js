import React, { Component } from 'react';
import { Actions,Router, Scene } from 'react-native-router-flux';
import loginScreen from './login';
import mainScreen from './main';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


const scenes=Actions.create(
  <Scene key="root">
        <Scene key="login"
          hideNavBar={true}
          component={loginScreen}
          title="main"
          initial
        />
        <Scene
          key="main"
          hideNavBar={true}
          component={mainScreen}
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