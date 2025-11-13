import { createContext, useState, useContext, use } from "react";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = async (email, password) => {
        const res = await api.post("/login", {email, password});
        const accessToken = res.data.access_token;
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
        setUser({email});
    };
    const logout = () =>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    }

    const register = async (email, password) => {
        await api.post("/register", {email, password});
    };

    return (
        <AuthContext.Provider value = {{user, token, login, logout, register}}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);