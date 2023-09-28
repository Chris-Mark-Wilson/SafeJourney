import { View, Text, Button, ActivityIndicator, TouchableOpacity } from "react-native";
import { appStyle } from "../styles/appStyle";
import JourneyMap from "./JourneyMap";
import { useEffect, useState, useContext } from "react";
import { getLocation } from "../utils/getLocation";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import { FriendListContext } from "../context/friendListContext";
import { getFriendById, updateJourney } from "../utils/api";
import { checkIfJourneyEnd } from '../utils/checkIfJourneyEnd'
import GoogleApi from "./GoogleApi";
import {CancelJourney} from './CancelJourney'
import {SignIn} from './SignIn'
import * as Notifications from 'expo-notifications';
import { updateFriendList } from "../utils/updateFriendList";



export const Home = ({navigation}) => {  
  const timerInterval = 5000;
  const [zoomLevel,setZoomLevel]=useState(0.005)

  const { userData, setUserData } = useContext(UserContext);
  
  const { friendData, setFriendData } = useContext(FriendContext);
  const { friendList, setFriendList } = useContext(FriendListContext)
  
  const [whosJourney, setWhosJourney] = useState(null);
  const [region, setRegion] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const [travelType, setTravelType] = useState('WALKING')

    useEffect(()=>{
      setTimeout(()=>{
        console.log("tick..")
        setTimer(timer+1)
        },timerInterval)
    },[timer])

    useEffect(() => {
        {userData.user_id && updateFriendList(userData.user_id, friendList, setFriendList,friendData,setFriendData)}
      

    }, [timer, userData])

    useEffect(() => {
      if(whosJourney==='user'){
        getLocation(userData).then(({ latitude, longitude }) => {
          setUserData((currUserData) => {
            const newData = JSON.parse(JSON.stringify(currUserData));
            newData.location.current = {
              lat: latitude,
              long: longitude,
            };
            return newData;
          });
          setRegion({
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: zoomLevel,
            longitudeDelta: zoomLevel,
          });
          checkIfJourneyEnd({ userData, setUserData }).then(() => {
            if(userData.location.status){
              setTimeout(() => {
              updateJourney(userData.user_id, { lat: latitude, long: longitude })
              .then(() => {
                console.log('Updated current location <');
              }).catch((err) => {
                console.log('err did not update', '<');
              })
            }, 1000);
            }
          })
        })
        .catch(err=>{
          console.log(err)
        })
      }
      if(whosJourney==='friend'){
        setTimeout(() => {
          getFriendById(friendData.user_id).then((user) => {
            console.log('friend updated');
            setFriendData(user)
          }).catch((err) => {
            console.log('cant update friend');
          })  
        }, 1000);
      }
    }, [timer])

  useEffect(() => {
    if (whosJourney === null) {  //whosJourney === "user" || 
      // setIsLoading(true);
      getLocation(userData).then(({ latitude, longitude }) => {
        setUserData((currUserData) => {
          const newData = JSON.parse(JSON.stringify(currUserData));
          newData.location.current = {
            lat: latitude,
            long: longitude,
          };
          return newData;
        });
        setRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel,
        });
        // setIsLoading(false);
      })
      .catch(err=>{console.log(err,"in 2nd use effect of home line 117")});
    }
  }, [whosJourney, userData.user_id, timer]);

  useEffect(() => {
    if (friendData.location.status) {
      setWhosJourney("friend")
      setRegion({
        latitude: friendData.location.current.lat,
        longitude: friendData.location.current.long,
        latitudeDelta: zoomLevel,
        longitudeDelta: zoomLevel,
      });
    } else {
      setWhosJourney(userData.location.status ? "user" : null);
    } 
  }, [friendData,userData]);

  useEffect(() => {
    setWhosJourney(userData.location.status ? "user" : null);
  }, [userData])

  const handleReturn = () => {
    setFriendData({   
      user_id: null,  
      name: null,  
      phoneNumber:null,  
      location: {
        status: false,
        start: {lat: null, long: null},
        current: {lat: null, long: null},
        end: {lat: null, long: null}
      }
    })
  } 

  if(!userData.user_id) return <SignIn navigation={navigation}/>
  // if(!userData.user_id) navigation.navigate ("SignIn")

  return isLoading && userData.user_id ? (
    <ActivityIndicator size="large" color="grey" />
  ) : (
    <View style={appStyle.container}>
      {whosJourney === "friend" ? (
        <JourneyMap region={region} data={friendData} setRegion={setRegion} travelType={travelType} setZoomLevel={setZoomLevel}/>
      ) : (
        <JourneyMap region={region} setRegion={setRegion} data={userData} travelType={travelType}setZoomLevel={setZoomLevel}/>
      )}

      {userData.name && whosJourney === "user" && (
        <View style={appStyle.whosJourneyView}>
          <Text style={appStyle.nameText}>My Journey</Text>
        </View>
      )}
      {whosJourney === "friend" && (
        <View style={appStyle.whosJourneyView}>
          <Text style={appStyle.nameText}>{friendData.name}'s Journey</Text>
        </View>
      )}
      {whosJourney === "friend" && (
        <View style={appStyle.centreContainer}>
        <TouchableOpacity style={appStyle.button} onPress={handleReturn}>
        <Text style={appStyle.buttonText} >Return To Home</Text> 
        </TouchableOpacity> 
        </View>
      )}
      {whosJourney === "user" &&(
        <CancelJourney/>
      )}
      {whosJourney === null && <GoogleApi setTravelType={setTravelType}/>}
    </View>
  );
};
