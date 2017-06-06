import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  Image,
  View
} 
from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import  mainStyles from './styles';

class introScreen extends Component {
	componentWillMount(){
        AsyncStorage.getItem('user')
        .then( (value) =>{
            if (value != null){
              let userObj=JSON.parse(value);
              Actions.main({user:userObj});
              /*let routeInfo={
                "_id":"58f08fc48d610829f243f887",
                  "description" : "Lorem ipsum",
                  "enddate" : "2017-04-14",
                  "events" : [],
                  "name" : "Test text",
                  "owner" : "58e7736a34d093290f07d684",
                  "path" : [ 
                      [65.9667, 
                          -18.5333
                      ], 
                      [ 
                          65.517515, 
                          -16.0729966666667
                      ], 
                      [ 
                          64.4869933333333, 
                          -17.3693833333333
                      ], 
                      [ 
                          64.1393683333333, 
                          -21.763915
                      ]
                  ],
                  "startdate": "2018-04-13",
                  "status" : 2,
                  "type" : 2
              }
            Actions.tracking({route:routeInfo,user:userObj});*/
            } else{
              Actions.login({type:'reset'});
            }
        });
  };
  render() {
    return (
      <View style={mainStyles.container}>
          <Image style={mainStyles.background} source={require('../img/intro.jpg')}/>
      </View>
      )
	}
}

export default introScreen;