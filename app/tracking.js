import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import  mainStyles from './styles';
import mapStyles from './mapStyles';
class trackingScreen extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      lastPosition: 'unknown',
      route: [],
      zoom:false,
      showMap:false,
      mapStyle:mapStyles
     }
   }        
     watchID = (null: ?number);
         componentDidMount = () => {
          let route=[];
            this.watchID = navigator.geolocation.watchPosition((position) => {
               let lastPosition =[position.coords.latitude,position.coords.longitude];                           
               this.setState({lastPosition});
               let positionCoordinate=[{latitude:this.state.lastPosition[0],longitude:this.state.lastPosition[1]}];  
               route=route.concat(positionCoordinate);
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
                      customMapStyle={this.state.mapStyle }
                    >
                        <MapView.Polyline coordinates={this.state.route} strokeColor="#ea2e49" strokeWidth={2} geodesic={true}/>
                    </MapView>              
                  <Text>
                    {this.state.lastPosition[0]}, {this.state.lastPosition[1]}
                  </Text>
              </View>
            </View>  
        )
    }
}

export default trackingScreen;