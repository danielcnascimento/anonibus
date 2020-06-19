import React from 'react';
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer"

import SignIn from './SignIn';
import CreateAccount from './CreateAccount';
import Home from './Home';
import Room from './Room';
import HomeDetails from './Home/details';
import Perfil from './Profile';
import Chat from './Chat';
import Upload from './Upload';
import {Provider} from 'react-native-paper';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AuthContext } from './context';
import firebase from './config/firebase';


const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{header:() => null}}>
    <HomeStack.Screen name="Room" component={Room} />
    <HomeStack.Screen name="Chat" component={Chat} />
    <HomeStack.Screen name="Profile" component={Perfil} />
  </HomeStack.Navigator>
)



export default () => {

  const [userToken, setUserToken] = React.useState(null);

  React.useEffect(() => {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUserToken(user)
      } else {
        setUserToken(null)
      }
    })
  }, []);

  const authContext = React.useMemo(() => {
    return { 
      signIn: () => { setUserToken('umMontedeCaracteres') },
      signUp: () => { setUserToken('umMontedeCaracteres') },
      signOut: () => { setUserToken(null) },
    }
  })

  return (
  <Provider>
    <AuthContext.Provider value={authContext}>

      <NavigationContainer>
        {userToken ?
          <Drawer.Navigator>
            <Drawer.Screen name="Room" component={HomeStackScreen} />
            {/* <Drawer.Screen name="Profile" component={} /> */}
          </Drawer.Navigator>
          :
          <AuthStack.Navigator screenOptions={{header:() => null}}>
            <AuthStack.Screen
              name="SignIn"
              component={SignIn}
              options={{ title: "Acessar" }}
            />
            <AuthStack.Screen
              name="CreateAccount"
              component={CreateAccount}
              options={{ title: "Criar Conta" }}
            />
          </AuthStack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
</Provider>
  )
}