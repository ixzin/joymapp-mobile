import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
class mainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
     }
   }
      logout() {
      AsyncStorage.clear();
      Actions.login({userId:''});
    }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}    
        >Hello, {this.props.userId}
        </Text>
        <TouchableHighlight onPress={()=>this.logout()} style={styles.Button}>
            <Text style={{color:'white',textAlign:'center'}}>Logout</Text>
        </TouchableHighlight>  
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});

export default mainScreen;