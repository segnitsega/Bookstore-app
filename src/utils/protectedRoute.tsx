import { useEffect } from "react"
import { Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.href = "/signin";
        }
    }, []);
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default ProtectedRoute