import React, { Component } from 'react';
import {StyleSheet} from 'react-native';

const mainStyles = StyleSheet.create({
	    background:{
	    flex:1,
	    position:'absolute',
	    zIndex:0,
	    top:0,
	    bottom:0,
	    height:null,
	    width:null,
	    right:0,
	    left:0
	  },
	  Mask:{
	    backgroundColor:'black',
	    position:'absolute',
	    top:0,left:0,right:0,bottom:0,
	    opacity:0.75,
	    zIndex:1
	  },
	  container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: '#bb0000',
	  },
	  header:{
	    fontSize:28,
	    marginBottom:20,
	    color:'white',
	    height:60,
	    zIndex:3
	  }
 });

export default mainStyles;
