import { StyleSheet, Text, View, TouchableOpacity} from "react-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext";

export function SignOut() {

    const { userData, setUserData } = useContext(UserContext)

    const onPress = () => {
        setUserData('')
      };

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text} >Sign Out</Text> 
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