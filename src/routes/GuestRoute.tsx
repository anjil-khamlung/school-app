import { Navigate, Outlet } from "react-router-dom";
import { useSchoolStore } from "../store/useSchoolStore";

const GuestRoute = () => {
  const { currentUser, isAuthenticated } = useSchoolStore();

  if (!isAuthenticated || !currentUser) return <Outlet />;

  return (
    <Navigate
      to={
        currentUser.role === "admin"
          ? "/admin"
          : currentUser.role === "teacher"
            ? "/teacher"
            : "/student"
      }
    />
  );
};

export default GuestRoute;
