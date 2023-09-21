import { createContext, useState } from "react";


export const FriendContext = createContext();

export const FriendProvider = ({children}) => {
    const [friendData, setFriendData] = useState([{   
        user_id: 2,  
        name: 'Chris W',  
        phoneNumber: '07900000002',  
        location: {
            status: true,
            start: {lat: 53.810, long: -1.56},
            current: {lat: 53.81168, long: -1.5618},
            end: {lat: 53.81339, long: -1.5603}
        },  
    },
    {   user_id: 3,  
        name: 'Chris L',  
        phoneNumber: '07900000003',  
        location: {
            status: true,
            start: {lat: 53.8143, long: -1.57604},
            current: {lat: 53.81487, long: -1.56465},
            end: {lat: 53.81459, long: -1.5486}
        },  
    },
    {   user_id: 4,  
        name: 'Aminah',  
        phoneNumber: '07900000004',  
        location: { status: false,     
                    start: {lat: null, long: null},    
                    current: {lat: null, long: null},    
                    end: {lat: null, long: null}  
                },  
    }])

    return (
        <FriendContext.Provider value={{friendData, setFriendData}}>
        {children}
        </FriendContext.Provider>
    )
}