import { appStyle } from "../styles/appStyle";
import MapView from 'react-native-maps'
import { PROVIDER_GOOGLE } from "react-native-maps";

export default function JourneyMap({region,data,setRegion}){

    return(
      // <View style={appStyle.container}>
        <MapView
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE}
        style={appStyle.map}
        region={region}
        onRegionChange={() => {
          setRegion(region)
          // setRegion((region) => {
          // return  (
          //   {
          //     latitude:data.currentLocation.latitude,
          //     longitude:data.currentLocation.longitude,
          //     latitudeDelta: 0.005,
          //     longitudeDelta: 0.005,
          //   }
          // )
          // });
        }}
      //   onPress={handlePress}
        showsPointsOfInterest={true}
        showsUserLocation={true}
      >
      {/* {destination&&<Marker coordinate={destination}/> } */}
      
      </MapView>
      // </View>
    )
}