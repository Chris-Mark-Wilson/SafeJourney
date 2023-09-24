export const checkIfJourneyEnd = (userData) => {
    const current = userData.location.current
    const end = userData.location.end

    if( current.lat >= end.lat - 0.0002 &&
        current.lat <= end.lat + 0.0002 &&
        current.long >= end.long - 0.0002 &&
        current.long <= end.long + 0.0002){
            return true
        } else {
            return false
        }
}