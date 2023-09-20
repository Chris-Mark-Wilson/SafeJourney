import { View, Text } from "react-native"
import { appStyle } from "../styles/appStyle"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import users from "../testData/users"
import axios from 'axios'


export const MyFriends=({setFriendData})=>{

    const {userData, setUserData} = useContext(UserContext)
    const [friends, setFriends] = useState([])
let friendsList=[]
    useEffect(()=> {
         friendsList = axios.get(`https://be-safejourney.onrender.com/api/users/${userData.userId}/friends`)
       
        .then((response) => {

            console.log(response.data.friendList)
            return friendsObjects.map(friendObject => {
                return friendObject.name
            }).then((friendsList2) => {
                setFriends(friendsList2)
            })
            }
    )
    }, [friendsList])


    return(
        <View style={appStyle.container}>
            <Text>My Friends</Text>
            <Text>{friendsList}</Text>
        </View>
       
        
    )
}