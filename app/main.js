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
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      showMap:false
     }
   }
    logout() {
      AsyncStorage.clear();
      Actions.login({userId:''});
    }
    getPositions() {
      this.setState({showMap:true});   
    }
     watchID = (null: ?number);
         componentDidMount = () => {
            navigator.geolocation.getCurrentPosition(
               (position) => {
                  var initialPosition = JSON.stringify(position);
                  this.setState({initialPosition});
               },
               (error) => alert(error.message),
               {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
            this.watchID = navigator.geolocation.watchPosition((position) => {
               var lastPosition = JSON.stringify(position);
               this.setState({lastPosition});
            });
         }
         componentWillUnmount = () => {
            navigator.geolocation.clearWatch(this.watchID);
         }
    render() {
    return (
      <View style={mainStyles.container}>
      <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
        {renderIf(this.state.showMap, 
               <View>
                  <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {this.state.initialPosition}
                  </Text>
                  <Text>
                  <Text style={styles.title}>Current position: </Text>
                    {this.state.lastPosition}
                  </Text>
              </View>
        )}
        <TouchableHighlight onPress={() => this.getPositions()} style={mainStyles.Button}>
            <Text style={{color:'white',textAlign:'center'}}>Start tracking</Text>        
        </TouchableHighlight>
        <Text style={styles.welcome}>Hello, {this.props.userId}</Text>        
        <TouchableHighlight onPress={()=>this.logout()} style={mainStyles.Button}>
            <Text style={{color:'white',textAlign:'center'}}>Logout</Text>
        </TouchableHighlight>  
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