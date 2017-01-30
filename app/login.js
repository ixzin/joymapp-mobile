import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  Image,
  View
} 
from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from './icon'; 
import renderIf from './renderif';
class loginScreen extends Component {
   constructor(props) {
    super(props);
    this.state = {showLoginForm: false,
        showRegisterForm:false,
        login:'',
        password:''
    };
  }
  goLogin() {
    return fetch('http://teethemes.com:3000/api/authentication',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: this.state.login,
      password: this.state.password,
    })
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success) {
            try {
              AsyncStorage.setItem('userId',responseJson.id);
            } catch (error) {
              console.error(error);
            }
            Actions.main({userId:responseJson.id});
          } else {
            alert('Wrong username or password!!!');
          }
        })
        .catch((error) => {
          console.error(error);
        });
  }
  render() {
    return (
      <View style={styles.container}>
          <View style={styles.Mask}></View>
          <Image style={styles.background} source={require('../img/intro.jpg')}/>
            <View style={styles.loginForm}>
                    <Text style={styles.text}>Login</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(login) => this.setState({login})}
                    />
                    <Text style={styles.text}>Password</Text>
                    <TextInput
                      style={styles.input}
                      secureTextEntry={true} 
                      onChangeText={(password) => this.setState({password})}
                    />
                     <TouchableHighlight onPress={()=>this.goLogin()} style={styles.Button}>
                        <Text style={{color:'white',textAlign:'center'}}>Sign in</Text>
                    </TouchableHighlight>  
                    <Text style={{color:'white',marginTop:10,marginBottom:10}}>OR</Text>
                    <TouchableHighlight onPress={()=>this.goLogin()} style={styles.facebookButton}>
                       <View>
                        <Icon name="Facebook" width="20" height="20" fill="#fff"/>
                        <Text style={{color:'white',textAlign:'center',position:'absolute',paddingLeft:30}}>Facebook login</Text>
                        </View>
                    </TouchableHighlight>  
                    <TouchableHighlight onPress={()=>this.goLogin()} style={styles.googleButton}>
                       <View>
                        <Icon name="Google" width="20" height="20" fill="#fff"/>
                        <Text style={{color:'white',textAlign:'center',position:'absolute',paddingLeft:30}}>Google login</Text>
                        </View>
                    </TouchableHighlight>  
                     <View style={styles.bottomLinks}>
                      <Text style={{color: 'white', alignSelf: 'flex-start'}}
                          onPress={() => Linking.openURL('http://google.com')}>
                      Google
                      </Text>
                      <Text style={{color: 'white', alignSelf: 'flex-end'}}
                          onPress={() => Linking.openURL('http://google.com')}>
                      Google
                      </Text>
                  </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background:{
    flex:1,
    position:'absolute',
    zIndex:0,
    top:0,
    bottom:0,
    right:0,
    left:0
  },
  Mask:{
    backgroundColor:'black',
    position:'absolute',
    top:0,left:0,right:0,bottom:0,
    opacity:0.5,
    zIndex:1
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bb0000',
  },
  loginForm:{
     flex: 1,
     flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  },
  Button:{
    backgroundColor:'#ea2e49',
    padding:10,
    zIndex:2,
    width:200,
    height:40
  },
  facebookButton:{
      backgroundColor:'#3b5998',
      padding:10,
      zIndex:2,
      width:200,
      height:40,
      marginBottom:10
  },
  googleButton:{
      backgroundColor:'#d34836',
      padding:10,
      zIndex:2,
      width:200,
      height:40,
      marginBottom:10
  },
  text:{
    fontSize:18,
    color:'white',
    minWidth:200,
    textAlign:'left',
    marginTop:0,
    marginBottom:0
  },
  input:{
    color:'white',
    height:30,
    borderBottomWidth:2,
    minWidth:200,
    borderColor:'white',
    textAlign:'left',
    marginTop:0,
    marginBottom:10
  },
  bottomLinks:{

  }
});

export default loginScreen;