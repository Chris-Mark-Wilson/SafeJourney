// require('dotenv').config({path: `${__dirname}/../.env.development`})

import { appStyle } from "../styles/appStyle";
import MapView from 'react-native-maps'
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

export default function JourneyMap({region,data,setRegion}){
  const GOOGLE_MAPS_APIKEY = "AIzaSyDdIPKdwYgd7PJXMkdKAdPmWve0BuuPDOQ";
  //console.log(process.env.apiKey)
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
      {/* {destination&&<Marker coordinate={destination}/> } */}
      <MapViewDirections
      origin={data.startPoint}
      destination={data.endPoint}
      apikey={GOOGLE_MAPS_APIKEY}
  />
      </MapView>
     
    )
}