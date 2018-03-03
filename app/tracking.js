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
import Parametres from './params';

class trackingScreen extends Component {
  constructor(props) {
    super(props);
    this.mapRef = null;
    this.state = {
      route: this.props.route.path?this.convertPoints(this.props.route.path):[],
      points:this.props.route.path?this.props.route.path:[],
      events:this.props.route.events?this.props.route.events:[],
      timer:0,
      active:true,
      tracking:false,
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

   /*convertPoints*/
   convertPoints(path) {
    let route=[];
      for (let i=0;i<path.length;i++) {
        route[i]={latitude:path[i][0],longitude:path[i][1]};
      }
    return route;
   }

     takePicture=()=> {
      const options = {};
      //options.location = ...
        this.camera.capture({metadata: options})
          .then((data) =>{
            let media=data;
            media.type="photo";
            this.state.media.push(media);
          })
          .catch(err => console.error(err));
      }
      
      startRecording = () => {
        if (this.camera) {
          this.camera.capture({mode: Camera.constants.CaptureMode.video})
              .then((data) => {
                let media=data;
                media.type="video";
                this.state.media.push(media);
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
      async saveEvent(media) {
        let photos,videos;
         if (media.length) {
             let uploadedMedia=await this.uploadMedia(token,media);
             photos=this.getPhotos(uploadedMedia.files);
             videos=this.getVideos(uploadedMedia.files);
          }  
          let point=this.state.points[this.state.points.length-1];
          let event={label:this.state.eventName,description:this.state.eventDescription,point:point,photos:photos,videos:videos};
          let token=await AsyncStorage.getItem('token');                 
          let Data=await this.addEvent(token,event);
          this.setState({
            events:Data.route.events,
            media:[],
            eventModal:false
          }); 
      }
      addEvent(token,event) {
            return fetch(Parametres.apiUrl+'routes/'+this.props.route._id+'/addEvent',{
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token':token
            },
            body: JSON.stringify({
              event:event
            })
            }).then((response) => response.json())
                .then((responseJSON) => {
                  return Promise.resolve(responseJSON);  
                })
                .catch((error) => {
                  return Promise.reject(error);
                });
    }

    async uploadMedia(token,media) {
      let files= new FormData();
      media.forEach(function(item, i, media) {
        let timestamp=new Date();
        let fileIndex=timestamp.getFullYear()+'_'+(+timestamp.getMonth()+1)+'_'+timestamp.getDate()+'-'+timestamp.getHours()+'_'+timestamp.getMinutes()+'_'+timestamp.getSeconds();
        files.append('media', {uri: item.path, name:item.type=='photo'?'photo-'+fileIndex+'_no'+(i+1)+'.jpg':'video-'+fileIndex+'_no'+(i+1)+'.mp4', type:item.type=='photo'?'image/jpg':'video/mp4'});
      });
      return fetch(Parametres.apiUrl+'uploadGallery',{
              method: "post",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type' : 'multipart/form-data',
                  'x-access-token':token
            },
            body:files
            }).then((response) => response.json())
                .then((responseJSON) => {
                  return Promise.resolve(responseJSON);  
                })
                .catch((error) => {
                  return Promise.reject(error);
                });
    }
    getPhotos(media) {
      let photos = media.filter(function(item) {
        return item.mimetype=='image/jpg';
      });
      return photos;
    }
    getVideos(media) {
      let videos = media.filter(function(item) {
        return item.mimetype=='video/mp4';
      });
      return videos;
    }
     watchID = (null: ?number);
         componentDidMount = () => {
          let route=this.state.route;
          let points=this.state.points;
            this.watchID = navigator.geolocation.watchPosition((position) => {
              this.setState({tracking:true});
              if (this.state.active) {
                 let lastPosition =[position.coords.latitude,position.coords.longitude];                  
                 let positionCoordinate=[{latitude:lastPosition[0],longitude:lastPosition[1]}];  
                 route=route.concat(positionCoordinate);
                 points.push(lastPosition);
                 this.setState({route}); 
                 this.setState({points});  
                 if (route.length>=2) {
                    this.mapRef.fitToCoordinates(route, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false });
                    this.saveRoute().then(function(response) {
                    console.log(response);
                   });
                 }
              }
            },(error)=>{
                console.log(error);
            },{ enableHighAccuracy: true,
                distanceFilter: 10
            });
         };
         componentWillUnmount = () => {
            this.setState({route:[]});
            navigator.geolocation.clearWatch(this.watchID);
         }
         async saveRoute() {
          let token=await AsyncStorage.getItem('token');
            return fetch(Parametres.apiUrl+'routes/'+this.props.route._id,{
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
              events:this.state.events,
              status:1,
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
                                  <TouchableHighlight onPress={()=>this.saveEvent(this.state.media)} style={mainStyles.menuButton}>
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
                  {renderIf(this.state.tracking,
                    <View style={styles.mapWrapper}>   
                      <MapView
                          style={{height:Parametres.resolution.height*0.5,width:Parametres.resolution.width*0.85}}
                          showsUserLocation={true}
                          initialRegion={{
                             latitude: this.state.route[0]?+this.state.route[0]['latitude']:null,
                             longitude:this.state.route[0]?+this.state.route[0]['longitude']:null,
                             latitudeDelta: 0.0922,
                             longitudeDelta: 0.0421,
                           }}
                          ref={(ref) => { this.mapRef = ref }}
                          customMapStyle={this.state.mapStyle }
                        >
                            <MapView.Polyline coordinates={this.state.route} strokeColor="#ea2e49" strokeWidth={2} geodesic={true}/>
                        </MapView>
           
                     </View>
                     )}
                     {renderIf(!this.state.tracking,
                     <View style={{paddingTop:40,paddingBottom:40,margin:10}}>
                        <Image style={{width:50,height:50}} source={require('../img/loader.gif')}/>
                        <Text style={{color:'#ea2e49',fontSize:16,textAlign:'center'}}>Map is loading. It could take some time. Geolocation must be turned on for your device</Text>
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
                      <TouchableHighlight onPress={()=>{Actions.main({user:this.props.user});this.setState({active:false,tracking:false})}} style={mainStyles.menuButton}>
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