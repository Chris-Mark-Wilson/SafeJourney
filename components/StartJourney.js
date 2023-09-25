import { StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native"
import { startJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";

export function StartJourney({ start, end }) {

    const { userData, setUserData } = useContext(UserContext)

    function onPress(){
        console.log("line 11 StartJourney.js pressed start, end= ",end)
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

    function showAlert(msg) {
        Alert.alert(msg)
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text} >Start Journey</Text> 
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    button:{
        width: "40%",
        borderRadius: 25,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: "gray",
    }
})
