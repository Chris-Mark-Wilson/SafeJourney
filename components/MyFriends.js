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


export const MyFriends=({navigation})=>{

    const {userData, setUserData} = useContext(UserContext)
    const{friendData,setFriendData}=useContext(FriendContext)

    const [friends, setFriends] = useState([])
 const [isLoading, setIsLoading] = useState(true)

    useEffect(()=> {
        setIsLoading(true)
        getFriends(userData.userId)
        .then((friendList) => {
           setFriends(() =>{
            return [...friendList]
           })
           setIsLoading(false) 
           })
          
        
    }, [])

    const  handlePress =  (val) => {
      console.log(val)
  
     setFriendData((friendData)=>{
      let newData = {...friendData}
      newData.currentLocation.latitude=val.location.current.lat
      newData.currentLocation.longitude=val.location.current.longitude
      newData.startPoint.latitude = val.location.start.lat
      newData.startPoint.longitude = val.location.start.long
      newData.endPoint.latitude = val.location.end.lat
      newData.endPoint.longitude = val.location.end.long
      newData.user_id=val.user_id
      return newData


     }); 
      navigation.navigate('Home'); 
    
    }
        
    
    return isLoading?<Text>Loading</Text>:
    (
        <View style={appStyle.container}>
             <Text>My Friends</Text>
            {/* {friends.map((friend) => {
                return (<Text>{friend.name}</Text>)
            })}
            */} 
          <FlatList

data={friends}
renderItem={({item }) =>
          item.location.status === true ? 
          <Pressable onPress={()=>handlePress(item)} style={appStyle.pressable}>
            <Item name={item.name} />
            </Pressable>
             : <Item name={item.name} />
        }
keyExtractor={item=> item.name}
// data={items.map(item=>{
// return(item.status==="travelling"?
// (
// <Pressable onPress={handlePress} value = {item}>
// <Text>{item.name}</Text>
// </Pressable>
// )
// :
// (<Text>{item.name}</Text>)
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