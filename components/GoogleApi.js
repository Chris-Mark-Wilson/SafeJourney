import React, { useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import{API_KEY} from '@env'
import { StartJourney } from "./StartJourney";
import { UserContext } from "../context/userContext";

const GoogleApi = ({ setTravelType }) => { 

const { userData, setUserData } = useContext(UserContext);

  function setEndLocation(details){
    setUserData((oldData)=>{
      const newData=JSON.parse(JSON.stringify(oldData))
      newData.location.end.lat = details.geometry.location.lat
      newData.location.end.long = details.geometry.location.lng
      return newData
    })
  }

  return (
    <>
    <View style={styles.container}>
      <GooglePlacesAutocomplete
      fetchDetails = {true}
        placeholder="Search for a destination"
        onPress={(_, details) => {
          setEndLocation(details)
        }}
        query={{
          key: API_KEY , 
          language: "en", 
          types:[ "address","establishment"]
        }}
        onFail={(error)=>console.log(error)}
        styles={{
          textInput: styles.textInput,
        }}
      />
    </View>
      <StartJourney setTravelType={setTravelType} />
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flex: 1,
    flexDirection: "row",
    position:"absolute",
    top:'8%',
    maxWidth: '100%',
    margin: 10
  },
  textInput: {
    height: 50,
    // width: 60,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    // marginTop: 10,
    // marginLeft: 10,
    // marginRight: 10,
    // padding: 10,
  }
});

export default GoogleApi;