import { StyleSheet, Text, View, TouchableOpacity} from "react-native"
import { startJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";

export function StartJourney({ start, end }) {

    const { userData } = useContext(UserContext)

    function onPress(){
        startJourney(userData.user_id, start, end).then(() => {
            showAlert('You have started your journey')
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
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "gray",
    }
})