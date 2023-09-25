import { StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native"
import { startJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";
import { appStyle } from "../styles/appStyle";

export function StartJourney({ start, end }) {

    const { userData, setUserData } = useContext(UserContext)

    function onPress(){
        console.log("line 11 StartJourney.js pressed start, end= ",end)
        if(!start || !end){
            showAlert('Please input a destination')
        } else {
            startJourney(userData.user_id, start, end).then(() => {
                showAlert('You have started your journey')
                setUserData((currData) => {
                    const newData = JSON.parse(JSON.stringify(currData))
                    newData.location.status = true
                    newData.location.start = start
                    newData.location.end = end
                    return newData
                })
            }).catch((err) => {
                showAlert(err.response.data.msg)
            })
        }
    }

    function showAlert(msg) {
        Alert.alert(msg)
    }

    return (
        <TouchableOpacity style={appStyle.startJourneyButton} onPress={onPress}>
            <Text style={appStyle.buttonText} >Start Journey</Text> 
        </TouchableOpacity> 
    )
}

