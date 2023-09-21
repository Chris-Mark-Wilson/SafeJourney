import axios from 'axios'



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

export const signUp = async (name, phoneNumber) => {
    const { data: {user} } = await axios.post(`${BASE_URL}/users`, {name, phoneNumber})
    return user
}

export const logIn = async (phoneNumber) => {
    const { data: {user} } = await axios.get(`${BASE_URL}/login/${phoneNumber}`)
    return user
}