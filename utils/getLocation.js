import * as Location from 'expo-location';

export const getLocation = async (userData)=>{

  userData.locationPermission = true
  
  if(!userData.locationPermission){
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted'){
      userData.locationPermission = true
    }
  }

  if(userData.locationPermission){
    try{const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({})
    return ({latitude,longitude})
  }
  catch(err){
    console.log(err)
  }
  }
}