import React, { Component } from 'react';
import  AsyncStorage from 'react-native';
import GoogleSignIn from 'react-native-google-sign-in';
const socialRegister={
	register: function(user) {
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
            	firstname:user.givenName,
				lastname:user.familyName
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
}

export default socialRegister;