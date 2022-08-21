import React from 'react'
import {useState, useContext} from 'react'

export const User = React.createContext();
export const SetUser = React.createContext();

export const useUser = () => {
    return useContext(User);
}

export const useSetUser = () => {
    return useContext(SetUser);
}

export default function UserContext({value, children}) {
    const [user, setUser] = useState(value)
  return (
        <User.Provider value={user}>
            <SetUser.Provider value={setUser}>
                {children}
            </SetUser.Provider>
        </User.Provider>
  )
}
