import { View, Text } from "react-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { appStyle } from "../styles/appStyle";
import { SignOut } from "./SignOut";

export function UserPage ({ navigation }) {

    const { userData, setUserData } = useContext(UserContext)

 return (
    <View style={appStyle.container}>
        <Text>
        <Text style={appStyle.headingUserText}>
            Name:</Text> {userData.name}
        </Text>
        <Text>
        <Text style={appStyle.headingUserText}>
            Phone Number:</Text> {userData.phoneNumber}
        </Text>
        <SignOut navigation={ navigation }/>
    </View>
 )
}


