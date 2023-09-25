import { endJourney } from "../utils/api";

export const checkIfJourneyEnd = async (userData, setUserData) => {
    console.log('in check end');
    const current = userData.location.current
    const end = userData.location.end

    if( current.lat >= end.lat - 0.0002 &&
        current.lat <= end.lat + 0.0002 &&
        current.long >= end.long - 0.0002 &&
        current.long <= end.long + 0.0002){

          endJourney(userData.user_id).then(() => {
              setUserData((currData) => {
                  const newData = JSON.parse(JSON.stringify(currData))
                  newData.location.status = false
                  newData.location.start = null
                  newData.location.end = null
                  return newData
              })
              console.log('Your Journey had ended')
            }).catch((err) => {
              console.log('Could not cancel journey')
            })
        }
}