import { FiCalendar, FiFileText, FiUser, FiUsers } from "react-icons/fi";
import DashboardCard from "../../components/cards/DashboardCard";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useNavigate } from "react-router-dom";
import DashboardList from "../../components/DashboardList";

const AdminDashboard = () => {
  const navigate=useNavigate()
  const { currentUser,users, classes, assignments } = useSchoolStore()
  
  const students = users.filter((user) => 
  user.role==="student"
  ).length
  
  const teachers = users.filter((user) => 
  user.role==="teacher"
).length

  const totalClasses=classes.length
  const totalAssignments = assignments.length
  
  const recentUsers=[...users].reverse().slice(0,5)

  return (
    <div className="p-2 lg:p-4">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-teal-600">Administration</p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {currentUser?.name || "Admin"}
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your school.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 mb-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Students"
          value={students}
          icon={FiUsers}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          buttonText="View students"
          onClick={() => navigate("/admin/students")}
        />

        <DashboardCard
          title="Teachers"
          value={teachers}
          icon={FiUsers}
          iconStyle="bg-emerald-50 text-emerald-600"
          textStyle="text-emerald-600 hover:text-emerald-700"
          buttonText="View teachers"
          onClick={() => navigate("/admin/teachers")}
        />

        <DashboardCard
          title="Classes"
          value={totalClasses}
          icon={FiCalendar}
          iconStyle="bg-orange-50 text-orange-500"
          textStyle="text-orange-500 hover:text-orange-600"
          buttonText="View classes"
          onClick={() => navigate("/admin/classes")}
        />

        <DashboardCard
          title="Assignments"
          value={totalAssignments}
          icon={FiFileText}
          iconStyle="bg-blue-50 text-blue-600"
          textStyle="text-blue-600 hover:text-blue-700"
          buttonText="View assignments"
          onClick={() => navigate("/admin/assignments")}
        />
      </div>

      {/* Recently Registered Users */}
      <DashboardList
        title=" Recently Registered Users"
        description="Users registered in SchoolManagementSystem."
        items={recentUsers}
        viewAllPath="/admin/students"
        icon={FiUser}
      />
    </div>
  );
}

export default AdminDashboard