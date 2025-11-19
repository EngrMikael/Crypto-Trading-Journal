import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoutes ({ children }) {
    const { token } = useAuth();

    //chech if there is an active token
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}