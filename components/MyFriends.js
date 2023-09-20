import { View, Text } from "react-native"
import { appStyle } from "../styles/appStyle"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import users from "../testData/users"
import axios from 'axios'
import { getFriends } from "../utils/api"


export const MyFriends=({setFriendData})=>{

    const {userData, setUserData} = useContext(UserContext)
    const [friends, setFriends] = useState([])

let friendsList=[]
    useEffect(()=> {
        
        getFriends(userData.userId)
        .then((friendList) => {
           setFriends(() => {
            return [...friendList]
           })
            
        })
    }, [])


    return(
        <View style={appStyle.container}>
            <Text>My Friends</Text>
            {friends.map((friend) => {
                
            })}
            <Text>{friends}</Text>
        </View>
       
        
    )
}