import axios from 'axios'

const users = axios.create({baseURL: `https://be-safejourney.onrender.com/api`})

export const getFriends = async (id) => {
    try{const response  = await users.get(`/users/${id}/friends`)
if(!response.data) console.log("no data in getFreinds")
    return response.data.friendList}
catch(err){
    console.log(err,"err in getFriends")
    throw err
}
}

export const signUp = async (name, phoneNumber) => {
    try{const response= await users.post(`/users`, {name, phoneNumber})
    if(!response.data) console.log("no data in signup")
    return response.data.user}
    catch(err){
        console.log(err,"err in signup")
        throw err
    }
}

export const logIn = async (phoneNumber) => {
    console.log(phoneNumber)
    try{const response = await users.get(`/login/${phoneNumber}`)
    if(!response.data) console.log("no data in login")
    return response.data.user}
    catch(err){
        console.log(err,"err in login")
        throw err
    }
}

export const addFriend = async (id, phoneNumber) => {
    try{const response = await users.patch(`/users/${id}/friends`, { phoneNumber })
    if(!response.data) console.log("no data in addfreind")
    return response.data. acknowledged}
    catch(err){
        console.log(err,"err in addFriend")
        throw err
    }
}

export const endJourney = async (id) => {
    try{const response = await users.patch(`/users/${id}/location`, { status: false })
    if(!response.data) console.log("no data in endjourney")
    return response.data.acknowledged}
    catch(err){
        console.log(err,"err in endJourney")
        throw err
    }
}

export const startJourney = async (id, start, end) => {
    try{const response = await users.patch(`/users/${id}/location`, { status: true, start, end })
    if(!response.data) console.log("no data in startJourney")
    return response.data.acknowledged}
    catch(err){
        console.log(err,"err in startJourney")
        throw err
    }
}

export const updateJourney = async (id, current) => {
    try{const response= await users.patch(`/users/${id}/location`, { current })
    if(!response.data) console.log("no data in updateJourney")
    return response.data.acknowledged}
    catch(err){
        console.log(err,"err in updateJouney")
        throw err
    }
}

export const getFriendById = async (id) => {
    try{const response= await users.get(`/users/${id}`)
    if(!response.data) console.log("no data in getfriendbyid")
    return response.data.user}
    catch(err){
        console.log(err,"err in getfreindbyid")
        throw err
    }

}