import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { MyFriends } from './components/MyFriends';
import { AddFriend } from './components/AddFriend';
import Header from './components/Header';
import { useState } from 'react';
import { Home } from './components/Home';
import { UserProvider } from './context/userContext';

const Drawer = createDrawerNavigator();

export default function App() {
  

  const [userData, setUserData] = useState({
    startPoint : {latitude: null, longitude: null},
    endPoint: {latitude: null, longitude: null},
    currentLocation: {latitude: null, longitude: null},
    name: ""
  })
  const [friendData, setFriendData] = useState({
    startPoint : {latitude: null, longitude: null},
    endPoint: {latitude: null, longitude: null},
    currentLocation: {latitude: null, longitude: null},
    name:""
  })
  return (
    <UserProvider>
      <NavigationContainer>
        <View>
          <Header />
        </View>
        <Drawer.Navigator initialRouteName="Home">
          {/* <Drawer.Screen name="Home" component={Home} /> */}
          <Drawer.Screen
            name="Home"
            component={(props) => <Home {...props}  userData = {userData} setUserData={setUserData} friendData={friendData}
             setFriendData={setFriendData}
            />}
           
          />
          {/* testFriendData passed only for test purpose */}
          <Drawer.Screen name="My friends" component={MyFriends} setFriendData ={setFriendData} />
          <Drawer.Screen name="Add friend" component={AddFriend} />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}


