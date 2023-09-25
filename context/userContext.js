import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [userData, setUserData] = useState( { user_id: 2,  
        name: 'Chris W',  
        phoneNumber: '07900000002',  
        location: { status: false,     
                    start: {lat: 0, long: 0},    
                    current: {lat: 0, long: 0},    
                    end: {lat: 0, long: 0}  
                },  
        friendList: [1,3,4,5,6]
    })
    return (
        <UserContext.Provider value={{userData, setUserData}}>
        {children}
        </UserContext.Provider>
    )
}