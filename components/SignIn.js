import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity,} from "react-native";
import { signUp } from "../utils/api";
import { UserContext } from "../context/userContext";

export function SignIn() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  function onPress() {
    signUp (name, phoneNumber)
    .then((user) => {
       const {setUserData} = useContext(UserContext)
       setUserData(user)
    })

}

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={name}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(input) => setName(input)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={phoneNumber}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(input) => setPhoneNumber(input)}
        /> 
      </View> 
      <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
        <Text style={styles.loginText} >LOGIN</Text> 
      </TouchableOpacity> 
    </View> 
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});