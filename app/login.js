import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  AsyncStorage,
  TouchableHighlight,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View
} 
from 'react-native';
import { Actions } from 'react-native-router-flux';
import GoogleSignIn from 'react-native-google-sign-in';
import renderIf from './renderif';
import Icon from './icon'; 
import  mainStyles from './styles';

class loginScreen extends Component {
   constructor(props) {
    super(props);
    this.state = {
        login:'',
        password:''
    };
  }
  goLogin(social) {
    return fetch('http://teethemes.com:3000/api/authentication',{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: social?social.email:this.state.login,
      password: social?'':this.state.password,
    })
    }).then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.success) {
            try {
              let userId=responseJson.id;
              let token=responseJson.token;
              AsyncStorage.setItem('userId',userId);
              AsyncStorage.setItem('token',token);
              let user;
              getUserInfo(userId,token).then(function(response) {
                Keyboard.dismiss();
                AsyncStorage.setItem('user',JSON.stringify(response.user));
                Actions.main({user:response.user});
              });
            } catch (error) {
              console.error(error);
            }
            this.setState({errorMessage:false});
            
          } else {
            if (responseJson.status==404&&social) {
              this.socialRegister(social).then(function(response) {
                let user=response;
                AsyncStorage.setItem('user',user);
                Actions.main({user:user});
              });
            } else {
              this.setState({errorMessage:responseJson.message});
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
        function getUserInfo(id,token) {
          return fetch('http://teethemes.com:3000/api/users/'+id,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'x-access-token':token
            }
            }).then((response) => response.json())
                .then((responseJSON) => {
                    return Promise.resolve(responseJSON);  
                })
                .catch((error) => {
                  return Promise.reject(error);
                });
        }
  }
  async googleAuth() {
        await GoogleSignIn.configure({
            clientID: 'AIzaSyAJ2VIqe2QctDEM7DWfmpfBVvjdbN3vKI8',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
        });
          let user = await GoogleSignIn.signInPromise();
          let googleUser={
              email:user.email,
              password:'',
              firstname:user.givenName,
              lastname:user.familyName
          }
          this.goLogin(googleUser);
  }
  async facebookAuth() {
    const FBSDK = require('react-native-fbsdk');
    const {
      LoginManager,
      GraphRequest,
      GraphRequestManager
    } = FBSDK;

    // ...
    _responseInfoCallback = (error, result) => {
      if (error) {
        alert('Error fetching data: ' + error.toString());
      } else {
        console.log(result);
      }
    }
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithReadPermissions(['public_profile']).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
            const infoRequest = new GraphRequest(
              '/me',
               {
                httpMethod: 'GET',
                version: 'v2.7',
                parameters: {
                    'fields': {
                        'string' : 'email,name,friends'
                    }
                }
              },
              this._responseInfoCallback,
            );
            // Start the graph request.
            new GraphRequestManager().addRequest(infoRequest).start();
          }
      },
      function(error) {
        console.log('Login fail with error: ' + error);
      }
    );
    _responseInfoCallback = (error, result) => {
        if (error) {
          alert('Error fetching data: ' + error.toString());
        } else {
          let facebookUser={
            email:result.email,
            firstname:result.name.split(' ')[0],
            lastname:result.name.split(' ')[1],
            password:''
          }
          this.goLogin(facebookUser);
        }
  }
}
  socialRegister(user) {
    return fetch('http://teethemes.com:3000/api/users',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registerData:{
              email:user.email,
              password:'',
              firstname:user.firstname,
              lastname:user.lastname
            }
          })
          }).then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.user) {
                   try {
                      return Promise.resolve(responseJson.user); 
                    } catch (error) {
                       return Promise.reject(error);
                    }
                }
              })
              .catch((error) => {
                console.error(error);
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
              <Image style={mainStyles.background} source={require('../img/intro.jpg')}/>
                <View style={styles.loginForm}>
                        <Text style={mainStyles.header}>Titile</Text>
                        <TextInput
                          style={mainStyles.input}
                          placeholder="Login"
                          placeholderTextColor="white"
                          onChangeText={(login) => this.setState({login})}
                        />
                        <TextInput
                          style={mainStyles.input}
                          placeholder="Password"
                          placeholderTextColor="white"
                          secureTextEntry={true} 
                          onChangeText={(password) => this.setState({password})}
                        />
                         <TouchableHighlight onPress={()=>this.goLogin()} style={mainStyles.Button}>
                            <Text style={{color:'white',textAlign:'center'}}>Sign in</Text>
                        </TouchableHighlight>  
                        <Text style={{color:'white',marginTop:10,marginBottom:10}}>or</Text>
                        <TouchableHighlight onPress={()=>this.facebookAuth()} style={styles.facebookButton}>
                           <View>
                            <Icon name="Facebook" width="20" height="20" fill="#fff"/>
                            <Text style={{color:'white',textAlign:'center',position:'absolute',paddingLeft:30}}>Facebook login</Text>
                            </View>
                        </TouchableHighlight>  
                        <TouchableHighlight onPress={()=>this.googleAuth()} style={styles.googleButton}>
                           <View>
                            <Icon name="Google" width="20" height="20" fill="#fff"/>
                            <Text style={{color:'white',textAlign:'center',position:'absolute',paddingLeft:30}}>Google login</Text>
                            </View>
                        </TouchableHighlight>  
                
                         
                   
                </View>
                 <Text style={{color: 'white', position: 'absolute',bottom:10,left:20,zIndex:3}}
                              onPress={() =>Actions.register()}>
                          Register
                          </Text>
                          <Text style={{color: 'white', position: 'absolute',bottom:10,right:20,zIndex:3}}
                              onPress={() => Linking.openURL('http://google.com')}>
                          Forgot password
                </Text>
          </View>
        </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  loginForm:{
     flex: 1,
     flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
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
  }
});

export default loginScreen;