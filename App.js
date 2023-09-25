import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";
import { MyFriends } from "./components/MyFriends";
import { AddFriend } from "./components/AddFriend";
import Header from "./components/Header";
import { Home } from "./components/Home";
import { UserProvider } from "./context/userContext";
import { FriendProvider } from "./context/friendContext";
import { FriendListProvider } from "./context/friendListContext";
import { UserPage } from "./components/UserPage";
import { SignOut } from "./components/SignOut";
import { Footer } from "./components/Footer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <FriendProvider>
      <UserProvider> 
        <FriendListProvider>
        <NavigationContainer>
          <View>
            <Header />
          </View>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="My friends" component={MyFriends} />
            <Drawer.Screen name="Add friend" component={AddFriend} />
            <Drawer.Screen name="My Profile " component={UserPage} />
            <Drawer.Screen name="Sign Out " component={SignOut} />
          </Drawer.Navigator>
          <View>
            <Footer />
          </View>
        </NavigationContainer>
      </FriendListProvider>
    </UserProvider>
  </FriendProvider> 
  );
}
