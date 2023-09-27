import { View, Text } from "react-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { appStyle } from "../styles/appStyle";
import { SignOut } from "./SignOut";

export function UserPage ({ navigation }) {

    const { userData, setUserData } = useContext(UserContext)

 return (
    <View style={appStyle.container}>
        <View style={appStyle.centreContainer}>

        {/* <Text style = {appStyle.userContent}> */}
            <Text style={appStyle.headingUserText}>
                Name: </Text> 
                <Text style={appStyle.headingText}>
                {userData.name}
            {/* </Text> */}
        </Text>

            {/* <Text style = {appStyle.userContent}> */}
            <Text style={appStyle.headingUserText}>
                Mobile Number: </Text> 
                <Text style={appStyle.headingText}>{userData.phoneNumber}
            {/* </Text> */}
        </Text>
        <SignOut navigation={ navigation }/>
        </View>
    </View>
   
 )
}


