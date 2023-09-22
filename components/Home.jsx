import { View, Text, Alert } from "react-native";
import { appStyle } from "../styles/appStyle";
import JourneyMap from "./JourneyMap";
import { useEffect, useState, useContext } from "react";
import { getLocation } from "../utils/getLocation";
import { UserContext } from "../context/userContext";
import { FriendContext } from "../context/friendContext";
import { getFriends } from "../utils/api";

export const Home = () => {
  const timerInterval = 10000;

  const { userData, setUserData } = useContext(UserContext);
  const { friendData, setFriendData } = useContext(FriendContext);

  const [whosJourney, setWhosJourney] = useState(null);

  const [region, setRegion] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if(userData.location.status){

      setWhosJourney("user")
    }
    else setWhosJourney(null)
  }, []);


  //   useEffect(()=>{
  // setTimeout(()=>{
  //   setTimer((timer)=>{
  //     return timer+1
  //   })
  // },timerInterval)
  //   },[timer])

  // useEffect(()=>{
  //   setIsLoading(true)
  // if(whosJourney==="friend"){
  // getFriends(2)
  // .then(response=>{

  //   const friend = response.filter(friend =>{
  //     return friend.user_id === friendData.user_id
  //   })[0]

  /////////////////////This should be updated from response
  // setFriendData((friendData)=>{
  //   let newData={...friendData}
  //   newData.currentLocation={
  //   latitude:52.57559667266700,
  //   longitude:-0.25841876864433500
  // },
  // newData.startPoint={
  //   latitude:52.57559667266700,
  //   longitude:-0.25841876864433500
  // },
  // newData.endPoint={
  //   latitude:52.57559667266900,
  //   longitude:-0.2584187686440000
  // }
  // newData.user_id = 2
  // return newData
  // })
  /////////////////////
  //  setFriendData(()=>{
  //   let newData={...friend}
  //   newData.currentLocation={
  //   latitude:friend.location.current.latitude,
  //   longitude:friend.location.current.longitude
  // }
  //return newData
  // })
  //     setIsLoading(false)
  //   })
  //   .catch(error =>{
  //     console.log(error,"Error in home")

  //   })
  // }
  //   },[friendData,timer])
  //   useEffect(()=>{
  //       setFriendData((friendData)=>{
  //           const newData = {...friendData}
  //           newData.currentLocation = {
  //               latitude: 52.57559667266577,
  //               longitude:-0.25841876864433294
  //           }
  //           return newData;

  //      })

  // // },[])

  //   useEffect(()=>{
  //       setRegion({
  //           latitude: friendData.currentLocation.latitude,
  //           longitude: friendData.currentLocation.longitude,
  //           latitudeDelta: 0.005,
  //           longitudeDelta: 0.005,

  //       })
  //       setWhosJourney((whosJourney)=>{

  //          return whosJourney === "friend"? "user":"friend"
  //       })
  //   },[friendData])

  useEffect(() => {
    if(friendData.location.status){
      setWhosJourney("friend")
    }
    
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
      })
    }
      console.log(whosJourney)
     if (whosJourney === "friend") {
      console.log("here")
        setRegion({
          latitude: friendData.location.current.lat,
          longitude: friendData.location.current.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

    }
  }, [friendData]);

  return isLoading ? (
    <Text>Loading....</Text>
  ) : (
    <View style={appStyle.container}>
      {whosJourney === "friend" ? (
        <JourneyMap region={region} data={friendData} setRegion={setRegion} />
      ) : (
        <JourneyMap region={region} setRegion={setRegion} data={userData} />
      )}

      <Text style={appStyle.nameText}>{userData.name}</Text>
    </View>
  );
};
