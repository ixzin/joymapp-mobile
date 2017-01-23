import React, { Component } from 'react';
import { Actions,Router, Scene } from 'react-native-router-flux';
import loginScreen from './login';
import mainScreen from './main';
import {
  StyleSheet,
  Text,
  AsyncStorage,
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
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged:false
    }
  }
  render() {
    console.log(this.state.isLogged);
    return <Router 
    scenes={scenes}/>
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