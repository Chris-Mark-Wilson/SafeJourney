import { appStyle } from "../styles/appStyle";
import MapView from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { Marker } from "react-native-maps";
import { API_KEY } from "@env";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function JourneyMap({
  region,
  data,
  setRegion,
  travelType,
  setZoomLevel
}) {
  const { userData, setUserData } = useContext(UserContext);

  const onPressHandler = (e) => {
    if (!data.location.status) {
      setUserData((oldData) => {
        const newData = JSON.parse(JSON.stringify(oldData));
        newData.location.end.lat = e.nativeEvent.coordinate.latitude;
        newData.location.end.long = e.nativeEvent.coordinate.longitude;
        return newData;
      });
    }
  };

  return (
    <MapView
      showsMyLocationButton={true}
      provider={PROVIDER_GOOGLE}
      style={appStyle.map}
      region={region}
      onPress={onPressHandler}
      onRegionChange={(newRegion) => {
        setZoomLevel(newRegion.latitudeDelta)
   
      }}
      showsPointsOfInterest={true}
      showsUserLocation={true}
      >
        
      {!userData.location.status && userData.location.end.lat &&
        <Marker coordinate={{latitude: data.location.end.lat, longitude: data.location.end.long}} pinColor = {"green"} title={"End of Journey"}/>
      }
      {data.location.status &&
      <>
        <Marker coordinate={{latitude: data.location.start.lat, longitude: data.location.start.long}} pinColor = {"red"} title={"Start of Journey"}/> 
        <Marker coordinate={{latitude: data.location.current.lat, longitude: data.location.current.long}} pinColor = {"#248DFF"} title={"Current Location"}/>
        <Marker coordinate={{latitude: data.location.end.lat, longitude: data.location.end.long}} pinColor = {"green"} title={"End of Journey"}/>
        </>}
      {data.location.status && <MapViewDirections
        origin={{latitude: data.location.start.lat, longitude: data.location.start.long}}
        destination={{latitude: data.location.end.lat, longitude: data.location.end.long}}
        apikey={API_KEY}
        strokeWidth={4}
        strokeColor="#248DFF"
        mode={travelType}
      />}
    </MapView>
  );
}
