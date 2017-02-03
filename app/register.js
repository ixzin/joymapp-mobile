import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TextInput,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import  mainStyles from './styles';

class registerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        login:'',
        password:'',
        passwordConfirm:'',
        firstname:'',
        lastname:''
    };
   }
  render() {
    return (
      <View style={mainStyles.container}>
      <View style={mainStyles.Mask}></View>
          <Image style={mainStyles.background} source={require('../img/intro.jpg')}/>         
            <Text style={mainStyles.header}>Register</Text>
             <View style={styles.registerForm}>
              <View style={styles.formRow}>
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
                <View style={styles.formRow}>
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
      </View>
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
  formRow:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2
  },
  input:{
    color:'white',
    height:40,
    borderBottomWidth:2,
    minWidth:120,
    borderColor:'white',
    textAlign:'left',
    marginRight:10,
    fontSize:18
  }
});

export default registerScreen;
