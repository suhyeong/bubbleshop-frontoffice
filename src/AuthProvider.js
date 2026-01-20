import {createContext, useContext, useEffect, useState} from "react";
import api from "./common/CommonApi";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [ isMember, setIsMember ] = useState(false);

    const login = () => setIsMember(true);
    const logout = () => setIsMember(false);

    useEffect(() => {
        api.get(`/member-proxy/member/v1/auth`)
            .then(response => {
                setIsMember(response.data.isMember);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isMember, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);