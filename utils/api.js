import axios from 'axios'

const users = axios.create({baseURL: `https://be-safejourney.onrender.com/api`})

export const getFriends = async (id) => {
    const { data: {friendList} } = await users.get(`/users/${id}/friends`)
    return friendList
}

export const signUp = async (name, phoneNumber) => {
    const { data: {user} } = await users.post(`/users`, {name, phoneNumber})
    return user
}

export const logIn = async (phoneNumber) => {
    const { data: {user} } = await users.get(`/login/${phoneNumber}`)
    return user
}

export const addFriend = async (id, phoneNumber) => {
    const { data: {acknowledged} } = await users.patch(`/users/${id}/friends`, { phoneNumber })
    return acknowledged
}

export const endJourney = async (id) => {
    const { data: {acknowledged} } = await users.patch(`/users/${id}/location`, { status: false })
    return acknowledged
}

export const startJourney = async (id, start, end) => {
    const { data: {acknowledged} } = await users.patch(`/users/${id}/location`, { status: true, start, end })
    return acknowledged
}

export const updateJourney = async (id, current) => {
    const { data: {acknowledged} } = await users.patch(`/users/${id}/location`, { current })
    return acknowledged
}

export const getFriendById = async (id) => {
    const { data: {user} } = await users.get(`/users/${id}`)
    return user
}