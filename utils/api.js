import axios from 'axios'



const BASE_URL = `https://be-safejourney.onrender.com/api`

export const getFriends = (user_id) => {
    return axios.get(`${BASE_URL}/users/${user_id}/friends`)
    .then((response) => {
        return response.data.friendList
    })
    .catch((err)=>{
     console.log(err,"< = error in api catch")
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

export const addFriend = async (id, phoneNumber) => {
    const { data: {acknowledged} } = await axios.patch(`${BASE_URL}/users/${id}/friends`, {phoneNumber})
    return acknowledged
}