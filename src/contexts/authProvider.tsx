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
      const verified = await axios.get(`${url}/token `, {
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
    }
    setLoading(false);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
