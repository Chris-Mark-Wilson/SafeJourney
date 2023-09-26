import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({ 
        user_id: null,  
        name: '',  
        phoneNumber: '',  
        location: { status: false,     
                    start: {lat: null, long: null},    
                    current: {lat: null, long: null},    
                    end: {lat: null, long: null}  
                },  
        friendList: []
    })
    return (
        <UserContext.Provider value={{userData, setUserData}}>
        {children}
        </UserContext.Provider>
    )
}