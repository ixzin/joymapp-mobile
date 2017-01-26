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

class introScreen extends Component {
	componentWillMount(){
        AsyncStorage.getItem('userId')
        .then( (value) =>{
            if (value != null){
              Actions.main({userId:value,type:'reset'});
            } else{
              Actions.login({type:'reset'});
            }
        
        });
  };
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.Mask}></View>
          <Image style={styles.background} source={require('../img/intro.jpg')}/>
      </View>
      )
	}
}
const styles = StyleSheet.create({
  background:{
    flex:1,
    position:'absolute',
    zIndex:0,
    top:0,
    bottom:0,
    right:0,
    left:0
  },
  Mask:{
    backgroundColor:'black',
    position:'absolute',
    top:0,left:0,right:0,bottom:0,
    opacity:0.5,
    zIndex:1
  }
  });

export default introScreen;