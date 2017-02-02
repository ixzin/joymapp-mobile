import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  mainStyles from './styles';
class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     }
   }
  render() {
    return (
      <View style={mainStyles.container}>
      <View style={mainStyles.Mask}></View>
          <Image style={mainStyles.background} source={require('../img/intro.jpg')}/>
            <View style={styles.registerForm}>
            <Text style={mainStyles.header}>Register</Text>
            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  registerForm:{
     flex: 1,
     flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  }
});

export default registerScreen;
