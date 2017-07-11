import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Picker,
  TextInput,
  ScrollView,
  Linking,
  Switch,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import renderIf from './renderif';
import Icon from './icon'; 
import  mainStyles from './styles';
import MapView from 'react-native-maps';
import mapStyles from './mapStyles';
import Parametres from './params';

class routeScreen extends Component {
  constructor(props) {
    super(props);
    let currentDate=new Date();
    let formatCurrentDate=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
    this.mapRef = null;
    this.state={
      editMode:false,
      name:this.props.route.name,
      type:this.props.route.type,
      route:this.transformToPath(this.props.route.path),
      mapStyle:mapStyles,
      events:this.props.route.events?this.props.route.events:[],
      description:this.props.route.description,
      status:this.props.route.status,
      avatar:this.props.route.thumb,
      dateNow:formatCurrentDate,
      startDate:this.props.route.startdate.split('T')[0],
      endDate:this.props.route.enddate.split('T')[0],
      formattedStartDate:this.dateConvert(this.props.route.startdate),
      formattedEndDate:this.dateConvert(this.props.route.enddate)
    }
  }
  dateConvert(date) {
    let options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    let fullDate=new Date(date);
    return fullDate.toLocaleDateString('en-US', options);
  }
  transformToPath=(path)=>{   
    if (path.length>=2) {
      let route=[];
      for (let i=0;i<path.length;i++) {
        route[i]={latitude:path[i][0],longitude:path[i][1]};
      }
    return route;
    } else {
      return null;
    }
  }
  facebookShareLink=()=> {
    const FBSDK = require('react-native-fbsdk');
    const {
      ShareDialog
    } = FBSDK;
    let link=Parametres.url+'routes/'+this.props.route._id;
    const shareLinkContent = {
         contentType: 'link',
        contentUrl:link,
        contentDescription: this.props.route.description,
    };
    this.state = {shareLinkContent: shareLinkContent,};
    let tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
        function(canShow) {
          if (canShow) {
            return ShareDialog.show(tmp.state.shareLinkContent);
          }
        }
      ).then(
        function(result) {
          if (result.isCancelled) {
            console.log('Share cancelled');
          } else {
            console.log('Share success with postId: ' + result.postId);
          }
        },
        function(error) {
          console.log('Share fail with error: ' + error);
        }
      );
  }
  twitterShareLink=()=>{
    let link=Parametres.url+'routes/'+this.props.route._id;
    let url='http://www.twitter.com/share?url='+link;
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  }
  async goToRoute() {
      let token=await AsyncStorage.getItem('token');
      let userFromStorage=await AsyncStorage.getItem('user');
      let user=JSON.parse(userFromStorage);
      Actions.tracking({type:'reset',route:this.props.route,user:user});
    }
  async updateRoute() {
      let token=await AsyncStorage.getItem('token');
            return fetch(Parametres.apiUrl+'routes/'+this.props.route._id,{
              method: 'PUT',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'x-access-token':token
            },
            body: JSON.stringify({
              type: this.state.type,
              name: this.state.name,
              owner:this.props.route.owner,
              status:this.state.status,
              thumb:this.state.avatar,
              description: this.state.description,
              startdate: this.state.startDate,
              enddate: this.state.endDate,
              events:this.props.route.events,
              path:this.props.route.path
            })
            }).then((response) => response.json())
                .then((responseJSON) => {
                    console.log(responseJSON);  
                })
                .catch((error) => {
                  return Promise.reject(error);
                });

  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={mainStyles.container}>
          <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
          <ScrollView>
                 <View  style={{position:'absolute',top:20,left:20}}>
                    <Text style={styles.text}>{Parametres.statuses[this.state.status]}</Text>
                 </View>
            <TouchableWithoutFeedback onPress={()=>this.setState({editMode:!this.state.editMode})}>
                <View  style={{position:'absolute',top:20,right:20}}>
                    <Icon name="Edit" width="20" height="20" fill={this.state.editMode?'#ea2e49':'black'}/>
                </View>  
              </TouchableWithoutFeedback>
            <View style={styles.contentWrapper}>            
              <Image style={{width:150,height:150,borderRadius:75}} source={{uri: this.state.avatar?(Parametres.url+'data/routes/'+this.props.route._id+'/'+this.state.avatar):(Parametres.url+'img/avatar.png')}}/>
              {renderIf(!this.state.editMode, 
                <View>
                  <Text style={styles.header}>{this.state.name}</Text>
                  <Text style={{color:'black',textAlign:'center',marginBottom:10}}>{this.state.formattedStartDate}&mdash;{this.state.formattedEndDate}</Text>
                  {renderIf(this.props.route.path.length!=0, 
                     <MapView
                        style={{height:Parametres.resolution.height*0.5,width:Parametres.resolution.width*0.85,marginBottom:10}}                         
                        ref={(ref) => { this.mapRef = ref }}
                        onLayout = {() => this.mapRef.fitToCoordinates(this.state.route, { edgePadding: { top: 10, right: 10, bottom: 10, left: 10 }, animated: false })}
                        customMapStyle={this.state.mapStyle}>
                          <MapView.Polyline coordinates={this.state.route} strokeColor="#ea2e49" strokeWidth={2} geodesic={true}/>
                          {this.state.events.map((marker,i) => (
                            <MapView.Marker
                              coordinate={{latitude:marker.point[0],longitude:marker.point[1]}}
                              title={marker.label}
                              description={marker.description}
                              image={require('../img/marker.png')}
                              key={i}
                            />
                          ))}
                    </MapView>
                  )}
                  <Text style={styles.text}>{this.state.description}</Text>
                  <View style={styles.contentWrapper}>
                    <TouchableHighlight onPress={()=>this.facebookShareLink()} style={styles.facebookButton}>
                        <View>
                            <Icon name="Facebook" width="20" height="20" fill="#fff"/>
                            <Text style={{color:'white',textAlign:'center',position:'absolute',paddingLeft:30}}>Facebook share</Text>
                        </View>
                    </TouchableHighlight>    
                    <TouchableHighlight onPress={()=>this.twitterShareLink()} style={styles.twitterButton}>
                        <View>
                            <Icon name="Twitter" width="20" height="20" fill="#fff"/>
                            <Text style={{color:'white',textAlign:'center',position:'absolute',paddingLeft:30}}>Twitter share</Text>
                        </View>
                    </TouchableHighlight>      
                    <TouchableHighlight onPress={()=>this.goToRoute()} style={mainStyles.Button}>
                      <Text style={{color:'white',textAlign:'center'}}>Go!</Text>
                    </TouchableHighlight>        
                  </View>
                </View>
              )}
              {renderIf(this.state.editMode, 
                <View>
                    <TextInput
                        value={this.state.name}
                        style={styles.input}
                        placeholderTextColor="black"
                        onChangeText={(name) => this.setState({name})}
                    />
                    <Picker
                      selectedValue={this.state.type}
                      style={{height:40,minWidth:200,color:'black',borderBottomWidth:2,borderColor:'black'}}
                      onValueChange={(type) => this.setState({type})}>
                      <Picker.Item label="Choose type" value=""/>
                      <Picker.Item label="hike" value="2"/>
                      <Picker.Item label="marine" value="4" />
                      <Picker.Item label="car" value="1" />
                      <Picker.Item label="city" value="3" />
                      <Picker.Item label="extreme" value="5" />
                      <Picker.Item label="event" value="6" />
                    </Picker>
                     <TextInput
                      value={this.state.description}
                      style={styles.input}
                      placeholderTextColor="black"
                      multiline={true}
                      numberOfLines={4}
                      onChangeText={(description) => this.setState({description})}
                      />
                      <View style={styles.dateWrapper}>
                        <Text style={{color:'black',fontSize:18,width:150}}>{this.state.status==0?'Show':'Hide'}</Text>
                        <Switch
                          onValueChange={(value) => this.setState({status: value?2:0})}
                          style={{width:50,height:30}}
                          value={this.state.status==0?false:true} />
                      </View>  
                    <View style={styles.dateWrapper}>
                      <Text style={styles.text}>Start date</Text>
                      <DatePicker
                              style={styles.dateInput}
                              date={this.state.startDate}
                              mode="date"
                              placeholder='start date'
                              format="YYYY-MM-DD"
                              minDate={this.state.dateNow}
                              maxDate="2050-01-01"
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              showIcon={false}
                              customStyles={{
                                dateInput: {
                                  borderWidth:0
                                },
                                dateText:{
                                  color:'black',
                                  textAlign:'left',
                                  fontSize:14,
                                  marginBottom:20
                                }
                              }}
                              onDateChange={(startDate) => {this.setState({startDate: startDate})}}
                            />
                      </View>
                      <View style={styles.dateWrapper}>
                      <Text style={styles.text}>End date</Text>
                      <DatePicker
                              style={styles.dateInput}
                              date={this.state.endDate}
                              mode="date"
                              placeholder='end date'
                              format="YYYY-MM-DD"
                              minDate={this.state.dateNow}
                              maxDate="2050-01-01"
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              showIcon={false}
                              customStyles={{
                                dateInput: {
                                  borderWidth:0
                                },
                                dateText:{
                                  color:'black',
                                  textAlign:'left',
                                  fontSize:14,
                                  marginBottom:20
                                }
                              }}
                              onDateChange={(endDate) => {this.setState({endDate: endDate})}}
                            />
                      </View>      
                  <TouchableHighlight onPress={()=>this.setState({editMode:false})} style={styles.Button}>
                      <Text style={{color:'white',textAlign:'center'}}>Cancel</Text>                 
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=>{this.updateRoute();this.setState({editMode:false})}}  style={styles.Button}>
                      <Text style={{color:'white',textAlign:'center'}}>Save</Text>                 
                    </TouchableHighlight>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
       </TouchableWithoutFeedback> 
      )
  }
}
const styles = StyleSheet.create({
  header:{
    textAlign:'center',
    fontSize:18,
    marginTop:15,
    marginBottom:10,
    color:'black'
  },
  contentWrapper:{
    flex:1,
    flexDirection:'column',
    paddingTop:60,
    paddingLeft:20,
    paddingRight:20,
    paddingBottom:20,
    alignItems:'center'
  },
  text:{
    color:'black',
    textAlign:'justify',
    marginBottom:10
  },
  input:{
      color:'black',
      borderBottomWidth:2,
      minWidth:200,
      borderColor:'black',
      textAlign:'center',
      fontSize:18,
      marginTop:0,
      marginBottom:10
  },
  Button:{
    backgroundColor:'#ea2e49',
    padding:10,
    zIndex:2,
    width:200,
    height:40,
    marginBottom:20
  },
  facebookButton:{
    backgroundColor:'#3b5998',
    padding:10,
    zIndex:2,
    width:200,
    height:40,
    marginBottom:10
  },
  twitterButton:{
    backgroundColor:'#4099FF',
    padding:10,
    zIndex:2,
    width:200,
    height:40,
    marginBottom:10
  },
  dateInput:{
    height:40,
    width:100,
    marginBottom:10
  },
  dateWrapper:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
    maxHeight:40
  }
})
export default routeScreen;  