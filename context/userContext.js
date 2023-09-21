import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        user_id: 1,  
        name: 'Gemma',  
        phoneNumber: '07900000001',  
        location: {
            status: false,
            start: {lat: null, long: null},
            current: {lat: null, long: null},
            end: {lat: null, long: null}
        },  
        friendList: [2,3,4,5,6]
    })

    return (
        <UserContext.Provider value={{userData, setUserData}}>
        {children}
        </UserContext.Provider>
    )
}