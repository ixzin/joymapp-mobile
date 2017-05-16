import React, { Component } from 'react';
import {
Dimensions
} from 'react-native';

const Parametres = {
	url:'http://teethemes.com:3000/',
	apiUrl:'http://teethemes.com:3000/api/',
	resolution:Dimensions.get('window'),
	types:['auto','hike','city','marine','extreme','event'],
	statuses:['disabled','active','planned','published']
 };

export default Parametres;
