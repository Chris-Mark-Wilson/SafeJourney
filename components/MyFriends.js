import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { appStyle } from "../styles/appStyle";
import { useContext } from "react";
import { FriendContext } from "../context/friendContext";
import { FriendListContext } from "../context/friendListContext";


const Item = ({ name }) => (
  <View style={styles.name}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

export const MyFriends = ({ navigation }) => {

  const { friendData, setFriendData } = useContext(FriendContext);

  const { friendList, setFriendList } = useContext(FriendListContext)

  const handlePress = (val) => {
    setFriendData({ ...val });
    navigation.navigate('Home');
  };

  return (
    <View style={appStyle.container}>
      <Text>My Friends</Text>
      <FlatList
        data={friendList.filter(friend => friend.location.status)}
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
        data={friendList.filter(friend => !friend.location.status)}
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
