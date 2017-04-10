import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import renderIf from './renderif';
import DatePicker from 'react-native-datepicker';
import  mainStyles from './styles';
class profileScreen extends Component {
	   constructor(props) {
	    super(props);
	    this.state = {
	        firstname:this.props.user.firstname,
	        lastname:this.props.user.lastname,
	        email:this.props.user.email,
	        login:this.props.user.login,
	        password:'',
	        confirmPassword:'',
	        birthday:this.props.user.birthday?this.props.user.birthday.split('T')[0]:'',
	        country:this.props.user.country
	    };
	  }
	  render() {
	    return (
	    	<View style={mainStyles.container}>
          		<Image style={mainStyles.background} source={require('../img/pattern.png')}/>
          		<View style={styles.contentWrapper}>
          			<Text style={styles.header}>Edit user profile</Text>
          			<View style={styles.row}>
          				<Text style={styles.label}>Firstname:&nbsp;</Text>
          				<TextInput
          				  style={styles.input}
          				  value={this.state.firstname}
                          onChangeText={(firstname) => this.setState({firstname})}
                        />
          			</View>
          			<View style={styles.row}>
          				<Text style={styles.label}>Lastname:&nbsp;</Text>
          				<TextInput
          				  style={styles.input}
          				  value={this.state.lastname}
                          onChangeText={(lastname) => this.setState({lastname})}/>
          			</View>	
          			<View style={styles.row}>
          				<Text style={styles.label}>Email:&nbsp;</Text>
          				<TextInput
          				  style={styles.input}
          				  value={this.state.email}
                          onChangeText={(email) => this.setState({email})}/>
          			</View>
          			<View style={styles.row}>
          				<Text style={styles.label}>Login:&nbsp;</Text>
          				<TextInput
          				  style={styles.input}
          				  value={this.state.login}
                          onChangeText={(login) => this.setState({login})}/>
          			</View>
          			<View style={styles.row}>
          				<Text style={styles.label}>Pasword:&nbsp;</Text>
          				<TextInput
          				  placeholder="******"
                          placeholderTextColor="#5e6973"
                          secureTextEntry={true} 
          				  style={styles.input}
          				  value={this.state.password}
                          onChangeText={(password) => this.setState({password})}/>
          			</View>
          			<View style={styles.row}>
          				<Text style={styles.label}>Confirm</Text>
          				<TextInput
          				  placeholder="******"
                          placeholderTextColor="#5e6973"
                          secureTextEntry={true} 
          				  style={styles.input}
          				  value={this.state.confirmPassword}
                          onChangeText={(confirmPassword) => this.setState({confirmPassword})}/>
          			</View>
          			<View style={styles.row}>
          				<Text style={styles.label}>Birthday:&nbsp;</Text>
          				 <DatePicker
	                        style={{width: 150,zIndex:4, marginTop:-10}}
	                        date={this.state.birthday}
	                        mode="date"
	                        format="YYYY-MM-DD"
	                        minDate="1950-01-01"
	                        maxDate="2000-01-01"
	                        confirmBtnText="Confirm"
	                        cancelBtnText="Cancel"
	                        showIcon={false}
	                        customStyles={{
	                          dateInput: {
	                            borderBottomColor :'#5e6973',
	                            borderBottomWidth:0.5,
	                            borderRightWidth:0,
	                            borderTopWidth:0,
	                            borderLeftWidth:0,
	                          },
	                          dateText:{
	                            color:'#5e6973',
	                            textAlign:'left'
	                          }
	                        }}
	                        onDateChange={(birthday) => {this.setState({birthday: birthday})}}
	                      />
          			</View>
          			<View style={styles.row}>
          				<Text style={styles.label}>Country:&nbsp;</Text>
          				<TextInput
          				  style={styles.input}
          				  value={this.state.country}
                          onChangeText={(country) => this.setState({country})}/>
          			</View>
          			<TouchableHighlight onPress={()=>Actions.main({user:this.props.user})} style={mainStyles.menuButton}>
	                  <Text style={{color:'white',textAlign:'center'}}>Return</Text>
	                </TouchableHighlight>
	                <TouchableHighlight style={mainStyles.menuButton}>
	                  <Text style={{color:'white',textAlign:'center'}}>Save</Text>
	                </TouchableHighlight>
          		</View>
          	</View>		
	    	)
	}

}
const styles = StyleSheet.create({
    header:{
    textAlign:'left',
    fontSize:25,
    marginBottom:10,
    color:'black'
  },
  contentWrapper:{
    flex:1,
    paddingTop:60,
    flexDirection:'column',
    alignItems:'flex-start',
  },
  row:{
  	flex:1,
  	flexDirection:'row',
  	maxHeight:40
  },
  input:{
  	color:'#5e6973',
  	maxHeight:40,
  	minWidth:150,
  	marginTop:-10
  },
  label:{
  	width:100
  }
})
export default profileScreen;