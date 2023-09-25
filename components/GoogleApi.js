import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'
import { StartJourney } from "./StartJourney";
import { UserContext } from "../context/userContext";

const GoogleApi = () => { 

const { userData } = useContext(UserContext);
const [end, setEnd] = useState({})

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      fetchDetails = {true}
        placeholder="Search for a destination"
        onPress={(_, details = null) => {
          setEnd({lat:details.geometry.location.lat, long: details.geometry.location.lng})
        }}
        query={{
          key: API_KEY , 
          language: "en", 
          types: "address"
        }}
        onFail={(error)=>console.log(error)}
        styles={{
          textInput: styles.textInput,
        }}
      />
      {end.lat&&<StartJourney start={userData.location.current} end={end} />}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
    position:"absolute",
    top:'7%',
  },
  textInput: {
    height: 40,
    width: 60,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  }
});

export default GoogleApi;