import axios from 'axios'
import { UserContext } from "../context/userContext"

const BASE_URL = `https://be-safejourney.onrender.com/api`

export const getFriends = (user_id) => {
    return axios.get(`${BASE_URL}/users/${user_id}/friends`)
    .then((response) => {
        return response.data.friendList
    })
    .catch((err)=>{
        next(err)
    })
}