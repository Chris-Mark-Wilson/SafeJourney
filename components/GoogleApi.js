import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'
import { StartJourney } from "./StartJourney";
import { UserContext } from "../context/userContext";

const GoogleApi = () => { console.log("APIKEY>>>",API_KEY)

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
          types: "(cities)"
        }}
        onFail={(error)=>console.log(error)}
        styles={{
          textInput: styles.textInput,
        }}
      />
      <View >
      <StartJourney start={userData.location.current} end={end} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    position:"absolute",
    top:0,
    left :"40%"
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
});

export default GoogleApi;