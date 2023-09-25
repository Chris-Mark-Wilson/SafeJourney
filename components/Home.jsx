import { View, Text, Button, ActivityIndicator } from "react-native";
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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const Home = () => {
  const timerInterval = 10000;

  const { userData, setUserData } = useContext(UserContext);
  if(!userData) return <SignIn/>

  const { friendData, setFriendData } = useContext(FriendContext);
  const { friendList, setFriendList } = useContext(FriendListContext)
  
  const [whosJourney, setWhosJourney] = useState(null);
  const [region, setRegion] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(0);

    useEffect(()=>{
      setTimeout(()=>{
        setTimer(timer+1)
        },timerInterval)
    },[timer])

    useEffect(() => {
      updateFriendList(userData.user_id, friendList, setFriendList)
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
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          checkIfJourneyEnd(userData, setUserData).then(() => {
            if(userData.location.status){
              updateJourney(userData.user_id, { lat: latitude, long: longitude })
            }
          })
        })
      }
      if(whosJourney==='friend'){
        getFriendById(friendData.user_id).then((user) => {
          setFriendData(user)
        })
      }
    }, [timer])

  useEffect(() => {
    if (whosJourney === "user" || whosJourney === null) {
      setIsLoading(true);
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
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setIsLoading(false);
      });
    }
  }, [whosJourney]);

  useEffect(() => {
    if (friendData.location.status) {
      setWhosJourney("friend")
      setRegion({
        latitude: friendData.location.current.lat,
        longitude: friendData.location.current.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      setWhosJourney(userData.location.status ? "user" : null);
    } 
  }, [friendData]);

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

  return isLoading ? (
    <ActivityIndicator size="large" color="grey" />
  ) : (
    <View style={appStyle.container}>
      {whosJourney === "friend" ? (
        <JourneyMap region={region} data={friendData} setRegion={setRegion} />
      ) : (
        <JourneyMap region={region} setRegion={setRegion} data={userData} />
      )}

      {userData.name && whosJourney === "user" && (
        <Text style={appStyle.nameText}>{userData.name}</Text>
      )}
      {whosJourney === "friend" && (
        <Text style={appStyle.nameText}>{friendData.name}</Text>
      )}
      {whosJourney === "friend" && (
        <Button title="return" onPress={handleReturn} />
      )}
      {whosJourney === "user" &&(
        <CancelJourney/>
      )}
      {whosJourney === null && <GoogleApi />}
    </View>
  );
};
