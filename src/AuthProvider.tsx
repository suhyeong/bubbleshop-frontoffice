import {Context, createContext, ReactElement, useContext, useEffect, useState} from "react";
import api from "./common/commonApi";
import {AxiosResponse} from "axios";
import {AuthContextValue, GetMemberAuth} from "./common/commonInterface";

const AuthContext = createContext<AuthContextValue>({} as AuthContextValue);

export const AuthProvider = ({ children } : { children: ReactElement }) => {
    const [ isMember, setIsMember ] = useState<boolean>(false);
    const [ isLoading, setIsLoading ] = useState<boolean>(true);

    const login = () => setIsMember(true);
    const logout = () => setIsMember(false);

    useEffect(() => {
        api.get(`/member-proxy/member/v1/auth`)
            .then((response: AxiosResponse<GetMemberAuth>) => {
                setIsMember(response.data.isMember);
                setIsLoading(false);
            });
    }, []);

    return isLoading ? (<></>) : (
        <AuthContext.Provider value={{ isMember, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);