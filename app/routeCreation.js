import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import  mainStyles from './styles';
class routeCreationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     }
   }
    render() {
    return (
      <View>
        <Text>Hello world!!!</Text>
      </View>
      )  
  }
}

  export default routeCreationScreen;     