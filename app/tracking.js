import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  TextInput,
  Modal,
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import  mainStyles from './styles';
import mapStyles from './mapStyles';
import Camera from 'react-native-camera';
import renderIf from './renderif';
import Icon from './icon'; 
class trackingScreen extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      lastPosition:'undefined',
      route: [],
      points:[],
      events:[],
      timer:0,
      active:true,
      zoom:false,
      showMap:false,
      mapStyle:mapStyles,
      eventModal:false,
      cameraSwitch:false,
      eventName:'',
      eventDescription:'',
      media:[]
     }
   }        
     takePicture=()=> {
      const options = {};
      //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) =>{
            console.log(data);
            this.state.media.push(data);
          })
          .catch(err => console.error(err));
      }
      
      startRecording = () => {
        if (this.camera) {
          this.camera.capture({mode: Camera.constants.CaptureMode.video})
              .then((data) => {console.log(data);
                this.state.media.push(data);
              })
              .catch(err => console.error(err));
         
          func=()=> {
              let timer=this.state.timer+1;
              console.log(timer);
              this.setState({timer});
              if (!this.state.isRecording) {
                clearInterval(counter);
              }
          }
          counter = setInterval(function() {
            func();

          }, 1000); 
          this.setState({
            isRecording: true
          });
        }
      }

      stopRecording = () => {
        if (this.camera) {
          this.camera.stopCapture();
          this.setState({
            isRecording: false,
            timer:0
          });
          
        }
      }
      formTimer(num) {
        return Math.floor(num / 60) + ' : ' + num % 60;
      }
      deleteMedia=(index)=> {
        let media=this.state.media;
        media.splice(index,1);
        this.setState({media});
      }
    async saveEvent() {
          let point=this.state.points[this.state.points.length-1];
          let event={label:this.state.eventName,description:this.state.eventDescription,point:point};
          let events=this.state.events;
          events.push(event);
          this.setState({events});
          console.log(event);
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
              events:this.state.events,
              path:this.state.points
            })
            }).then((response) => response.json())
                .then((responseJSON) => {
                    console.log(responseJSON);  
                })
                .catch((error) => {
                  return Promise.reject(error);
                });
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
                 this.setState({points});  
                 if (route.length>2) {
                    this.saveRoute().then(function(response) {
                    console.log(response);
                   });
                 }
              }
            });           
         }
         componentWillUnmount = () => {
            navigator.geolocation.clearWatch(this.watchID);
         }
         async saveRoute() {
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
              path:this.state.points
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
                <View style={this.state.eventModal?styles.Overlay:''}></View>
                  <Modal
                  visible={this.state.cameraSwitch}
                  onRequestClose={() => {console.log("Modal has been closed.")}}
                  >
                    <Camera
                        ref={(cam) => {
                          this.camera = cam;
                        }}
                        style={styles.preview}
                        aspect={Camera.constants.Aspect.fill}>                      
                          <TouchableWithoutFeedback onPress={this.takePicture.bind(this)}>                           
                             <View>
                                {renderIf(!this.state.isRecording,
                                <Icon name="Photo" width="50" height="50" fill="#fff"/>
                                 )}  
                              </View>                                   
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback>
                              <View>
                                {renderIf(this.state.isRecording,
                                    <Text style={styles.timer}>{this.formTimer(this.state.timer)}</Text>
                                )}  
                              </View>
                          </TouchableWithoutFeedback>     
                           <TouchableWithoutFeedback onPress={this.startRecording.bind(this)}>                        
                                <View>
                                {renderIf(!this.state.isRecording,
                                  <Icon name="Video" width="50" height="50" fill="#fff"/>
                                   )}
                                </View>                               
                          </TouchableWithoutFeedback>
                           <TouchableWithoutFeedback>
                              <View style={{marginRight:10}}>
                                {renderIf(this.state.isRecording,
                                <Icon name="Rec" width="50" height="50" fill="red"/>
                                )} 
                              </View>                             
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress={this.stopRecording.bind(this)}>                             
                              <View style={{marginRight:10}}>
                                {renderIf(this.state.isRecording,
                                <Icon name="Stop" width="50" height="50" fill="#fff"/>
                                 )}
                              </View>                            
                          </TouchableWithoutFeedback>
                          <TouchableWithoutFeedback onPress={()=>{this.stopRecording.bind(this);this.setState({cameraSwitch:false})}}>
                              <View>
                                 <Icon name="Cancel" width="50" height="50" fill="#fff"/>
                              </View> 
                          </TouchableWithoutFeedback>             
                      </Camera>
                    </Modal>  
                  <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.eventModal}
                    onRequestClose={() => {console.log("Modal has been closed.")}}
                    >
                    <ScrollView>
                      <View style={{ flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center'}}>                      
                       <View style={styles.eventForm}>
                            <Text style={styles.header}>Add new</Text>
                             <TextInput
                                style={styles.input}
                                placeholder="Title"
                                placeholderTextColor="#5e6973"
                                onChangeText={(eventName) => this.setState({eventName})}
                              />
                              <TextInput
                                style={styles.textarea}
                                multiline={true}
                                numberOfLines={3}
                                placeholder="Description"
                                placeholderTextColor="#5e6973"
                                onChangeText={(eventDescription) => this.setState({eventDescription})}                 
                              />
                              {renderIf(this.state.media.length>0,
                                <View style={styles.contentWrapper}>
                                  <Text style={styles.header}>Media</Text>   
                                  <View style={styles.imageContainer}>                                                            
                                    {this.state.media.map(function(file, i){
                                      return(
                                        <View key={i} style={styles.mediaItemWrapper}>
                                            <View style={styles.mediaItem}>
                                              <Image style={styles.mediaImage} source={{uri:file.path}}/>
                                              <TouchableWithoutFeedback onPress={()=>this.deleteMedia(i)}>
                                                <View>
                                                    <Icon name="Cross" width="10" height="10" fill="black"/>
                                                </View>
                                              </TouchableWithoutFeedback>
                                            </View>
                                        </View>
                                      );
                                    },this)}
                                  </View>
                                </View>
                              )}
                              <View style={styles.contentWrapper}>
                                  <TouchableHighlight onPress={()=>this.saveEvent()} style={mainStyles.menuButton}>
                                      <Text style={{color:'white',textAlign:'center'}}>Add event</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight onPress={()=>this.setState({cameraSwitch:true})} style={mainStyles.menuButton}>
                                    <Text style={{color:'white',textAlign:'center'}}>Camera on</Text>
                                  </TouchableHighlight>   
                                  <TouchableHighlight onPress={()=>this.setState({eventModal:false})} style={mainStyles.menuButton}>
                                    <Text style={{color:'white',textAlign:'center'}}>Close</Text>
                                  </TouchableHighlight>  
                              </View>
                        </View>
                      </View>
                     </ScrollView> 
                  </Modal>
                  {renderIf(this.state.lastPosition!='undefined',
                    <View style={styles.mapWrapper}>   
                      <MapView
                          style={{height:300,width:300}}
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
                        <Text style={{width:0,height:0}}>
                          {this.state.lastPosition[0]}, {this.state.lastPosition[1]}
                        </Text>
                     </View>
                     )}
                     {renderIf(this.state.lastPosition=='undefined',
                     <View style={{paddingTop:40,paddingBottom:40,margin:10}}>
                        <Text style={{color:'#ea2e49',fontSize:24,textAlign:'center'}}>Please, switch on geolocation on your device for tracking your route</Text>
                     </View>   
                     )}                           
                    <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
                      <Text style={styles.header}>{this.props.route.name}</Text>
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
  mapWrapper:{
    margin:20,
    borderWidth:2,
    borderColor:'#ea2e49'
  },
  eventForm:{
    zIndex:4,
    width:310,
    marginTop:20,
    backgroundColor:'#eaeaea',
    padding:20,
    borderColor:'#5e6973',
    borderWidth:1
  },
  contentWrapper:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  imageContainer:{
    flex:1,
    flexDirection:'row',
    flexWrap:'wrap',
    alignItems: 'center',
    marginBottom:10
  },
  mediaItemWrapper:{width:120,height:110},
  mediaItem:{flex:1,flexDirection:'row',marginLeft:5},
  mediaImage:{width:100,height:100,marginRight:5},
  preview:{
      flex:1,
      flexDirection:'row',
      alignItems:'flex-end',
      justifyContent:'center',
      position:'absolute',
      zIndex:99,
      top:0,
      bottom:0,
      height:null,
      width:null,
      right:0,
      left:0
  },
  timer:{
    fontSize:24,
    color:'white',
    height:45,
    marginRight:15
  },
  Overlay:{
    backgroundColor:'black',
    position:'absolute',
    top:0,left:0,right:0,bottom:0,
    opacity:0.75,
    zIndex:3
  }
});
export default trackingScreen;