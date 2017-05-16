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
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import renderIf from './renderif';
import Icon from './icon'; 
import  mainStyles from './styles';
import Parametres from './params';

class routeCreationScreen extends Component {
  constructor(props) {
    super(props);
    let currentDate=new Date();
    let formatCurrentDate=currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
    this.state = {
      name:'',
      type:'',
      description:'',
      dateNow:formatCurrentDate,
      startDate:formatCurrentDate,
      endDate:formatCurrentDate,
      errorMessage:false
     }
   }
   async goToRoute() {
    if (this.validate(this.state.name,6)) {
      let token=await AsyncStorage.getItem('token');
      let userFromStorage=await AsyncStorage.getItem('user');
      let user=JSON.parse(userFromStorage);
        this.createNewRoute(user._id,token).then(function(response) {
          let routeInfo=response.route;
          Actions.tracking({route:routeInfo,user:user});
         });
      } else {
        this.setState({errorName: !this.validate(this.state.name,6)});
        this.setState({errorMessage:'Please fill correct all fields'});
      }
    }
    validate= (arg,length)=> {
      if (!arg||arg.length<length) 
        return false;
      return true;
   }
    createNewRoute(id,token) {
       return fetch(Parametres.apiUrl+'routes/',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token':token
        },
        body: JSON.stringify({
          type: this.state.type,
          name: this.state.name,
          owner:id,
          status:1,
          description: this.state.description,
          startdate: this.state.startDate,
          enddate: this.state.endDate
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
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={mainStyles.container}>
          {renderIf(this.state.errorMessage, 
                    <View style={mainStyles.errorPopup}>
                        <Text style={{color:'white',textAlign:'center'}}>{this.state.errorMessage}</Text>
                    </View>
                )}  
          <View style={mainStyles.Mask}></View>
          <Image style={mainStyles.background} source={require('../img/route.jpg')}/>
          <ScrollView style={{zIndex:3}}>
            <View style={styles.routeForm}>
              <Text style={mainStyles.header}>New route</Text>
              <View style={this.state.errorType?styles.errorSelect:styles.select}>
                <Picker
                  selectedValue={this.state.type}
                  style={{height:60,minWidth:200,marginTop:0,marginBottom:10,color:'white'}}
                  onValueChange={(type) => this.setState({type: type})}>
                  <Picker.Item label="Choose type" value=""/>
                  <Picker.Item label="hike" value="2"/>
                  <Picker.Item label="marine" value="4" />
                  <Picker.Item label="auto" value="1" />
                  <Picker.Item label="city" value="3" />
                  <Picker.Item label="extreme" value="5" />
                  <Picker.Item label="event" value="6" />
                </Picker>
              </View>
              <TextInput
                style={this.state.errorName?styles.error:mainStyles.input}
                placeholder="Title"
                placeholderTextColor="white"
                onChangeText={(name) => this.setState({name})}
                 onBlur={() => {this.setState({errorName: !this.validate(this.state.name,6)})}}
              />
              <TextInput
                  style={mainStyles.input}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Description"
                  placeholderTextColor="white"
                  onChangeText={(description) => this.setState({description})}                 
                />
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
                                borderBottomColor :'white',
                                borderBottomWidth:2,
                                borderRightWidth:0,
                                borderTopWidth:0,
                                borderLeftWidth:0,
                              },
                              dateText:{
                                color:'white',
                                textAlign:'left',
                                fontSize:18
                              }
                            }}
                            onDateChange={(startDate) => {this.setState({startDate: startDate})}}
                          />
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
                                borderBottomColor :'white',
                                borderBottomWidth:2,
                                borderRightWidth:0,
                                borderTopWidth:0,
                                borderLeftWidth:0,
                              },
                              dateText:{
                                color:'white',    
                                textAlign:'left',
                                fontSize:18
                              }
                            }}
                            onDateChange={(endDate) => {this.setState({endDate: endDate})}}
                          />     
                 <TouchableHighlight onPress={()=>this.goToRoute()} style={mainStyles.Button}>
                      <Text style={{color:'white',textAlign:'center'}}>Go!</Text>
                </TouchableHighlight>       
              </View>
            </ScrollView>
        </View>
      </TouchableWithoutFeedback>
      )  
  }
}
const styles = StyleSheet.create({
    routeForm:{
     flex: 1,
     flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2,
    paddingTop:60,
  },
  dateInput:{
    height:40,
    minWidth:200,
    marginTop:0,
    marginBottom:10
  },
  select:{
    height:50,
    borderBottomWidth:2,
    borderBottomColor:'white'
  },
  errorSelect:{
    height:50,
    borderBottomWidth:2,
    borderBottomColor:'#ea2e49'
  },
    error:{
    color:'#ea2e49',
    height:60,
    borderBottomWidth:2,
    minWidth:200,
    borderColor:'#ea2e49',
    textAlign:'left',
    fontSize:18
  }

});

export default routeCreationScreen;     