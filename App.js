import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Header from './components/Header';

import { appStyle } from './styles/appStyle';
import { StatusBar } from 'expo-status-bar';

import { Home } from './components/Home';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
       <View>
        <Header />
      </View>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}


