import { FiBookOpen, FiFileText, FiUsers } from "react-icons/fi";
import DashboardCard from "../../components/cards/DashboardCard";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useNavigate } from "react-router-dom";
import DashboardList from "../../components/DashboardList";

const TeacherDashboard = () => {
  const {currentUser,users,classes,assignments}=useSchoolStore()
  const navigate = useNavigate()
  
  const students = users.filter((user) => user.role === "student")
  
  const myClasses = classes.filter((item)=>item.teacherId===currentUser?.id)
 
  return (
    <div className="p-2 lg:p-4">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-semibold text-teal-600">Teacher Dashboard</p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back, {currentUser?.name || "Teacher"}
        </h1>

        <p className="mt-2 text-slate-500">
          Here's what's happening with your classes today.
        </p>
      </div>

      {/* Stats / Cards */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total Classes"
          value={classes.length}
          icon={FiBookOpen}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          buttonText="View my classes"
          onClick={() => navigate("/teacher/classes")}
        />

        <DashboardCard
          title="Total Students"
          value={students.length}
          icon={FiUsers}
          iconStyle="bg-blue-50 text-blue-600"
          textStyle="text-blue-600 hover:text-blue-700"
          buttonText="View students"
          onClick={() => navigate("/teacher/students")}
        />

        <DashboardCard
          title="Total Assignments"
          value={assignments.length}
          icon={FiFileText}
          iconStyle="bg-orange-50 text-orange-500"
          textStyle="text-orange-500 hover:text-orange-600"
          buttonText="View my assignments"
          onClick={() => navigate("/teacher/assignments")}
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* My Classes */}
        <DashboardList
          title="My Classes"
          description=" Your scheduled classes."
          items={myClasses}
          viewAllPath="/teacher/classes"
          icon={FiBookOpen}
        />

        {/* Recent Activity */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="font-bold text-slate-900">Recent Activity</h2>

            <p className="mt-1 text-sm text-slate-500">
              Overview of your classroom data.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="flex items-center gap-4 px-6 py-4">
              <div className="h-2.5 w-2.5 rounded-full bg-teal-500" />

              <p className="text-sm text-slate-600">
                {classes.length} classes available.
              </p>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />

              <p className="text-sm text-slate-600">
                {assignments.length} assignments available.
              </p>
            </div>

            <div className="flex items-center gap-4 px-6 py-4">
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

              <p className="text-sm text-slate-600">
                {students.length} registered students.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default TeacherDashboard