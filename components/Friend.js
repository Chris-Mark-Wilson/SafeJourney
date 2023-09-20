import { View, Text } from "react-native"

export const Friend = (friendObject) => {
 return (
    <View style={appStyle.container}>
        <Text>Name: {friendObject.name}</Text>
        <Text>Current latitude:{friendObject.location.current.lat}</Text>
        <Text>Current longitude:{friendObject.location.current.long}</Text>
        <Text>Start Latitude:{friendObject.location.start.lat}</Text>
        <Text>Start longitude:{friendObject.location.start.long}</Text>
        <Text>End Latitude:{friendObject.location.end.lat}</Text>
        <Text>End longitude:{friendObject.location.end.long}</Text>
    </View>
 )
}
