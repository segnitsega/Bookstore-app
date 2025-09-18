import axios from "axios";
import { useState, useEffect } from "react";
import type { PropsWithChildren } from "react";
import { AuthContext } from "./authContext";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const url = import.meta.env.VITE_BACKEND_API;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    try {
      const verified = await axios.get(`${url}/protected `, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!verified) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
    } catch (e) {
      setIsAuthenticated(false);
      console.log(e)
    }finally{
      setLoading(false);
    }
  };

  const login = (token: string) =>{
    localStorage.setItem("token", token)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  }

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
