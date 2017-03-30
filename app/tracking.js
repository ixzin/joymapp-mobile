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
               if (route.length>2) {
                  this.saveRoute(route).then(function(response) {
                  console.log(response);
                 });
               }
            });           
         }
         componentWillUnmount = () => {
            navigator.geolocation.clearWatch(this.watchID);
         }  
         async saveRoute(points) {
          let token=await AsyncStorage.getItem('token');
            return fetch('http://teethemes.com:3000/api/routes/'+this.props.route._id,{
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token':token
            },
            body: JSON.stringify({
              type: this.props.route.type,
              name: this.props.route.name,
              owner:this.props.route.owner,
              status:'planned',
              description: this.props.route.description,
              startDate: this.props.route.startDate,
              endDate: this.props.route.endDate,
              path:points
            })
            }).then((response) => response.json())
                .then((responseJSON) => {
                    return Promise.resolve(responseJSON);  
                })
                .catch((error) => {
                  return Promise.reject(error);
                });
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