import * as Location from 'expo-location';

export const getLocation = async ()=>{

    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status === 'granted'){
      const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({})
      return ({latitude,longitude})
    } else {
      return Promise.reject({msg: 'Location permission not given'})
    }

}