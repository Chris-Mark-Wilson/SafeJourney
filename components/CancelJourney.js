import { StyleSheet, Text, View, TouchableOpacity} from "react-native"
import { endJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";

export function CancelJourney() {

    const { userData } = useContext(UserContext)

    function onPress(){
        endJourney(userData.user_id).then(() => {
            showAlert('You have cancelled your journey')
        }).catch((err) => {
            showAlert(err.response.data.msg)
        })
    }

    function showAlert(msg) {
        Alert.alert(msg)
      }

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text} >Cancel Journey</Text> 
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