import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { logIn, signUp } from "../utils/api";
import { UserContext } from "../context/userContext";
import { ScrollView } from "react-native-gesture-handler";
import { appStyle } from "../styles/appStyle";

export function SignIn({ navigation }) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logInNumber, setLogInNumber] = useState("");
  const { userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  

  function onPressSignIn() {
    if (!name || !phoneNumber) {
      showAlert("Please enter a Name and Phone Number");
    } else {
      setIsLoading(true);
      signUp(name, phoneNumber)
        .then((user) => {
          setIsLoading(false);
          setUserData(user);
          setPhoneNumber("");
          setName("");
          navigation.navigate("Home");
        })
        .catch((err) => {
          console.log(err,"err in signIncomponent on 500 server error")
          setIsLoading(false);
          showAlert(err.response.data.msg);
        });
    }
  }

  function onPressLogIn() {
    if (!logInNumber) {
      showAlert("Please enter your Phone Number");
    } else {
      setIsLoading(true);
      logIn(logInNumber)
        .then((user) => {
          setIsLoading(false);
          setUserData(user);
          setLogInNumber("");
          navigation.navigate("Home");
        })
        .catch((err) => {
          setIsLoading(false);
          showAlert(err.response.data.msg);
        });
    }
  }

  function showAlert(msg) {
    Alert.alert(msg);
  }

  return isLoading ? (
    <ActivityIndicator size="large" color="grey" />
  ) : (
    <View style={appStyle.appBackground}>
      <View style={appStyle.centreContainer}>
        <StatusBar style="auto" />
        <View style={styles.textView}>
          <Text style={appStyle.headingText}>Create an account</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={name}
            placeholder="Name"
            placeholderTextColor="#003f5c"
            onChangeText={(input) => setName(input)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={phoneNumber}
            keyboardType="numeric"
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={(input) => setPhoneNumber(input)}
          />
        </View>
        <TouchableOpacity style={appStyle.button} onPress={onPressSignIn}>
          <Text style={appStyle.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.textView}>
          <Text style={appStyle.headingText}>Log in</Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            value={logInNumber}
            keyboardType="numeric"
            placeholder="Phone Number"
            placeholderTextColor="#003f5c"
            onChangeText={(input) => setLogInNumber(input)}
          />
        </View>
        <TouchableOpacity style={appStyle.button} onPress={onPressLogIn}>
          <Text style={appStyle.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  inputView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "60%",
    height: 40,
    marginBottom: 10,
    paddingTop: 5,
    alignItems: "center",
  },
});
