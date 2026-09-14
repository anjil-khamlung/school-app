import { FiBookOpen, FiFileText } from "react-icons/fi";
import DashboardCard from "../../components/cards/DashboardCard";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useNavigate } from "react-router-dom";
import DashboardList from "../../components/DashboardList";

const StudentDashboard = () => {
  const navigate=useNavigate()
  const { currentUser,  classes, assignments } = useSchoolStore()
  if(!currentUser)return

  const myClasses = classes.filter((item) => item.students.includes(currentUser.id))
  
  const recentAssignments=[...assignments].reverse().slice(0,5)
  
  return (
    <div className="p-2 lg:p-4">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-teal-600">Student Dashboard</p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {currentUser?.name || "Student"}
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your school activities.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
        <DashboardCard
          title="My Classes"
          value={myClasses.length}
          icon={FiBookOpen}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          buttonText="View classes"
          onClick={() => navigate("/student/classes")}
        />

        <DashboardCard
          title="Assignments"
          value={assignments.length}
          icon={FiFileText}
          iconStyle="bg-orange-50 text-orange-500"
          textStyle="text-orange-500 hover:text-orange-600"
          buttonText="View assignments"
          onClick={() => navigate("/student/assignments")}
        />
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* My Classes */}
        <DashboardList
          title="My Classes"
          description="Your enrolled classes"
          items={myClasses}
          viewAllPath="/student/classes"
          icon={FiBookOpen}
        />

        {/* Recent Assignments */}
        <DashboardList
          title="Recent Assignments"
          description=" Latest assignments"
          items={recentAssignments}
          viewAllPath="/student/assignments"
          icon={FiFileText}
          iconBg="bg-orange-50"
          iconColor="text-orange-500"
        />
      </div>
    </div>
  );
}

export default StudentDashboard