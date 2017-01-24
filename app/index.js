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
          title="login"
          initial
        />
        <Scene
          key="main"
          hideNavBar={true}
          component={mainScreen}
          title="main"
        />
      </Scene>
);
class App extends Component {
  constructor(props) {
    super(props);
    AsyncStorage.getItem("userId").then((value) => {
      console.log(value);
    }).done();
  }
  render() {
    //console.log(this.state.user);
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