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


const Item = ({ name,isBold }) => (
  <View >
    <Text style={isBold ?styles.boldText:styles.normalText}>{name}</Text>
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
           <View style={styles.container}><Text>🟢</Text> 
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
        renderItem={({ item }) =>           <View style={styles.container}>
            <Text>🔴</Text>
            <Item name={item.name}/>
          </View>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginLeft:20,
    display:"flex",
    flexDirection:"row",
    gap: 20,
  },
  item: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingVertical: 8,
    paddingHorizontal: 16,
   // backgroundColor: 'lightgreen',
    borderRadius: 8,
    marginVertical: 4, 
  },
  nonPressable: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingVertical: 8,
    paddingHorizontal: 16,
    //backgroundColor: 'lightcoral',
    borderRadius: 8,
    marginVertical: 4, 
    
  },
  boldText:{
    fontSize:16,
    fontWeight: "bold"
  },
  normalText:{
    fontSize:16,
    opacity: 0.5
  }
});
