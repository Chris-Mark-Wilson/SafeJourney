import { StyleSheet, Text, View, TouchableOpacity} from "react-native"
import { useContext } from "react"
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import { FriendListContext } from "../context/friendListContext";

export function SignOut({ navigation }) {

    const { userData, setUserData } = useContext(UserContext)
    const { friendData, setFriendData } = useContext(FriendContext)
    const { friendList, setFriendList } = useContext(FriendListContext)

    const onPress = () => {
        setUserData({ 
            user_id: null,  
            name: '',  
            phoneNumber: '',  
            location: { status: false,     
                        start: {lat: null, long: null},    
                        current: {lat: null, long: null},    
                        end: {lat: null, long: null}  
                    },  
            friendList: []
        })
        setFriendData({
            user_id: null,  
            name: null,  
            phoneNumber: '',  
            location: {
                status: false,
                start: {lat: null, long: null},
                current: {lat: null, long: null},
                end: {lat: null, long: null}
            }
        })
        setFriendList([])
        navigation.navigate('Home');
      };

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text} >Sign Out</Text> 
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 15,
    },
    button:{
        width: "40%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "gray",
    }
})