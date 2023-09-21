// require('dotenv').config({path: `${__dirname}/../.env.development`})

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

    return(
      
        <MapView
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={appStyle.map}
        region={region}
        onRegionChange={() => {
          setRegion(region)
         
        }}
      //   onPress={handlePress}
        showsPointsOfInterest={true}
        showsUserLocation={true}
      >
     <Marker coordinate={data.startPoint}/> 
     <Marker coordinate={data.endPoint}/>
     <MapViewDirections
      origin={data.startPoint}
      destination={data.endPoint}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
    strokeColor="hotpink"
  />
      </MapView>
     
    )
}