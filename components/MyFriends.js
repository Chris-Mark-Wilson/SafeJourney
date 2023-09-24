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

const Item = ({ name,isBold }) => (
  <View >
    <Text style={isBold ?styles.boldText:styles.normalText}>{name}</Text>
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
     <FlatList
        data={friends}
        renderItem={({ item }) =>
        <View style={item.location.status === true ? styles.pressable : styles.nonPressable}>
        {item.location.status === true ? (
          <View style={styles.container}><Text>🟢</Text> 
          <Pressable onPress={() => handlePress(item)}>
          <Item name={item.name} isBold={item.location.status === true}/>
        </Pressable></View>
        ) : (
          <View style={styles.container}>
            <Text>🔴</Text>
            <Item name={item.name}/>
          </View>
           
        )}
        
      </View>
         
        }
        keyExtractor={(item) => item.name}
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
