import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableWithoutFeedback,
    Keyboard,
  TextInput,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-datepicker';
import  mainStyles from './styles';

class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        birthday:''
    };
   }
   register() {
    if (this.state.password&&this.state.passwordConfirm&&this.state.firstname&&this.state.lastname) {
        let userInfo={
          email:this.state.email,
          username:this.state.login,
          password:this.state.password,
          firstname:this.state.firstname,
          lastname:this.state.lastname,
          birthday:this.state.birthday?this.state.birthday.split('-')[2]:'',
          birthmonth:this.state.birthday?this.state.birthday.split('-')[1]:'',
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
                if (responseJson.success) {
                  try {
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
    } else {
      alert('Fill all fields');
    }
   }
  render() {
    return (
    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <View style={mainStyles.container}>
            <View style={mainStyles.Mask}></View>
            <Image style={mainStyles.background} source={require('../img/intro.jpg')}/>         
              <Text style={mainStyles.header}>Register</Text>
               <View style={styles.registerForm}>
                <View style={styles.formFirstRow}>
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="white"
                        onChangeText={(email) => this.setState({email})}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="white"
                        secureTextEntry={true} 
                        onChangeText={(password) => this.setState({password})}
                      />
                       <TextInput
                        style={styles.input}
                        placeholder="First name"
                        placeholderTextColor="white"
                        onChangeText={(firstname) => this.setState({firstname})}
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
                        style={styles.input}
                        placeholder="Confirm"
                        placeholderTextColor="white"
                        secureTextEntry={true} 
                        onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                      />             
                      <TextInput
                        style={styles.input}
                        placeholder="Last name"
                        placeholderTextColor="white"
                        onChangeText={(lastname) => this.setState({lastname})}
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
    fontSize:18
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
