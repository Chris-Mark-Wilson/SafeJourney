import { View, Text} from "react-native"
import { appStyle } from "../styles/appStyle"
import MapView from 'react-native-maps'
import { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState,useContext} from "react";
import { getLocation } from "../utils/getLocation";
import { UserContext} from "../context/userContext";



export const Home = ({ userData,setUserData, friendData, setFriendData }) => {
    const{user,setUser} = useContext(UserContext)
/* 
const [lat, setLat] = useState(52.57559667266577);
    const [long, setLong] = useState(-0.25841876864433294);
*/
  
   setFriendData((friendData)=>{
    const newData = {...friendData}
    newData.currentLocation = {
        latitude: 52.57559667266577,
        longitude:-0.25841876864433294
    }
    return newData;
        
   })
    const [whosJourney, setWhosJourney] = useState("user")
   

    const [region, setRegion] = useState(null);
    useEffect(()=>{
        setRegion({
            latitude: friendData.currentLocation.latitude,
            longitude: friendData.currentLocation.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,

        })
        setWhosJourney((whosJourney)=>{
            
           return whosJourney === "friend"? "user":"friend"
        })
    },[friendData])
      useEffect(()=>{
        getLocation()
        .then(( {latitude,longitude})=>{
            console.log(latitude,longitude, user)
            
           setUserData((userData)=>{
                const newData = {...userData}
                newData.currentLocation = {
                    latitude: latitude,
                    longitude:longitude
                }
                return newData;
            })
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
            return  whosJourney === "user"?
              {
                latitude:userData.currentLocation.latitude,
                longitude:userData.currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }:
              {
                latitude:friendData.currentLocation.latitude,
                longitude:friendData.currentLocation.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            });
          }}
        //   onPress={handlePress}
          showsPointsOfInterest={true}
          showsUserLocation={true}
        >
        {/* {destination&&<Marker coordinate={destination}/> } */}
        
        </MapView>
        <Text style={appStyle.nameText}>{user}</Text>
        </View>
    )
}