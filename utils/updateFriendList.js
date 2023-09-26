import { Alert } from "react-native";
import { getFriends } from "./api"
import * as Notifications from 'expo-notifications';

export const updateFriendList = (id, friendList, setFriendList) => {

  getFriends(id).then((newFriendList) => {
    if(friendList.length){
      newFriendList.forEach((friend, index) => {
        if(friend.location.status !== friendList[index].location.status){
          if(friend.location.status){
            Notifications.scheduleNotificationAsync({
                content: {
                  title: `${friend.name} has started their journey`,
                  body: '',
                  data: { data: 'goes here' },
                },
                trigger: null,
              });
          }
          if(!friend.location.status){
            Notifications.scheduleNotificationAsync({
                content: {
                  title: `${friend.name} has ended their journey`,
                  body: ``,
                  data: { data: 'goes here' },
                },
                trigger: null,
              });
          }
        }
      })
    }
    setFriendList(newFriendList)
    console.log('success!!');
  }).catch((err) => {
    console.log('didnt update, trying again');
    updateFriendList(id, friendList, setFriendList)
  });
}
