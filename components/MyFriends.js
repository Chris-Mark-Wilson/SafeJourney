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
  //     console.log(val.name);
  //      console.log(val.location.current);
  //  console.log(val.location.start);
  //     console.log(val.location.end);

   
     setFriendData((friendData)=>{
      const newData = {...friendData}
      console.log(newData, "newData")
     }); 
      // navigation.navigate('Home'); 
    
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