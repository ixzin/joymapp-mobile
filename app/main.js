import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import renderIf from './renderif';
import  mainStyles from './styles';
class mainScreen extends Component {
  
    logout() {
      AsyncStorage.clear();
      Actions.login({user:''});
    }
    render() {
    return (
      <View style={mainStyles.container}>
        <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
        <View>
          <TouchableHighlight onPress={Actions.tracking} style={mainStyles.Button}>
              <Text style={{color:'white',textAlign:'center'}}>Start tracking</Text>        
          </TouchableHighlight>     
          <View>
            <Image style={{width:50,height:50}} source={{uri: 'http://teethemes.com:3000/'+this.props.user.image}}/>
            <Text>{this.props.user.firstname}&nbsp;{this.props.user.lastname} </Text>
          </View>
          <TouchableHighlight onPress={()=>this.logout()} style={mainStyles.Button}>
              <Text style={{color:'white',textAlign:'center'}}>Logout</Text>
          </TouchableHighlight>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'black',
  }
});

export default mainScreen;