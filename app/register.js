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
            <View style={styles.registerForm}>
            <Text style={mainStyles.header}>Register</Text>
              <View style={styles.formRow}>
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      placeholderTextColor="white"
                      onChangeText={(email) => this.setState({email})}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Login"
                      placeholderTextColor="white"
                      onChangeText={(login) => this.setState({login})}
                    />
                </View>    
                <View style={styles.formRow}>
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      placeholderTextColor="white"
                      secureTextEntry={true} 
                      onChangeText={(password) => this.setState({password})}
                    />

                     <TextInput
                      style={styles.input}
                      placeholder="Confirm password"
                      placeholderTextColor="white"
                      secureTextEntry={true} 
                      onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
                    />
                </View>
                <View style={styles.formRow}>    
                    <TextInput
                      style={styles.input}
                      placeholder="First name"
                      placeholderTextColor="white"
                      secureTextEntry={true} 
                      onChangeText={(firstname) => this.setState({firstname})}
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
     flex: 4,
     flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height:50,
    zIndex:2
  },
  formRow:{
  },
  input:{
    color:'white',
    height:40,
    borderBottomWidth:2,
    minWidth:120,
    borderColor:'white',
    textAlign:'left',
    fontSize:18
  }
});

export default registerScreen;
