import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  Keyboard,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import renderIf from './renderif';
import DatePicker from 'react-native-datepicker';
import  mainStyles from './styles';
import Parametres from './params';
import Icon from './icon'; 

class profileScreen extends Component {
	   constructor(props) {
	    super(props);
	    this.state = {
	        firstname:this.props.user.firstname,
	        lastname:this.props.user.lastname,
	        email:this.props.user.email,
	        login:this.props.user.login,
	        password:'',
	        avatar:this.props.user.image,
	        confirmPassword:'',
	        birthday:this.props.user.birthday?this.props.user.birthday.split('T')[0]:'',
	        country:this.props.user.country,
	        changesDetect:false,
	        errorMessage:false
	    };
	  }
	  componentWillMount(){
		AsyncStorage.getItem('social')
        .then( (value) =>{
        	if (value!=null)
        		this.setState({social:true});
        });
	  }
	  async updateUser() {
	  	if (this.validate(this.state.password,4)&&this.validate(this.state.firstname,3)&&this.validate(this.state.lastname,3)&&this.validate(this.state.email,6)) {
		  	 let userInfo={
		  	  admin:false,	
	          email:this.state.email,
	          login:this.state.login,
	          avatar:this.state.avatar,
	          firstname:this.state.firstname,
	          lastname:this.state.lastname,
	          birthday:this.state.birthday,
	          country:this.state.country,
	          lastActivity:this.props.user.lastActivity
	      }

	      let pass=this.state.password?this.state.password:false;
	      let token=await AsyncStorage.getItem('token');
	       return fetch(Parametres.apiUrl+'users/'+this.props.user._id,{
	          method: 'PUT',
	          headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json',
	            'x-access-token':token
	          },
	          body: JSON.stringify({
	            userData:userInfo,
	            newpassword:pass
	          })
	          }).then((response) => response.json())
	              .then((responseJson) => {
	                if (responseJson.status=='OK') {
	                   try {
	                   	 Actions.main({user:responseJson.user});
	                    } catch (error) {
	                      console.error(error);
	                    }
	                }
	              })
	              .catch((error) => {
	                console.error(error);
	              });
	    } else {
	    	this.setState({errorMessage:'Please fill correct all fields'});
	    }
	  }
	  validate= (arg,length)=> {
	  	  if (!arg&&arg==this.state.password)
	  	  	return true;
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
	  render() {
	    return (
	    	<View style={mainStyles.container}>
	    		  {renderIf(this.state.errorMessage, 
                    <View style={mainStyles.errorPopup}>
                        <Text style={{color:'white',textAlign:'center'}}>{this.state.errorMessage}</Text>
                    </View>
                )}
          		<Image style={mainStyles.background} source={require('../img/pattern.png')}/>
          		<TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
          			<ScrollView>
		          		<View style={styles.contentWrapper}>
		          			<Text style={styles.header}>Edit user profile</Text>
		          			<View style={{flex:1,flexDirection:'row'}}>
		          				<Text style={styles.label}>Avatar:&nbsp;</Text>
		          				<Image style={{width:100,height:100}} source={{uri: this.props.user.image?(Parametres.url+this.props.user.image):(Parametres.url+'img/avatar.png')}}/>
		          				<Icon name="Edit" width="20" height="20" fill='black'/>
		          			</View>
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Firstname:&nbsp;</Text>
		          				<TextInput
		          				  style={this.state.errorFirstname?styles.error:styles.input}
		          				  value={this.state.firstname}
		                          onChangeText={(firstname) => this.setState({firstname,changesDetect:true})}
		                          onBlur={() => {this.setState({errorFirstname: !this.validate(this.state.firstname,3)})}}
		                        />
		          			</View>
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Lastname:&nbsp;</Text>
		          				<TextInput
		          				  style={this.state.errorLastname?styles.error:styles.input}
		          				  value={this.state.lastname}
		                          onChangeText={(lastname) => this.setState({lastname,changesDetect:true})}
		                          onBlur={() => {this.setState({errorLastname: !this.validate(this.state.lastname,3)})}}
		                          />
		          			</View>	
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Email:&nbsp;</Text>
		          				<TextInput
		          				  style={this.state.erroEmail?styles.error:styles.input}
		          				  editable={!this.state.social}
		          				  value={this.state.email}
		                          onChangeText={(email) => this.setState({email,changesDetect:true})}
		                          onBlur={() => {this.setState({erroEmail: !this.validate(this.state.email,6)})}}
		                          />
		          			</View>
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Login:&nbsp;</Text>
		          				<TextInput
		          				  style={styles.input}
		          				  value={this.state.login}
		                          onChangeText={(login) => this.setState({login,changesDetect:true})}/>
		          			</View>
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Pasword:&nbsp;</Text>
		          				<TextInput
		          				  placeholder="******"
		                          placeholderTextColor="#5e6973"
		                          secureTextEntry={true} 
		                          editable={!this.state.social}
		          				  style={this.state.erroPass?styles.error:styles.input}
		          				  value={this.state.password}
		                          onChangeText={(password) => this.setState({password,changesDetect:true})}
		                          />
		          			</View>
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Confirm</Text>
		          				<TextInput
		          				  placeholder="******"
		                          placeholderTextColor="#5e6973"
		                          editable={!this.state.social}
		                          secureTextEntry={true} 
		          				  style={this.state.erroPass?styles.error:styles.input}
		          				  value={this.state.confirmPassword}
		                          onChangeText={(confirmPassword) => this.setState({confirmPassword})}
		                          onBlur={() => {this.setState({erroPass: !this.validate(this.state.password,4)})}}
		                          />
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
			                        onDateChange={(birthday) => {this.setState({birthday: birthday,changesDetect:true})}}
			                      />
		          			</View>
		          			<View style={styles.row}>
		          				<Text style={styles.label}>Country:&nbsp;</Text>
		          				<TextInput
		          				  style={styles.input}
		          				  value={this.state.country}
		                          onChangeText={(country) => this.setState({country})}/>
		          			</View>
		          			<View style={{flex:1,flexDirection:'column',alignSelf:'center'}}>
			          			<TouchableHighlight onPress={()=>Actions.main({user:this.props.user})} style={mainStyles.menuButton}>
				                  <Text style={{color:'white',textAlign:'center'}}>Return</Text>
				                </TouchableHighlight>
				                {renderIf(this.state.changesDetect,
				                <TouchableHighlight onPress={()=>this.updateUser()} style={mainStyles.menuButton}>
				                  <Text style={{color:'white',textAlign:'center'}}>Save</Text>
				                </TouchableHighlight>
				                )}
			                </View>		            
	          		</View>
	          		</ScrollView>
          		</TouchableWithoutFeedback>    
          	</View>		
	    	)
	}

}
const styles = StyleSheet.create({
    header:{
    textAlign:'left',
    fontSize:25,
    marginBottom:25,
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
  },
    error:{
    color:'#ea2e49',
    maxHeight:40,
  	minWidth:150,
  	marginTop:-10,
    borderBottomWidth:0.5,
    borderColor:'#ea2e49',
  }
})
export default profileScreen;