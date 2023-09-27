import { StyleSheet, Text, View, TouchableOpacity, Alert} from "react-native"
import { startJourney } from "../utils/api"
import { useContext } from "react"
import { UserContext } from "../context/userContext";
import { appStyle } from "../styles/appStyle";

export function StartJourney({ setTravelType }) {

    const { userData, setUserData } = useContext(UserContext)

    const selectTravelType = () => {
        Alert.alert('Travel Directions', 'Please select your type of travel', [
          {
            text: 'Walking            ',
            onPress: () => {
                setTravelType('WALKING')
                showAlert('You have started your journey')
            }
          },
          {text: '  Driving                  ', onPress: () => {
            setTravelType('DRIVING')
            showAlert('You have started your journey')
            }
          }
        ]);
    }

    function onPress(){
        const start = userData.location.current
        const end = userData.location.end

        if(!start.lat || !end.lat){
            showAlert('Please input a destination')
        } else {
            startJourney(userData.user_id, start, end).then(() => {
                selectTravelType()
                setUserData((currData) => {
                    const newData = JSON.parse(JSON.stringify(currData))
                    newData.location.status = true
                    newData.location.start = start
                    newData.location.end = end
                    return newData
                })
                }).catch((err) => {
                    console.log(err.response.data.msg, 'Error Here <<<');
            })
        }
    }

    function showAlert(msg) {
        Alert.alert(msg)
    }

    return (
        <View style={appStyle.centreContainer}>
        <TouchableOpacity style={appStyle.button} onPress={onPress}>
            <Text style={appStyle.buttonText} >Start Journey</Text> 
        </TouchableOpacity> 
        </View>
    )
}

