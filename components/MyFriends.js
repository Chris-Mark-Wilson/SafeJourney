import { View, Text, FlatList, Pressable, SectionList, StyleSheet } from "react-native"
import { appStyle } from "../styles/appStyle"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import users from "../testData/users"
import axios from 'axios'
import { getFriends } from "../utils/api"


const Item = ({name}) => (
    <View style={styles.name}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );


export const MyFriends=({setFriendData})=>{

    const {userData, setUserData} = useContext(UserContext)
    const [friends, setFriends] = useState([])

let friendsList=[]
    useEffect(()=> {
        
        getFriends(userData.userId)
        .then((friendList) => {
            console.log(friendList)
           setFriends(friendList)
           })
            
        
    }, [userData.userId])


    return(
        <View style={appStyle.container}>
             <Text>My Friends</Text>
            {/* {friends.map((friend) => {
                return (<Text>{friend.name}</Text>)
            })}
            */} 
          <FlatList

data={friends}
renderItem={({ item }) =>
          item.status === "travelling" ? <Pressable onPress={handlePress} value = {item.name}><Item name={item.name} /></Pressable> : <Item name={item.name} />
        }
keyExtractor={item => item.name}
// data={friends.map(friend=>{
// return(friend.status==="travelling"?
// (
// <Pressable onPress={handlePress} value = {friend}>
// <Text>{friend.name}</Text>
// </Pressable>
// )
// :
// (<Text>{friend.name}</Text>)
// )
// })}
/>
        </View>
       
        
    )
}
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