import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/authContext";
import spinner from "@/assets/spinner.svg";
import type { PropsWithChildren } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const {isAuthenticated, loading} = useAuth();

  if (loading) {
    return <div><img src={spinner} alt="Loading..." /></div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
