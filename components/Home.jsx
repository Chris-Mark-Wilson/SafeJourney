import { View, Text, Button, Alert } from "react-native";
import { appStyle } from "../styles/appStyle";
import JourneyMap from "./JourneyMap";
import { useEffect, useState, useContext } from "react";
import { getLocation } from "../utils/getLocation";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import { endJourney, getFriendById, updateJourney } from "../utils/api";
import GoogleApi from "./GoogleApi";

export const Home = () => {
  const timerInterval = 20000;

  const { userData, setUserData } = useContext(UserContext);
  const { friendData, setFriendData } = useContext(FriendContext);

  const [whosJourney, setWhosJourney] = useState(null);

  const [region, setRegion] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);

    useEffect(()=>{
      if(whosJourney)
      setTimeout(()=>{
        setTimer(timer+1)
        },timerInterval)
    },[timer])

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
          updateJourney(userData.user_id, { lat: latitude, long: longitude })
        });
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
    console.log(friendData.location,"top of use effect")
    if (friendData.location.status) {
      setWhosJourney("friend")
      console.log("here");

      setRegion({
        latitude: friendData.location.current.lat,
        longitude: friendData.location.current.long,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      setWhosJourney(userData.location.status ? "user" : null);
    }
    console.log(whosJourney, "<in use effect");
 
  }, [friendData]);

  useEffect(() => {
    setWhosJourney(userData.location.status ? "user" : null);
  }, [userData])


  const handleReturn = () => {

    setFriendData((data)=>{
const obj={   user_id: null,  
  name: null,  
  phoneNumber:null,  
  location: {
      status: false,
      start: {lat: null, long: null},
      current: {lat: null, long: null},
      end: {lat: null, long: null}
    }
  }
    return obj;
})
  };

  return isLoading ? (
    <Text>Loading....</Text>
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
