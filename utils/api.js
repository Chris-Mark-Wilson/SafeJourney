import axios from 'axios'
const apiUrl = ""
export const getFriends = (user_id) => {
    return axios.get(apiUrl)
    .then((response) => {
        return response.friendList
    })
    .catch((err)=>{
        next(err)
    })
}