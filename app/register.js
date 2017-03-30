import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
  AsyncStorage,
  Keyboard,
  TextInput,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import renderIf from './renderif';
import  mainStyles from './styles';

class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        birthday:''
    };
   }
    validate= (arg,length)=> {
      if (!arg||arg.length<length) 
        return false;
      if (arg==this.state.password) 
          return this.state.password==this.state.passwordConfirm?true:false;
      if (arg==this.state.email) {
        let regex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(arg);
      }
      return true;
   }
   register() {
    if (this.validate(this.state.password,4)&&this.validate(this.state.firstname,3)&&this.validate(this.state.lastname,3)&&this.validate(this.state.email,6)) {
        let userInfo={
          email:this.state.email,
          username:this.state.login,
          password:this.state.password,
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          birthday:this.state.birthday?this.state.birthday.split('-')[2]:'',
          birthmonth:this.state.birthday?(+this.state.birthday.split('-')[1]-1):'',
          birthyear:this.state.birthday?this.state.birthday.split('-')[0]:''
      }
       return fetch('http://teethemes.com:3000/api/users',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registerData:userInfo
          })
          }).then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.user) {
                   try {
                      AsyncStorage.setItem('userId',responseJson.user._id);
                    } catch (error) {
                      console.error(error);
                    }
                    this.setState({errorMessage:false});
                    Actions.main({userId:responseJson.user._id});
                }
              })
              .catch((error) => {
                console.error(error);
              });
    } else {
      this.setState({errorMessage:'Please fill correct all fields'});
    }
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
              <Text style={mainStyles.header}>Register</Text>
               <View style={styles.registerForm}>
                <View style={styles.formFirstRow}>
                      <TextInput
                        style={this.state.erroEmail?styles.error:styles.input}
                        placeholder="Email"
                        placeholderTextColor="white"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({email})}
                        onBlur={() => {this.setState({erroEmail: !this.validate(this.state.email,6)})}}
                      />
                      <TextInput
                        style={this.state.erroPass?styles.error:styles.input}
                        placeholder="Password"
                        placeholderTextColor="white"
                        value={this.state.password}
                        secureTextEntry={true} 
                        onChangeText={(password) => this.setState({password})}                      
                      />
                       <TextInput
                        style={this.state.errorFirstname?styles.error:styles.input}
                        placeholder="First name"
                        placeholderTextColor="white"
                        value={this.state.firstname}
                        onChangeText={(firstname) => this.setState({firstname})}
                        onBlur={() => {this.setState({errorFirstname: !this.validate(this.state.firstname,3)})}}
                      />
                      
                  </View>    
                  <View style={styles.formSecondRow}>
                   <TextInput
                        style={styles.input}
                        placeholder="Login"
                        placeholderTextColor="white"
                        onChangeText={(login) => this.setState({login})}
                      />
                       <TextInput
                        style={this.state.erroPass?styles.error:styles.input}
                        placeholder="Confirm"
                        placeholderTextColor="white"
                        value={this.state.passwordConfirm}
                        secureTextEntry={true} 
                        onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                        onBlur={() => {this.setState({erroPass: !this.validate(this.state.password,4)})}}
                      />             
                      <TextInput
                        style={this.state.errorLastname?styles.error:styles.input}
                        placeholder="Last name"
                        placeholderTextColor="white"
                        value={this.state.lastname}
                        onChangeText={(lastname) => this.setState({lastname})}
                        onBlur={() => {this.setState({errorLastname: !this.validate(this.state.lastname,3)})}}
                      />               
                  </View>    
              </View>
              <DatePicker
                        style={{width: 150,zIndex:4,marginBottom:10, marginTop:10}}
                        date={this.state.birthday}
                        mode="date"
                        placeholder='birthday'
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
                        onDateChange={(birthday) => {this.setState({birthday: birthday})}}
                      />
                       <TouchableHighlight onPress={()=>this.register()} style={mainStyles.Button}>
                          <Text style={{color:'white',textAlign:'center'}}>Create account</Text>
                      </TouchableHighlight>  
                      <Text onPress={() =>Actions.login()} style={{color:'white',textAlign:'center',zIndex:3,marginTop:10}}>Already have account</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  registerForm:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  },
  formFirstRow:{
    flexDirection: 'column',
    minWidth:150,
    alignItems: 'flex-start',
    zIndex:2
  },
  formSecondRow:{
    flexDirection: 'column',
    minWidth:150,
    alignItems: 'flex-end',
    zIndex:2
  },
  input:{
    color:'white',
    height:40,
    borderBottomWidth:2,
    minWidth:120,
    borderColor:'white',
    textAlign:'left',
    fontSize:14
  },
  error:{
    color:'#ea2e49',
    height:40,
    borderBottomWidth:2,
    minWidth:120,
    borderColor:'#ea2e49',
    textAlign:'left',
    fontSize:14

  },
  Button:{
    backgroundColor:'#ea2e49',
    padding:10,
    marginTop:10,
    zIndex:2,
    width:120,
    height:40
  }
});

export default registerScreen;
