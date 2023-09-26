import { Alert } from "react-native";
import { endJourney } from "../utils/api";
import * as Notifications from 'expo-notifications';

export const checkIfJourneyEnd = async ({ userData, setUserData }) => {

  const current = userData.location.current
  const end = userData.location.end

  function showAlert(msg) {
    Alert.alert(msg)
  }
  
  if( current.lat >= end.lat - 0.00035 &&
    current.lat <= end.lat + 0.00035 &&
    current.long >= end.long - 0.00035 &&
    current.long <= end.long + 0.00035){
    
    endJourney(userData.user_id).then(() => {
      setUserData((currData) => {
        const newData = JSON.parse(JSON.stringify(currData))
        newData.location.status = false
        newData.location.start = {lat: null, long: null}
        newData.location.end = {lat: null, long: null}
        return newData
      })
      showAlert('You have reached your destination')
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'You have reached your destination',
          body: `\n`,
          data: { data: 'goes here' },
        },
        trigger: null,
      });
    }).catch(() => {
      console.log('error in cancel journey, trying again ...')
      checkIfJourneyEnd({ userData, setUserData })
    })
  }
}