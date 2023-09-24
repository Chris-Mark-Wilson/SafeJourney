import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { appStyle } from "../styles/appStyle";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import { getFriends } from "../utils/api";
import * as Notifications from 'expo-notifications';

const Item = ({ name }) => (
  <View style={styles.name}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export const MyFriends = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserContext);
  const { friendData, setFriendData } = useContext(FriendContext);

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(()=>{
    setTimeout(()=>{
      setTimer(timer+1)
      },10000)
  },[timer])

  useEffect(() => {
    if(!friends.length)setIsLoading(true)
    getFriends(userData.user_id)
      .then((friendList) => {

        console.log('friend list updated');
        setIsLoading(false);

        if(friends.length){
          friendList.forEach((friend, index) => {
            if(friend.location.status !== friends[index].location.status){
              if(friend.location.status){
                schedulePushNotification(`${friend.name} has started their journey`)
                showAlert(`${friend.name} has started their journey`)
              }
              if(!friend.location.status){
                schedulePushNotification()
                showAlert(`${friend.name} has ended their journey`)
              }
            }
          })
        }

        setFriends(friendList);
      })
      .catch((err) => {
        console.log(err)
      });
  }, [timer, userData]);

  const handlePress = (val) => {
    setFriendData({ ...val });
    navigation.navigate('Home');
  };

  function showAlert(msg) {
    Alert.alert(msg)
  }

  function schedulePushNotification(msg) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: msg,
        data: { data: 'goes here' },
      },
      trigger: null,
    });
  }

  return isLoading ? (
    <ActivityIndicator size="large" color="grey" />
  ) : (
    <View style={appStyle.container}>
      <Text>My Friends</Text>
      <FlatList
        data={friends.filter(friend => friend.location.status)}
        renderItem={({ item }) => (
            <Pressable
              onPress={() => handlePress(item)}
              style={appStyle.pressable}
            >
              <Item name={item.name} />
            </Pressable>
          ) 
        }
        keyExtractor={(item) => item.name}
      />
      <FlatList
        data={friends.filter(friend => !friend.location.status)}
        renderItem={({ item }) => <Item name={item.name} />}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 16,
  },
});
