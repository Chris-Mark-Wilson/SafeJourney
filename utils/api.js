import axios from 'axios'






const apiUrl = "https://be-safejourney.onrender.com/api/users/:userId/friends"
export const getFriends = (user_id) => {

    return axios.get(apiUrl)
    .then((response) => {
        
        return response.data.friendList
    })
    .catch((err)=>{
        next(err)
    })
}