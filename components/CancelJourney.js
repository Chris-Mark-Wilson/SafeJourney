import { StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native"
import { endJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";

export function CancelJourney() {

  const { userData, setUserData } = useContext(UserContext)

  const onPress = () => {
    endJourney(userData.user_id).then(() => {
      setUserData((currData) => {
        const newData = JSON.parse(JSON.stringify(currData))
        newData.location.status = false
        newData.location.start = {lat: null, long: null}
        newData.location.end = {lat: null, long: null}
        return newData
      })
      showAlert('You have cancelled your journey')
    }).catch(() => {
      console.log('error in cancel journey, trying again ...')
      onPress()
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