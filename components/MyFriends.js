import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import { appStyle } from "../styles/appStyle";
import { useContext } from "react";
import { FriendContext } from "../context/friendContext";
import { FriendListContext } from "../context/friendListContext";
import { ScrollView } from "react-native-gesture-handler";
import { removeFriend } from "../utils/api";


const Item = ({ name,isBold }) => (
  <View >
    <Text style={isBold ?styles.boldText:styles.normalText}>{name}</Text>
  </View>
);

export const MyFriends = ({ navigation }) => {

  const { friendData, setFriendData } = useContext(FriendContext);

  const { friendList, setFriendList } = useContext(FriendListContext)

  const handlePress = (val) => {
    setFriendList({ ...val });
    navigation.goBack();
  };

  const handlePressDeleteFriend = (val) => {
    removeFriend(val.user_id).then((friendList) => {
      console.log('friendList >> ', friendList)
      setFriendList({ ...friendList }); 
      // need to complete
      showAlert(`Your friend has been removed`)
    })
    .catch((err) => {
      showAlert('Could not remove friend')
    })
  };
  
  function showAlert(msg) {
    Alert.alert(msg)
}

  return (
    <View style={styles.background}>
      <View>
        <FlatList
          data={friendList.filter(friend => friend.location.status)}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <>
            <View style={item.location.status === true ? styles.pressable : styles.nonPressable}>
            <View style={styles.container}>
              <Text style={styles.statusLight}>🟢</Text> 
              <Pressable onPress={() => handlePress(item)}>
                <Item name={item.name} isBold={item.location.status === true} />
              </Pressable>

            </View>
            </View>
              <Pressable onPress={() => handlePressDeleteFriend(item)}>
              <View style={styles.deletePressable}>
                <Text style={styles.crossSymbol}>❌</Text>
              </View>
              </Pressable>
            </>
          )}
        />
      </View>
    <View>

      <FlatList
        data={friendList.filter(friend => !friend.location.status)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <>
          <View style={item.location.status === true ? styles.pressable : styles.nonPressable}>
            <View style={styles.container}>
              <Text style={styles.statusLight}>⚪</Text>
              <Item name={item.name} />
              <Pressable onPress={() => handlePressDeleteFriend(item)}>
              <View style={styles.deletePressable}>
                <Text style={styles.crossSymbol}>❌</Text>
              </View>
              </Pressable>
            </View>
          </View>
          </>
        )}/>

        </View>
    </View>
  );
};

const styles = StyleSheet.create({

  background: {
    paddingLeft:15,
    paddingRight:15,
    height: '100%',
    backgroundColor: "#fff",
  },
  
  container: {
    marginLeft:20,
    display:"flex",
    flexDirection:"row",
    gap: 15,
  },
  
  pressable: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingTop:15,
    paddingBottom:15,
    backgroundColor: "#248DFF",
    borderRadius: 100,
    marginVertical: 4, 

  },
  nonPressable: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center', 
    paddingTop:15,
    paddingBottom:15,
    backgroundColor: '#E5E5E5',
    borderRadius: 100,
    marginVertical: 4, 
    
  },
  boldText:{
    color: 'white',
    fontSize:18,
    fontWeight: "bold",
    
  },

  normalText:{
    color: 'gray',
    fontSize:18,
    // fontWeight: "bold",
    
  },

  statusLight: {
    fontSize:18
  },
  deletePressable: {
    // width: '50%',
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 15,
    backgroundColor: "pink",
    borderRadius: 100,
    marginVertical: 4, 


    // marginLeft:20,
    // display:"flex",
    // flexDirection:"row",
    // gap: 15,
    // backgroundColor: 'pink',
    // borderRadius: 100,
  },

  crossSymbol: {
    fontSize:18,
    // backgroundColor: 'pink',
    // borderRadius: 100,
  }
});
