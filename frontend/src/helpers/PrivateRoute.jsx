import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If token doesn't exist, redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token exists, allow access
  return children;
};

export default PrivateRoute;
