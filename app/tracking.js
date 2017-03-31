import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import  mainStyles from './styles';
import mapStyles from './mapStyles';
import Camera from 'react-native-camera';
import renderIf from './renderif';
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
      eventModal:false,
      cameraSwitch:false,
      eventName:'',
      eventDescription:''
     }
   }        
     takePicture() {
    const options = {};
    //options.location = ...
      this.camera.capture({metadata: options})
        .then((data) => console.log(data))
        .catch(err => console.error(err));
        this.setState({
            media:data.path 
          })
      }
      startRecording = () => {
        if (this.camera) {
          this.camera.capture({mode: Camera.constants.CaptureMode.video})
              .then((data) => console.log(data))
              .catch(err => console.error(err));
          this.setState({
            isRecording: true,
            media:data.path
          });
        }
      }

      stopRecording = () => {
        if (this.camera) {
          this.camera.stopCapture();
          this.setState({
            isRecording: false
          });
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
         async saveEvent() {
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
                    transparent={true}
                    visible={this.state.eventModal}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                    >
                    {renderIf(this.state.cameraSwitch,
                     <Camera
                        ref={(cam) => {
                          this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <TouchableWithoutFeedback style={styles.actionsCapture} onPress={this.takePicture.bind(this)}>
                           <View>
                              <Text style={{color:'white',textAlign:'center'}}>Capture</Text>
                            </View>         
                        </TouchableWithoutFeedback>
                         <TouchableWithoutFeedback style={styles.actionsCapture} onPress={this.startRecording.bind(this)}>
                            <View>
                              <Text style={{color:'white',textAlign:'center'}}>Start record</Text>
                            </View>  
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.actionsCapture} onPress={this.stopRecording.bind(this)}>
                            <View>
                              <Text style={{color:'white',textAlign:'center'}}>Stop record</Text>
                            </View>  
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback style={styles.actionsCapture} onPress={()=>this.setState({cameraSwitch:false})}>
                            <View>
                              <Text style={{color:'white',textAlign:'center'}}>Cancel</Text>
                            </View> 
                        </TouchableWithoutFeedback>
                      </Camera>
                      )}
                    <View style={{ flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'}}>                      
                     <View style={styles.eventForm}>
                          <Text style={styles.header}>Add new</Text>
                           <TextInput
                              style={styles.input}
                              placeholder="Title"
                              placeholderTextColor="#5e6973"
                              onChangeText={(eventDescription) => this.setState({eventName})}
                            />
                            <TextInput
                              style={styles.textarea}
                              multiline={true}
                              numberOfLines={3}
                              placeholder="Description"
                              placeholderTextColor="#5e6973"
                              onChangeText={(eventDescription) => this.setState({eventDescription})}                 
                            />
                            <View style={styles.contentWrapper}>
                                <TouchableHighlight style={mainStyles.menuButton}>
                                    <Text style={{color:'white',textAlign:'center'}}>Add event</Text>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={()=>this.setState({cameraSwitch:true})} style={styles.pauseButton}>
                                  <Text style={{color:'white',textAlign:'center'}}>Camera on</Text>
                                </TouchableHighlight> 
                                <TouchableHighlight onPress={()=>this.saveEvent()} style={styles.pauseButton}>
                                  <Text style={{color:'white',textAlign:'center'}}>Save</Text>
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
    height:40,
    marginBottom:10
  },
    header:{
    textAlign:'center',
    fontSize:18,
    marginBottom:10,
    color:'#5e6973'
  },
  input:{
   color:'#5e6973',
   height:40,
   borderBottomWidth:1,
   minWidth:200,
   borderColor:'#5e6973',
   textAlign:'left',
   fontSize:18,
   marginTop:0,
   marginBottom:10
  },
  textarea:{
    color:'#5e6973',
    borderColor:'#5e6973',
    borderWidth:1,
    minWidth:200,
    textAlign:'left',
    fontSize:18,
    marginTop:0,
    marginBottom:10
  },
  eventForm:{
    zIndex:3,
    width:300,
    minHeight:400,
    backgroundColor:'#eaeaea',
    padding:20,
  },
  contentWrapper:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  preview:{
      flex:1,
      flexDirection:'row',
      position:'absolute',
      zIndex:99,
      top:0,
      bottom:0,
      height:null,
      width:null,
      right:0,
      left:0
  },
  actionsCapture:{
    position:'absolute',
    zIndex:100,
    bottom:0,
    marginRight:10
  }
});
export default trackingScreen;