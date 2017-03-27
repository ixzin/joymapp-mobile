import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  TouchableHighlight,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import renderIf from './renderif';
import  mainStyles from './styles';
class mainScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      changeRoute:false
     }
   }  
    logout() {
      AsyncStorage.clear();
      Actions.login({user:''});
    }
    render() {
    return (
      <View style={mainStyles.container}>        
          <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
        <View>
          <View>
            <Image style={{width:150,height:150,borderRadius:75}} source={{uri: 'http://teethemes.com:3000/'+this.props.user.image}}/>
          </View>
          <Text style={styles.header}>{this.props.user.firstname.toUpperCase()}&nbsp;{this.props.user.lastname.toUpperCase()} </Text>
        </View>
        <View>
          {renderIf(!this.state.changeRoute,
          <TouchableHighlight onPress={()=>this.setState({changeRoute:true})} style={mainStyles.menuButton}>
              <Text style={{color:'white',textAlign:'center'}}>Start tracking</Text>
          </TouchableHighlight>
          )}
          {renderIf(this.state.changeRoute,
            <View>
              <Text>Choose route</Text>
              <Text> or create new</Text>
              <TouchableHighlight onPress={Actions.tracking}  style={mainStyles.menuButton}>
                <Text style={{color:'white',textAlign:'center'}}>Create new route</Text>
              </TouchableHighlight>
            </View>
          )}
          {renderIf(!this.state.changeRoute,
          <View>
            <TouchableHighlight style={mainStyles.menuButton}>
                <Text style={{color:'white',textAlign:'center'}}>Edit profile</Text>        
            </TouchableHighlight>      
            <TouchableHighlight onPress={()=>this.logout()} style={mainStyles.menuButton}>
                <Text style={{color:'white',textAlign:'center'}}>Logout</Text>
            </TouchableHighlight>  
          </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  header:{
    textAlign:'center',
    fontSize:18,
    marginBottom:10,
    color:'black'
  }
});

export default mainScreen;