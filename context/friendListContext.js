import { createContext, useState } from "react";

export const FriendListContext = createContext();

export const FriendListProvider = ({children}) => {
    const [friendList, setFriendList] = useState([])

    return (
        <FriendListContext.Provider value={{friendList, setFriendList}}>
            {children}
        </FriendListContext.Provider>
    )
}