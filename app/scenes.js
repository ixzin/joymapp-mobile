import React, { Component } from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import  introScreen from './intro';
import loginScreen from './login';
import mainScreen from './main';
import registerScreen from './register';
import trackingScreen from './tracking';
import routeScreen from './route';
import routeCreationScreen from './routeCreation';

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
          <Scene
            key="tracking"
            hideNavBar={true}
            component={trackingScreen}
            title="tracking"
          />
          <Scene
            key="creation"
            hideNavBar={true}
            component={routeCreationScreen}
            title="creation"
          />
         <Scene
            key="route"
            hideNavBar={true}
            component={routeScreen}
            title="route"
          />
      </Scene>
);

export default scenes;