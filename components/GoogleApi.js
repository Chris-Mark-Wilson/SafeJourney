import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'

const GoogleApi = ({setApiLocation}) => { console.log("APIKEY>>>",API_KEY)

const [apiLocation, setApiLocation] = useState({}) 

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      fetchDetails = {true}
        placeholder="Search for a destination"
        onPress={(data, details = null) => {
          console.log(details.geometry.location)
          setApiLocation(details.geometry.location)
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
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