import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/layouts/AppLayout";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import GuestRoute from "./GuestRoute";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layouts/DashboardLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import Settings from "../pages/Settings";
import Report from "../pages/admin/Report";
import Teachers from "../pages/admin/Teachers";
import Students from "../pages/Students";
import Classes from "../pages/teacher/Classes";
import Assignments from "../pages/teacher/Assignments";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Announcements from "../pages/admin/Announcements";
import SubmittedAssignments from "../pages/teacher/SubmittedAssignments";
import SubmittedAssignmentClasses from "../pages/teacher/SubmittedAssignmentsClasses";
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
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
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
      {
        element: <ProtectedRoute role="admin" />,
        children: [
          {
            path: "admin",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
              {
                path: "announcements",
                element: <Announcements />,
              },
              {
                path: "reports",
                element: <Report />,
              },
              {
                path: "teachers",
                element: <Teachers />,
              },
              {
                path: "students",
                element: <Students />,
              },
              {
                path: "classes",
                element: <Classes />,
              },
              {
                path: "assignments",
                element: <Assignments />,
              },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute role="teacher" />,
        children: [
          {
            path: "teacher",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <TeacherDashboard />,
              },
              {
                path: "announcements",
                element: <Announcements />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
              {
                path: "teachers",
                element: <Teachers />,
              },
              {
                path: "students",
                element: <Students />,
              },
              {
                path: "classes",
                element: <Classes />,
              },
              {
                path: "assignments",
                element: <Assignments />,
              },
              {
                path: "submittedAssignments/:classId",
                element: <SubmittedAssignments />,
              },
              {
                path: "submittedAssignments",
                element: <SubmittedAssignmentClasses />,
              },
            ],
          },
        ],
      },

      {
        element: <ProtectedRoute role="student" />,
        children: [
          {
            path: "student",
            element: <DashboardLayout />,
            children: [
              {
                index: true,
                element: <StudentDashboard />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
              {
                path: "announcements",
                element: <Announcements />,
              },
              {
                path: "classes",
                element: <Classes />,
              },
              {
                path: "assignments",
                element: <Assignments />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
