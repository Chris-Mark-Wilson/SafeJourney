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
import { ScrollView } from "react-native-gesture-handler";


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
    navigation.goBack();
  };

  return (
    <View style={styles.background}>
<View  style={styles.listContainer}>

      <FlatList
        data={friendList.filter(friend => friend.location.status)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={item.location.status === true ? styles.pressable : styles.nonPressable}>
            <View style={styles.container}>
              <Text style={styles.statusLight}>🟢</Text> 
              <Pressable onPress={() => handlePress(item)}>
                <Item name={item.name} isBold={item.location.status === true} />
              </Pressable>
            </View>
            </View>
          ) 
        }
        />
        </View>
<View  style={styles.listContainer}>

      <FlatList
        data={friendList.filter(friend => !friend.location.status)}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={item.location.status === true ? styles.pressable : styles.nonPressable}>
               <View style={styles.container}>
            <Text style={styles.statusLight}>⚪</Text>
        <Item name={item.name} /></View></View>
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

  listContainer: {
//  height: 'fitContent'
  },
  
  container: {
    marginLeft:20,
    display:"flex",
    flexDirection:"row",
    gap: 15,
  },
  
  pressable: {
    flexDirection: 'row',
    alignItems: 'center', 
    paddingTop:15,
    paddingBottom:15,
    backgroundColor: "#248DFF",
    borderRadius: 100,
    marginVertical: 4, 

  },
  nonPressable: {
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
  }
});
