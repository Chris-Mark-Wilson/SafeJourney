import { StatusBar } from "expo-status-bar";
import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from "react-native";
import { logIn, signUp } from "../utils/api";
import { UserContext } from "../context/userContext";
import { ScrollView } from "react-native-gesture-handler";

export function SignIn({navigation}) {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [logInNumber, setLogInNumber] = useState('')
  const {userData, setUserData} = useContext(UserContext)

  function onPressSignIn() {
    if(!name || !phoneNumber){
      showAlert('Please enter a Name and Phone Number')
    } else {
      signUp(name, phoneNumber)
      .then((user) => {
         setUserData(user)
         setPhoneNumber('')
         setName('')
         navigation.navigate('Home')
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }

  function onPressLogIn() {
    if(!logInNumber){
      showAlert('Please enter your Phone Number')
    } else {
      logIn(logInNumber).then((user) => {
        setUserData(user)
        setLogInNumber('')
        navigation.navigate('Home')
      })
     .catch((err) => {
        showAlert(err.response.data.msg)
      })
    }
  }
  
  function showAlert(msg) {
    Alert.alert(msg)
  }

  return (
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
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
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
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom:60,
    backgroundColor: "#FF1493",
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