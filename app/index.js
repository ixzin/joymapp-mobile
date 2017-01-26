import React, { Component } from 'react';
import { Actions,Router, Scene } from 'react-native-router-flux';
import  introScreen from './intro';
import loginScreen from './login';
import mainScreen from './main';

import {
  StyleSheet,
  Text,
  AsyncStorage,
  View
} from 'react-native';


class App extends Component {
    componentWillMount(){
        self = this;
        AsyncStorage.getItem('userId')
        .then( (value) =>{
            if (value != null){
              this.setState({
                logged: true,
                user:value
              });
            } else{
              this.setState({
                logged: false,
              })
            }
          }
        );
  };

  render() {
    return (<Router>
      <Scene key="root">
      <Scene key="intro"
          hideNavBar={true}
          component={introScreen}
          title="intro"
        />
        <Scene key="login"
          hideNavBar={true}
          component={loginScreen}
          title="login"
        />
        <Scene
          key="main"
          hideNavBar={true}
          component={mainScreen}
          title="main"
        />
      </Scene>
      </Router>
      )
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