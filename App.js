import { StatusBar } from 'expo-status-bar';
import React, { Component }  from 'react';

import {View, Text} from 'react-native';
import * as firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import { NativeAppEventEmitter } from 'react-native';

const firebaseConfig = {
  apiKey: "AIzaSyAbfIn2jSVpCPISZKFsoID1hTIADFsDUYs",
  authDomain: "instagram-dev-f4c3b.firebaseapp.com",
  projectId: "instagram-dev-f4c3b",
  storageBucket: "instagram-dev-f4c3b.appspot.com",
  messagingSenderId: "285434807760",
  appId: "1:285434807760:web:776796813a4eea192b25d5",
  measurementId: "G-VKX3YW8VQ7"
};

if(firebase.apps.length ===0){
  firebase.initializeApp(firebaseConfig)
}
const Stack = createStackNavigator();

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      loade: false,
    }
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      }else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded} = this.state;
    if(!loaded) {
      return(
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading</Text>
        </View>
      )
    }

    if(!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false}} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return(
      <View style={{ flex: 1, justifyContent: 'center'}}>
        <Text>User is logged in</Text>
      </View>
    ) 
  }
}

export default App