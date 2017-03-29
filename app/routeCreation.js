import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  ScrollView,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import MapView from 'react-native-maps';
import  mainStyles from './styles';
class routeCreationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      description:'',
      startDate:'',
      endDate:''
     }
   }
   async goToRoute() {
      let token=await AsyncStorage.getItem('token');
      let user=await AsyncStorage.getItem('user');
      let userId=user._id;
      this.createNewRoute(userId,token).then(function(response) {
        console.log(response);
       });
    }
    createNewRoute(id,token) {
    }
    render() {
    return (
      <View style={mainStyles.container}>  
        <View style={mainStyles.Mask}></View>
        <Image style={mainStyles.background} source={require('../img/route.jpg')}/>
        <ScrollView style={{zIndex:3}}>
          <View style={styles.routeForm}>
            <Text style={mainStyles.header}>New route</Text>
            <TextInput
              style={mainStyles.input}
              placeholder="Title"
              placeholderTextColor="white"
              onChangeText={(name) => this.setState({name})}
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
                          placeholder='start'
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
                          placeholder='start'
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
                   <TextInput
                  style={mainStyles.input}
                  placeholder="start point"
                  placeholderTextColor="white"
                  onChangeText={(startPoint) => this.setState({startPoint})}
                />     
               <TouchableHighlight onPress={()=>this.goToRoute()} style={mainStyles.Button}>
                            <Text style={{color:'white',textAlign:'center'}}>Go!</Text>
                </TouchableHighlight>       
            </View>
          </ScrollView>
      </View>
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
    paddingTop:60
  },
  dateInput:{
    height:40,
    minWidth:200,
    marginTop:0,
    marginBottom:10
  }

});

  export default routeCreationScreen;     