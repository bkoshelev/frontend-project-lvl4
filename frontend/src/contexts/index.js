import { createContext, useState } from 'react';
import { getUserId } from '../utils';
import { createNewSocketConnection } from '../utils/socket';


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const hasToken = !!getUserId()?.token
    const [loggedIn, setLoggedIn] = useState(hasToken);

    const logIn = () => {
        setLoggedIn(true);
    }
    const logOut = () => {
        localStorage.removeItem('userId');
        setLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};



export const SocketContext = createContext({})

export const SocketProvider = ({ children }) => {
    return <SocketContext.Provider value={createNewSocketConnection()}>
        {children}
    </SocketContext.Provider>
}
