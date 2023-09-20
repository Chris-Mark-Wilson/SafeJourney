import { StyleSheet } from "react-native";
export const appStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
     // alignItems: 'center',
      justifyContent: 'start',
    },
    map: {
    //  top:40,
        width: "100%",
        height: "80%",
      },
    nameText:{
      position: "absolute",
      top:"5%",
      left:"40%",
      backgroundColor: "gray",
      color: "white",
      borderWidth: 1,
      borderRadius: 10,
      textAlign: "center",
      padding:"1%",
      // display : "flex",
      // justifyContent : "center",
      // alignItems : "center",
      margin:'auto',
      width: "15%",
      height: "5%",
    },
    pressable: {
      backgroundColor: "green"
    }
  });