import { appStyle } from "../styles/appStyle";
import MapView from 'react-native-maps'
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import{ Marker}  from 'react-native-maps'
import{ API_KEY } from '@env'
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { startJourney } from "../utils/api";
import { Alert } from "react-native";
export default function JourneyMap({region,data,setRegion}){
  const {userData,setUserData}=useContext(UserContext)
  function showAlert(msg) {
    Alert.alert(msg)
}
const onPressHandler=(e)=>{
  console.log(e.nativeEvent.coordinate)

  setUserData((oldData)=>{
    const newData=JSON.parse(JSON.stringify(oldData))
    newData.location.end.lat=e.nativeEvent.coordinate.latitude
newData.location.end.long=e.nativeEvent.coordinate.longitude
    return newData
  })
const start=userData.location.start
const end=userData.location.end
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
    console.log('Error Here <<<');
    // showAlert(err.response.data.msg)
})
}

  if(!data) console.log('NO DAta here!!');
    return(
      
        <MapView
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={appStyle.map}
        region={region}
        onPress={onPressHandler}
        onRegionChange={() => {
          setRegion(region)
         
        }}
        // onPress={handlePress}
        showsPointsOfInterest={true}
        showsUserLocation={true}
      >{data.location.status &&
        <>
        <Marker coordinate={{latitude: data.location.start.lat, longitude: data.location.start.long}} pinColor = {"red"} title={"Start of Journey"}/> 
        <Marker coordinate={{latitude: data.location.current.lat, longitude: data.location.current.long}} pinColor = {"blue"} title={"Current Location"}/>
        <Marker coordinate={{latitude: data.location.end.lat, longitude: data.location.end.long}} pinColor = {"red"} title={"End of Journey"}/>
        </>}

     {data.location.status && 
     <MapViewDirections
      origin={{latitude: data.location.start.lat, longitude: data.location.start.long}}
      destination={{latitude: data.location.end.lat, longitude: data.location.end.long}}
      apikey={API_KEY}
      strokeWidth={3}
    strokeColor="hotpink"
  />}
      </MapView>
      
     
    )
}