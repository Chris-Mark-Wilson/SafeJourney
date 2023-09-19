import { View, Text} from "react-native"
import { appStyle } from "../styles/appStyle"
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState,useContext} from "react";
import { getLocation } from "../utils/getLocation";
import { UserContext} from "../context/userContext";



export const Home = () => {
    const{user,setUser} = useContext(UserContext)

    const [lat, setLat] = useState(52.57559667266577);
    const [long, setLong] = useState(-0.25841876864433294);
    const [whosJourney, setWhosJourney] = useState(null)
    const[destination,setDestination]=useState(null)

    const [region, setRegion] = useState(null);
      useEffect(()=>{
        getLocation()
        .then(( {latitude,longitude})=>{
            console.log(latitude,longitude, user)
            setLat(latitude)
            setLong(longitude)
            setRegion({
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,

            })
        }
        )
      },[])

    return (
        <View style={appStyle.container}>
            <MapView
          showsMyLocationButton={true}
          provider={PROVIDER_GOOGLE}
          style={appStyle.map}
          region={region}
          onRegionChange={() => {
            setRegion((region) => {
              return {
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              };
            });
          }}
        //   onPress={handlePress}
          showsPointsOfInterest={true}
          showsUserLocation={true}
        >
        {destination&&<Marker coordinate={destination}/> }
        <Text style={appStyle.nameText}>{user}</Text>
        </MapView>

        </View>
    )
}