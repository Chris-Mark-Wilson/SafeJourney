import * as Location from 'expo-location';

   

export const getLocation=()=>{


return  Location.requestForegroundPermissionsAsync()
 .then(({status})=>{
 
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      console.log("rejecting access")
      return Promise.reject(errorMsg);
    }
    return status;
})
.then((status)=>{

  return  Location.getCurrentPositionAsync({});
  })
  .then(({coords:{latitude,longitude}})=>{

return ({latitude,longitude})
  })
.catch(err=>{
  console.log(err,"err in catch")
  // return ({latitude:52.57559667266577,longitude:-0.25841876864433294})
})
}


