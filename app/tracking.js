import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
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
      lastPosition: [0,0],
      route: [],
      active:true,
      zoom:false,
      showMap:false,
      mapStyle:mapStyles,
      eventModal:false
     }
   }        
     watchID = (null: ?number);
         componentDidMount = () => {
          let route=[];
          let points=[];
            this.watchID = navigator.geolocation.watchPosition((position) => {
              if (this.state.active) {
                 let lastPosition =[position.coords.latitude,position.coords.longitude];                           
                 this.setState({lastPosition});
                 let positionCoordinate=[{latitude:this.state.lastPosition[0],longitude:this.state.lastPosition[1]}];  
                 route=route.concat(positionCoordinate);
                 points.push(lastPosition);
                 this.setState({route});  
                 if (route.length>2) {
                    this.saveRoute(points).then(function(response) {
                    console.log(response);
                   });
                 }
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
              status:'active',
              description: this.props.route.description,
              startdate: this.props.route.startdate,
              enddate: this.props.route.startdate,
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
                  <Modal
                    animationType={"fade"}
                    transparent={false}
                    visible={this.state.eventModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    style={{width:300,height:500,padding:20}}
                    >
                    <View style={mainStyles.container}>
                      <Text style={styles.header}>Modal</Text>
                      <View style={styles.eventForm}>
                           <TextInput
                              style={mainStyles.input}
                              placeholder="Title"
                              placeholderTextColor="white"
                              onChangeText={(eventDescription) => this.setState({eventName})}
                            />
                            <TextInput
                              style={mainStyles.textarea}
                              multiline={true}
                              numberOfLines={4}
                              placeholder="Description"
                              placeholderTextColor="white"
                              onChangeText={(eventDescription) => this.setState({eventDescription})}                 
                            />
                            <View>
                                <TouchableHighlight style={mainStyles.menuButton}>
                                    <Text style={{color:'white',textAlign:'center'}}>Add event</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=>this.setState({eventModal:false})} style={styles.pauseButton}>
                                  <Text style={{color:'white',textAlign:'center'}}>Close</Text>
                                </TouchableHighlight>  
                            </View>
                      </View>
                    </View>
                  </Modal>    
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
                  <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                    <TouchableHighlight onPress={()=>this.setState({eventModal:true})} style={mainStyles.menuButton}>
                        <Text style={{color:'white',textAlign:'center'}}>Add event</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>this.setState({active:!this.state.active})} style={this.state.active?mainStyles.menuButton:styles.pauseButton}>
                        <Text style={{color:'white',textAlign:'center'}}>{this.state.active?'Pause':'Resume'}</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>Actions.main({user:this.props.user})} style={mainStyles.menuButton}>
                      <Text style={{color:'white',textAlign:'center'}}>Close</Text>
                    </TouchableHighlight>  
                  </View>
              </View>
            </View>  
        )
    }
}
const styles = StyleSheet.create({
  pauseButton:{
    backgroundColor:'black',
    padding:10,
    zIndex:2,
    width:200,
    height:40
  },
    header:{
    textAlign:'center',
    fontSize:18,
    marginBottom:10,
    color:'black'
  },
  eventForm:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2,
    paddingTop:60,
  }
});
export default trackingScreen;