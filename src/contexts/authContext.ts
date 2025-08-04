import { createContext, useContext } from "react";

type contextProps = {
    isAuthenticated: boolean
    loading: boolean
}

export const AuthContext = createContext<contextProps | null>(null);
export const useAuth = () =>{
    const user = useContext(AuthContext)
    if(!user){
        throw new Error("AuthContext must be used with user.")
    }
    return {isAuthenticated: user.isAuthenticated, loading:user.loading}
} 
