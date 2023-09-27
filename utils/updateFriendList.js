import { Alert } from "react-native";
import { getFriends } from "./api";
import * as Notifications from "expo-notifications";

export const updateFriendList = (id, friendList, setFriendList,friendData,setFriendData) => {

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  console.log(id)
  getFriends(id)
    .then((newFriendList) => {
    
      if (friendList.length) {

        friendList.forEach((friend, index) => {
          if (friend.location.status !== newFriendList[index].location.status) {
            if (!friend.location.status) {
              Notifications.scheduleNotificationAsync({
                content: {
                  title: `${friend.name} has started their journey`,
                  body: "",
                  data: { data: "goes here" },
                },
                trigger: null,
              });
            }
            if (friend.location.status) {
              if (friend.user_id === friendData.user_id) {
                setFriendData({
                  user_id: null,
                  name: null,
                  phoneNumber: null,
                  location: {
                    status: false,
                    start: { lat: null, long: null },
                    current: { lat: null, long: null },
                    end: { lat: null, long: null },
                  },
                });
              }

              Notifications.scheduleNotificationAsync({
                content: {
                  title: `${friend.name} has ended their journey`,
                  body: ``,
                  data: { data: "goes here" },
                },
                trigger: null,
              });
            }
          }
        });
      }
      setFriendList(newFriendList);

  }).catch((err) => {
    console.log('didnt update, trying again');

  });
};