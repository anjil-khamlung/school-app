import { useNavigate } from "react-router-dom";
import { features, homeStats, roles } from "../data/homeData";
import { useSchoolStore } from "../store/useSchoolStore";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Roles from "../components/home/Roles";
import Cta from "../components/home/Cta";

const Home = () => {
  const navigate = useNavigate();
  const user = useSchoolStore((state) => state.currentUser);
  const isAuthenticated = useSchoolStore((state) => state.isAuthenticated);
  const users = useSchoolStore((state) => state.users);
  const classes = useSchoolStore((state) => state.classes);
  const assignments = useSchoolStore((state) => state.assignments);

  const students = users.filter((item) => item.role === "student").length;

  const teachers = users.filter((item) => item.role === "teacher").length;

  const totalClasses = classes?.length || 0;

  const totalAssignments = assignments?.length || 0;

  // Latest registered users
  const recentUsers = [...users].reverse().slice(0, 2);

  // DASHBOARD PATH
  const dashboardPath =
    user?.role === "admin"
      ? "/admin"
      : user?.role === "teacher"
        ? "/teacher"
        : "/student";

  const stats = homeStats({
    students,
    teachers,
    totalAssignments,
    totalClasses,
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {/*  HERO */}
      <Hero
        dashboardPath={dashboardPath}
        stats={stats}
        recentUsers={recentUsers}
        users={users}
        isAuthenticated={isAuthenticated}
      />

      {/*  STATS  */}
      <Stats stats={stats} />

      {/*  FEATURES  */}
      <Features features={features} />

      {/*  ROLES  */}
      <Roles roles={roles} />

      {/*  CTA  */}
      <Cta isAuthenticated={isAuthenticated} dashboardPath={dashboardPath} />
    </div>
  );
};

export default Home;
