import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from "react-native"
import { useState, useContext } from "react"
import { addFriend } from "../utils/api"
import { UserContext } from "../context/userContext"

export const AddFriend=()=>{
  const { userData } = useContext(UserContext)
  const [phoneNumber, setPhoneNumber] = useState('')
   
  function onPress() {
      if(!phoneNumber){
        showAlert('Please input a phone number')
      } else {
        addFriend(userData.user_id, phoneNumber).then(() => {
          setPhoneNumber('')
          showAlert(`Friend added`)
        })
       .catch((err) => {
          showAlert(err.response.data.msg)
        })
      }
    }
    
  function showAlert(msg) {
      Alert.alert(msg)
  }

  return(
      <View style={styles.container}>
          <Text style={styles.text}>Add Friend</Text>
          <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                value={phoneNumber}
                keyboardType="numeric"
                placeholder="Phone Number"
                placeholderTextColor="#003f5c"
                onChangeText={setPhoneNumber}
              /> 
          </View> 
          <TouchableOpacity style={styles.loginBtn} onPress={onPress}>
            <Text style={styles.loginText} >Add Friend</Text> 
          </TouchableOpacity> 
      </View>
  )
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
    }
})