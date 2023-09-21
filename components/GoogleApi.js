import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'
const GoogleApi = () => { console.log("APIKEYYYYYY",API_KEY)
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for a destination"
        onPress={(data, details = null) => {
          // Handle the selected destination here
          console.log("pressed mefdfgdgfdgfdgfdgfdfcvbcbv",data, details);
        }}
        query={{
          key: "AIzaSyARh4RFtAdAJbWnIv2kytSV20LLnGeWic4", // Your Google Maps API key
          language: "en", // Language preference
          types: "(cities)", // Restrict results to cities
        }}
        styles={{
          textInput: styles.textInput,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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