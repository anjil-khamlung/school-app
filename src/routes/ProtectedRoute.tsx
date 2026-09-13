import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSchoolStore } from "../store/useSchoolStore";
import type { Role } from "../type/type.ts"

type ProtectedRouteProps = {
  role:Role,
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { currentUser, isAuthenticated } = useSchoolStore();

  // not logged in 
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && !role.includes(currentUser.role)) {
    if (currentUser.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    if (currentUser.role === "teacher") {
      return <Navigate to="/teacher" replace />;
    }

    return <Navigate to="/student" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
