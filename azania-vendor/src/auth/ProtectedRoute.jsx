import { Navigate, Outlet, useLocation } from "react-router-dom";

// Optional: pass in allowedRoles for role-based protection
function ProtectedRoute({ children, allowedRoles }) {
  const location = useLocation();

  // Get token and user from localStorage
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // 1️⃣ Not authenticated
  if (!token || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2️⃣ Role-based authorization
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // 3️⃣ Render children if passed, otherwise render nested routes
  return children ? children : <Outlet />;
}

export default ProtectedRoute;