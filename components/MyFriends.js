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
        
         friendsList = getFriends(userData.userId)
        .then((friendList) => {
            // console.log(friendList)
            return friendList.map(friendObject => {
                // console.log("in map", friendObject.name)
                return friendObject.name
            }).then((friendsList2) => {
                console.log(friendsList2)
                setFriends(friendsList2)
            })
            }
    )
    }, [friendsList])


    return(
        <View style={appStyle.container}>
            <Text>My Friends</Text>
            <Text>{friends}</Text>
        </View>
       
        
    )
}