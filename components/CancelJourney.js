import { StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native"
import { endJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";
import { appStyle } from "../styles/appStyle";

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
      <View style={appStyle.centreContainer}>
        <TouchableOpacity style={appStyle.button} onPress={onPress}>
            <Text style={appStyle.buttonText} >Cancel Journey</Text> 
        </TouchableOpacity> 
      </View>
    )
}

