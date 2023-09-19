import { createContext, useState } from "react";


export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendData, setFriendData] = useState({
        startPoint : {latitude: null, longitude: null},
        endPoint: {latitude: null, longitude: null},
        currentLocation: {latitude: null, longitude: null},
        name: ""
       
    })
    return (
        <FriendContext.Provider value={{friendData, setFriendData}}>
        {children}
        </FriendContext.Provider>
    )
}