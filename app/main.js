import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import renderIf from './renderif';
import  mainStyles from './styles';
import Parametres from './params';

class mainScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      changeRoute:false,
      loader:false,
      routes:[]
     }
   }  
    logout() {
      AsyncStorage.clear();
      Actions.login({user:''});
    }
    async getRoutes(id) {
      this.setState({changeRoute:true,loader:true});
      let token=await AsyncStorage.getItem('token');
      let routes=await this.getRoutesByUser(id,token);
      this.setState({loader:false,routes:routes});
    }
    async goRoute(id) {
      let token=await AsyncStorage.getItem('token');
      let routeInfo=await this.getRoute(id,token);
      Actions.route({route:routeInfo.route});
    }
    getRoutesByUser(id,token) {
        return fetch(Parametres.apiUrl+'routesByUser/'+id,{
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
    getRoute(id,token) {
      return fetch(Parametres.apiUrl+'routes/'+id,{
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
    render() {
    return (
      <View style={mainStyles.container}>        
        <Image style={mainStyles.background} source={require('../img/pattern.png')}/>
        <ScrollView>
          <View style={styles.contentWrapper}>
            <View style={{paddingTop:Parametres.resolution.height*0.1}}>
              <Image style={{width:150,height:150,borderRadius:75}} source={{uri: Parametres.url+this.props.user.image}}/>
            </View>
            <Text style={styles.header}>{this.props.user.firstname.toUpperCase()}&nbsp;{this.props.user.lastname.toUpperCase()} </Text>
          </View>
          <View>
          {renderIf(!this.state.changeRoute,
          <TouchableHighlight onPress={()=>this.getRoutes(this.props.user._id)} style={mainStyles.menuButton}>
              <Text style={{color:'white',textAlign:'center'}}>Start tracking</Text>
          </TouchableHighlight>
          )}
          {renderIf(this.state.loader, 
                <Image style={{width:50,height:50}} source={require('../img/loader.gif')}/>
          )}
          {renderIf(this.state.changeRoute,              
            <View>
              {renderIf(!this.state.loader&&this.state.routes.length!=0,
              <Text style={styles.header}>Choose route</Text>
              )}
                {this.state.routes.map(function(route, i){
                  return(
                    <TouchableWithoutFeedback  key={i} onPress={()=>this.goRoute(route._id)}>
                      <View style={styles.routeContainer}>
                        <Image  style={styles.routeIcon} source={{uri: Parametres.url+'data/routes/'+route._id+'/thumb.jpg'}}/>
                        <Text style={styles.routeNameCell}>{route.name}</Text>
                        <Text style={styles.routeStatusCell}>{route.status}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                },this)}
                {renderIf(!this.state.loader&&this.state.routes.length==0,
                      <Text style={{marginBottom:15,color:'black',textAlign:'center'}}>You dont have enough routes</Text>
                  )}
                <View style={styles.contentWrapper}>
                <TouchableHighlight onPress={Actions.creation}  style={mainStyles.menuButton}>
                  <Text style={{color:'white',textAlign:'center'}}>Create new route</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>this.setState({changeRoute:false})} style={mainStyles.menuButton}>
                  <Text style={{color:'white',textAlign:'center'}}>Return</Text>
                </TouchableHighlight>
                </View>      
            </View>
          )}
          {renderIf(!this.state.changeRoute,
          <View>
            <TouchableHighlight onPress={()=>Actions.profile({user:this.props.user})}  style={mainStyles.menuButton}>
                <Text style={{color:'white',textAlign:'center'}}>Edit profile</Text>        
            </TouchableHighlight>      

          </View>
          )}
          <View style={styles.contentWrapper}>
          <TouchableHighlight onPress={()=>this.logout()} style={mainStyles.menuButton}>
              <Text style={{color:'white',textAlign:'center'}}>Logout</Text>
           </TouchableHighlight>  
           </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    textAlign:'center',
    fontSize:18,
    marginBottom:20,
    color:'black'
  },
  contentWrapper:{
    flex:1,
    flexDirection:'column',
    alignItems:'center'
  },
  routeContainer:{
    flex: 1, 
    flexDirection: 'row',
    alignItems:'center',
    height:60,
    margin:0
  },
  routeIcon:{
    width:50,
    height:50,
    borderRadius:25
  },
  routeNameCell:{
    paddingLeft:20,
    paddingRight:20,
    margin:0,
    width:160
  },
  routeStatusCell:{
    paddingLeft:20,
    paddingRight:20,
    margin:0,
    width:120
  }
});

export default mainScreen;