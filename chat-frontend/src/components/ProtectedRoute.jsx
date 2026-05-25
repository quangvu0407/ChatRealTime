import { Navigate } from "react-router-dom";
import userStore from "../stores/authStore";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = userStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
