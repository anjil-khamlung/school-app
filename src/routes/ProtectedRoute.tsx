import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSchoolStore } from "../store/useSchoolStore";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useSchoolStore((state) => state.currentUser);
  const isAuthenticated = useSchoolStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !user) {
    return;
    <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
