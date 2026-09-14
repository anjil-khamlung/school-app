import { features, homeStats, roles } from "../data/homeData";
import { useSchoolStore } from "../store/useSchoolStore";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Roles from "../components/home/Roles";
import Cta from "../components/home/Cta";

const Home = () => {
  const {currentUser,users,isAuthenticated,classes,assignments}=useSchoolStore()
  

  const students = users.filter((item) => item.role === "student").length;

  const teachers = users.filter((item) => item.role === "teacher").length;

  const totalClasses = classes?.length || 0;

  const totalAssignments = assignments?.length || 0;

  // Latest registered users
  const recentUsers = [...users].reverse().slice(0, 2);

  // DASHBOARD PATH
  const dashboardPath =
    currentUser?.role === "admin"
      ? "/admin"
      : currentUser?.role === "teacher"
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
