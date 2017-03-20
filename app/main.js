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
    this.mapRef = null;
    this.state = {
      lastPosition: 'unknown',
      route: [],
      zoom:false,
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
          const circumference = (40075 / 360) * 1000;
          let setCenter=function(data) {
            let longitudes=[];
            let latitudes=[];
            for (let i=0;i<data.length;i++) {
              longitudes.push(data[i].longitude);
              latitudes.push(data[i].latitude);
            }
            let longMin =  Math.min.apply(null,longitudes);
            let longMax =  Math.max.apply(null,longitudes);
            let latMin = Math.min.apply(null,latitudes);
            let latMax = Math.max.apply(null,latitudes);
            
            let longitudeDelta = 1 / (Math.cos(longMax - longMin) * circumference)
            let latitudeDelta = 1 / (Math.cos(latMax - latMin) * circumference)
            let delta=[longitudeDelta,latitudeDelta];
            return delta;
          }
            this.watchID = navigator.geolocation.watchPosition((position) => {
               let lastPosition =[position.coords.latitude,position.coords.longitude];                           
               this.setState({lastPosition});
               let positionCoordinate=[{latitude:this.state.lastPosition[0],longitude:this.state.lastPosition[1]}];  
               route=route.concat(positionCoordinate);
                if (route.length>=2){
                  let zoom=setCenter(route);
                  this.setState({zoom});
                }
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
                      ref={(ref) => { this.mapRef = ref }}
                      onLayout = {() => this.mapRef.fitToCoordinates(this.state.route, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
                    >
                        <MapView.Polyline coordinates={this.state.route} strokeColor="#ea2e49" strokeWidth={2} geodesic={true}/>
                    </MapView>              
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