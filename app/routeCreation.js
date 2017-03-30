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
class routeCreationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      type:'',
      description:'',
      startDate:'',
      endDate:'',
      errorMessage:false
     }
   }
   async goToRoute() {
    if (this.validate(this.state.name,6)&&this.validate(this.state.type,4)&&this.validate(this.state.startDate,6)) {
      let token=await AsyncStorage.getItem('token');
      let user=await AsyncStorage.getItem('user');
      let userId=JSON.parse(user)._id;
        this.createNewRoute(userId,token).then(function(response) {
          let routeInfo=response.route;
          Actions.tracking({route:routeInfo});
         });
      } else {
        this.setState({errorType: !this.validate(this.state.type,4)});
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
       return fetch('http://teethemes.com:3000/api/routes/',{
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
          status:'planned',
          description: this.state.description,
          startDate: this.state.startDate,
          endDate: this.state.endDate
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
                  <Picker.Item label="hike" value="hike"/>
                  <Picker.Item label="marine" value="marine" />
                  <Picker.Item label="auto" value="auto" />
                  <Picker.Item label="city" value="city" />
                  <Picker.Item label="extreme" value="extreme" />
                  <Picker.Item label="event" value="event" />
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
                            minDate="1950-01-01"
                            maxDate="2000-01-01"
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
                              }
                            }}
                            onDateChange={(startDate) => {this.setState({startDate: startDate})}}
                          />
                          <DatePicker
                            style={styles.dateInput}
                            date={this.state.endtDate}
                            mode="date"
                            placeholder='end date'
                            format="YYYY-MM-DD"
                            minDate="1950-01-01"
                            maxDate="2000-01-01"
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
                              }
                            }}
                            onDateChange={(endtDate) => {this.setState({endtDate: endtDate})}}
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