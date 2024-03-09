import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(
        () => {

        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
        }
    );


    const userDataLogin = (dataUser) => {
        setUser(dataUser)
        localStorage.setItem('user', JSON.stringify(dataUser));
    }

    const userDataLogout = () => {
        setUser(null)
        localStorage.removeItem('user');
        window.localStorage.setItem('AUTHENTICATED', '')
        window.localStorage.setItem('token', '')
    }


    return (
        <>
            <AuthContext.Provider value={{ userDataLogin, user, userDataLogout }}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const AuthUser = () => {
    return useContext(AuthContext);
};