import { createContext, useState } from "react";

export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendData, setFriendData] = useState({   
        user_id: 2,  
        name: 'Chris W',  
        phoneNumber: '07900000002',  
        location: {
            status: true,
            start: {lat: 53.810, long: -1.56},
            current: {lat: 53.81168, long: -1.5618},
            end: {lat: 53.81339, long: -1.5603}
        },  
    })

    return (
        <FriendContext.Provider value={{friendData, setFriendData}}>
        {children}
        </FriendContext.Provider>
    )
}