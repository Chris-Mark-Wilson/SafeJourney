import { View, Text } from "react-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import { appStyle } from "../styles/appStyle";
import { SignOut } from "./SignOut";

export function UserPage ({ navigation }) {

    const { userData, setUserData } = useContext(UserContext)

 return (
    <View style={appStyle.container}>
        <Text style={appStyle.headingText}>
            Name: {userData.name}
        </Text>
        <Text style={appStyle.headingText}>
            Phone Number: {userData.phoneNumber}
        </Text>
        <SignOut navigation={ navigation }/>
    </View>
 )
}