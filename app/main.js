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
import MapView from 'react-native-maps';
import renderIf from './renderif';
import  mainStyles from './styles';
class mainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      route: [],
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
          let route=[];
            navigator.geolocation.getCurrentPosition(
               (position) => {
                  let initialPosition=[position.coords.latitude,position.coords.longitude];
                  this.setState({initialPosition});
               },
               (error) => alert(error.message),
               {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );
            this.watchID = navigator.geolocation.watchPosition((position) => {
               let lastPosition =[position.coords.latitude,position.coords.longitude];                           
               this.setState({lastPosition});
               let positionCoordinate=[{latitude:this.state.lastPosition[0],longitude:this.state.lastPosition[1]}];  
               route=route.concat(positionCoordinate);
              console.log(route);
              this.setState({route});  
            });
              
         }
         componentWillUnmount = () => {
            navigator.geolocation.clearWatch(this.watchID);
         }
    render() {
    return (
      <View style={mainStyles.container}>
      <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
               <View>
                <MapView
                      style={{marginLeft:20,marginRight:20,height:300,width:300}}
                      showsUserLocation={true}
                      initialRegion={{
                        latitude: this.state.lastPosition[0],
                        longitude:this.state.lastPosition[1],
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    >
                        <MapView.Polyline coordinates={this.state.route}/>
                    </MapView>              
                  <Text>
                    <Text style={styles.title}>Initial position: </Text>
                    {this.state.initialPosition[0]},{this.state.initialPosition[1]}
                  </Text>
                  <Text>
                  <Text style={styles.title}>Current position: </Text>
                    {this.state.lastPosition[0]}, {this.state.lastPosition[1]}
                  </Text>
              </View>
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