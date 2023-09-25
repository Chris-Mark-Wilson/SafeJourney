import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import { logIn, signUp } from "../utils/api";
import { UserContext } from "../context/userContext";
import { ScrollView } from "react-native-gesture-handler";

export function SignIn({navigation}) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logInNumber, setLogInNumber] = useState('')
  const {userData, setUserData} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false);

  function onPressSignIn() {
    if(!name || !phoneNumber){
      showAlert('Please enter a Name and Phone Number')
    } else {
      setIsLoading(true)
      signUp(name, phoneNumber).then((user) => {
        setIsLoading(false)
        setUserData(user)
        setPhoneNumber('')
        setName('')
        navigation.navigate('Home')
      })
      .catch((err) => {
        setIsLoading(false)
        showAlert(err.response.data.msg)
      })
    }
  }

  function onPressLogIn() {
    if(!logInNumber){
      showAlert('Please enter your Phone Number')
    } else {
      setIsLoading(true)
      logIn(logInNumber).then((user) => {
        setIsLoading(false)
        setUserData(user)
        setLogInNumber('')
        navigation.navigate('Home')
      })
     .catch((err) => {
      setIsLoading(false)
        showAlert(err.response.data.msg)
      })
    }
  }
  
  function showAlert(msg) {
    Alert.alert(msg)
  }

  return isLoading ? (
      <ActivityIndicator size="large" color="grey" />
    ) : (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.textView}>
        <Text style={styles.text}>Create an account</Text>
      </View>
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
          keyboardType="numeric"
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          onChangeText={(input) => setPhoneNumber(input)}
        /> 
      </View> 
      <TouchableOpacity style={styles.loginBtn} onPress={onPressSignIn}>
        <Text style={styles.loginText} >Sign Up</Text> 
      </TouchableOpacity> 
      <View style={styles.textView}>
        <Text style={styles.text}>Log in</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={logInNumber}
          keyboardType="numeric"
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          onChangeText={(input) => setLogInNumber(input)}
        /> 
      </View> 
      <TouchableOpacity style={styles.loginBtn} onPress={onPressLogIn}>
        <Text style={styles.loginText} >Log In</Text> 
      </TouchableOpacity> 
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    width: "60%",
    height: 40,
    marginBottom: 10,
    alignItems: "center",
  },
  TextInput: {
    height: 40,
    flex: 1,
    padding: 5,
    marginLeft: 20,
    
  },
  loginBtn: {
    width: "40%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom:60,
    backgroundColor: "gray",
  },
  textView: {
    margin: 10,
  },
  text :{
    fontSize: 25,
  },
  scrollView: {
    backgroundColor: "#fff",
  }
});