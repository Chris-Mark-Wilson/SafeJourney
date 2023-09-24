import { appStyle } from "../styles/appStyle";
import MapView from 'react-native-maps'
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import{Marker} from 'react-native-maps'
import{API_KEY} from '@env'

export default function JourneyMap({region,data,setRegion}){
  const{userData}=useContext(UserContext)
  const {friendData}=useContext(FriendContext)
  const GOOGLE_MAPS_APIKEY = API_KEY;
console.log(data,"<data")
console.log(friendData,"<firendData")
console.log(region)
    return(
      
        <MapView
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={appStyle.map}
        region={region}
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
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
    strokeColor="hotpink"
  />}
      </MapView>
      
     
    )
}