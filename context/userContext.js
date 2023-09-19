import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [userData, setUserData] = useState({
        startPoint : {latitude: null, longitude: null},
        endPoint: {latitude: null, longitude: null},
        currentLocation: {latitude: null, longitude: null},
        name: "",
        userId:1
    })

    const [user, setUser] = useState(5)

    return (
        <UserContext.Provider value={{user, setUser}}>
        {children}
        </UserContext.Provider>
    )
}