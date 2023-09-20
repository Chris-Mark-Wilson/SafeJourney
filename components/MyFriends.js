import { View, Text } from "react-native"
import { appStyle } from "../styles/appStyle"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "../context/userContext"
import users from "../testData/users"
import axios from 'axios'


export const MyFriends=({setFriendData})=>{

    const {user, setUser} = useContext(UserContext)
    const [friends, setFriends] = useState([])

    useEffect(()=> {
        const friendsList = axios.get(`https://be-safejourney.onrender.com/api/users/${user}`).friendList
        .then((friendsIds) => {
            return friendsIds.map(friendId => {
                return users[friendId-1].name
            }).then((friendsList2) => {
                setFriends(friendsList2)
            })
            }
    )
    }, [])


    return(
        <View style={appStyle.container}>
            <Text>My Friends</Text>
            <Text>{friends}</Text>
        </View>
    )
}