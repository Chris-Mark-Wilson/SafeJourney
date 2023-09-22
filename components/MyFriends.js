import {
  View,
  Text,
  FlatList,
  Pressable,
  SectionList,
  StyleSheet,
} from "react-native";
import { appStyle } from "../styles/appStyle";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import { getFriends } from "../utils/api";

const Item = ({ name }) => (
  <View style={styles.name}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export const MyFriends = ({ navigation }) => {
  const { userData, setUserData } = useContext(UserContext);
  const { friendData, setFriendData } = useContext(FriendContext);

  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getFriends(userData.user_id)
      .then((friendList) => {
        setFriends(() => {
          return [...friendList];
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err),"err in catch Myfriends";
      });
  }, []);

  const handlePress = (val) => {
    console.log(val);

    setFriendData((friend) => {
      let newData = { ...val };

      return newData;
    });
    navigation.navigate('Home');
  };

  return isLoading ? (
    <Text>Loading</Text>
  ) : (
    <View style={appStyle.container}>
      <Text>My Friends</Text>
      <FlatList
        data={friends}
        renderItem={({ item }) =>
          item.location.status === true ? (
            <Pressable
              onPress={() => handlePress(item)}
              style={appStyle.pressable}
            >
              <Item name={item.name} />
            </Pressable>
          ) : (
            <Item name={item.name} />
          )
        }
        keyExtractor={(item) => item.name}
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
