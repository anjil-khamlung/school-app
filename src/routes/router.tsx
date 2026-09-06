import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import GuestRoute from "./GuestRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <GuestRoute />,
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
