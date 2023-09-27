import { StyleSheet } from "react-native";
export const appStyle = StyleSheet.create({
  // default styling

  appBackground:{
    height: "100%",
    backgroundColor: "#fff"
  },
  
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'start',
      zIndex:0,
    },

    centreContainer: {
      display: "flex",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10
    },

    headingText: {
      color: 'gray',
      fontWeight: 'bold',
      fontSize: 24,
      margin: 10,
     
    },
    headingUserText: {
      color: 'gray',
      fontSize: 18,
      marginTop: 10,
      // fontWeight: 'bold',
      
    },

    button:{
      
      justifyContent:"center",
    
      width: "50%",
      // borderRadius: 25,
      // height: 40,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
      marginBottom: 40,
      backgroundColor: "#248DFF",
      //new stuff
      borderRadius: 100,
      paddingBottom:15,
      paddingTop:15,
      paddingLeft:30,
      paddingRight:30,      
      
    },

    buttonText: {
      textAlign:"center",
      width:"100%",
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
      
  },

  // custom styling

  startJourneyButton:{
    width: "40%",
    // borderRadius: 25,
    // height: 40,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: 10,
    // marginBottom: 10,
    marginLeft: 10,
    // padding: 10,
    backgroundColor: "#248DFF",

    // new
    borderRadius: 100,
    height: 50,
    paddingBottom:15,
    paddingTop:15,
    paddingLeft:0,
    paddingRight:0,
},
  
  whosJourneyView: {
    
    zIndex: 1,
    flex: 1,
    flexDirection: "column",
    position:'absolute',
    // top:'8%',
    maxWidth: '100%',
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#248DFF",
    backgroundColor:"white",
    borderRadius:10,
    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
  },
  nameText:{
    color: "#248DFF",
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: "center",
    padding:"1%",
    margin:'auto',
  },

    // journeyMap component
  map:{
    width: "100%",
    height: "85%",
  },
 
  userContent:{
    flex: 0.1,
    paddingLeft:20,
    paddingTop: 20,
    //backgroundColor:"#E5D0E3",
    marginLeft:10,
    marginRight:10,
   
  }
});