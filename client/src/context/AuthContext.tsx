import {createContext, useState } from "react";

type AuthContextTypes = {
    token: string | null;
    Login: (token: string)=>void;
    Logout: ()=>void;
}

const defaultAuth: AuthContextTypes={
    token: null,
    Login: ()=>{},
    Logout: ()=>{}
}

export const AuthContext = createContext<AuthContextTypes>(defaultAuth);

export function AuthProvider({children}:{children: React.ReactNode}){

    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const Login = (token: string) => {
        localStorage.setItem("token", token)
        setToken(token)
    }
    const Logout = ()=>{
        localStorage.removeItem("token")
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{token, Login, Logout}}>{children}</AuthContext.Provider>
    )
    
}