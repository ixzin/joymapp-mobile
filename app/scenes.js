import React, { Component } from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import  introScreen from './intro';
import loginScreen from './login';
import mainScreen from './main';
import registerScreen from './register';

const scenes = Actions.create(
<Scene key="root">
        <Scene key="intro"
            hideNavBar={true}
            component={introScreen}
            title="intro"
          />
          <Scene key="login"
            hideNavBar={true}
            component={loginScreen}
            title="login"/>
             <Scene key="register"
              hideNavBar={true}
              schema="modal"
              component={registerScreen}
              title="register"
             />
          <Scene
            key="main"
            hideNavBar={true}
            component={mainScreen}
            title="main"
          />
        </Scene>
);

export default scenes;