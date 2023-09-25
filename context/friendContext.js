import { createContext, useState } from "react";

export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendData, setFriendData] = useState({
        user_id: null,  
        name: null,  
        phoneNumber: '',  
        location: {
            status: false,
            start: {lat: null, long: null},
            current: {lat: null, long: null},
            end: {lat: null, long: null}
    }
})

    return (
        <FriendContext.Provider value={{friendData, setFriendData}}>
        {children}
        </FriendContext.Provider>
    )
}