import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  View
} 
from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import  mainStyles from './styles';

class introScreen extends Component {
	componentWillMount(){
        AsyncStorage.getItem('user')
        .then( (value) =>{
            if (value != null){
              let userObj=JSON.parse(value);
              Actions.main({user:userObj});
            } else{
              Actions.login({type:'reset'});
            }
        });
  };
  render() {
    return (
      <View style={mainStyles.container}>
          <Image style={mainStyles.background} source={require('../img/intro.jpg')}/>
      </View>
      )
	}
}

export default introScreen;