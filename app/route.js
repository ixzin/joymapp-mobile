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
import renderIf from './renderif';
import Icon from './icon'; 
import  mainStyles from './styles';
class routeScreen extends Component {
  constructor(props) {
    super(props);
  }
  async goToRoute() {
      let token=await AsyncStorage.getItem('token');
      let userFromStorage=await AsyncStorage.getItem('user');
      let user=JSON.parse(userFromStorage);
      //Actions.tracking({route:this.props.route,user:user});
    }
  render() {
    return (
        <View style={mainStyles.container}>
          <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
          <View style={styles.contentWrapper}>
            <Image style={{width:150,height:150,borderRadius:75}} source={{uri: 'http://teethemes.com:3000/data/routes/'+this.props.route._id+'/'+this.props.route.thumb}}/>
            <Text style={styles.header}>{this.props.route.name}</Text>
            <Text style={styles.text}>{this.props.route.description}</Text>
            <TouchableHighlight onPress={()=>this.goToRoute()} style={mainStyles.Button}>
                      <Text style={{color:'white',textAlign:'center'}}>Go!</Text>
            </TouchableHighlight> 
          </View>
        </View>
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
  }
})
export default routeScreen;  