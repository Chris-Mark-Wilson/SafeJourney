import { View, Text, FlatList, Pressable, SectionList, StyleSheet } from "react-native"
import { appStyle } from "../styles/appStyle"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import { FriendContext } from "../context/friendContext"
import { getFriends } from "../utils/api"


const Item = ({name}) => (
    <View style={styles.name}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );


export const MyFriends=({navigation, whosJourney, setWhosJourney})=>{

    const {userData, setUserData} = useContext(UserContext)
    const{friendData,setFriendData}=useContext(FriendContext)

    const [friends, setFriends] = useState([])

let friendsList=[]
    useEffect(()=> {
        
        getFriends(userData.userId)
        .then((friendList) => {
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
          item.status === "travelling" ? <Pressable onPress={() => {setWhosJourney("friend").then(() => {setFriendData(item)}).then(()=>{navigation.navigate("Friend")})}} value = {item.name}><Item name={item.name} /></Pressable> : <Item name={item.name} />
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