import { FiClipboard, FiUsers } from "react-icons/fi";
import DashboardCard from "../../components/cards/DashboardCard";
import ReportCard from "../../components/cards/ReportCard";
import { useSchoolStore } from "../../store/useSchoolStore";

const Report = () => {
  const { users, classes } = useSchoolStore();

  const students = users.filter((user) => user.role === "student").length;

  const teachers = users.filter((user) => user.role === "teacher").length;

  const totalClasses = classes.length;

  const classesWithStudents = classes.filter(
    (item) =>  item.students.length > 0,
  ).length || 0

  const emptyClasses = classes.filter(
    (item) =>  item.students.length === 0,
  ).length || 0

  return (
    <div className="p-2 lg:4">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold text-teal-600">Administration</p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Reports
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Overview of your school's current data.
        </p>
      </div>

      {/* Summary */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Students */}
        <DashboardCard
          title="Total Students"
          value={students}
          icon={FiUsers}
          iconStyle="bg-blue-50 text-blue-600"
        />

        {/* Teachers */}
        <DashboardCard
          title="Total Teachers"
          value={teachers}
          icon={FiUsers}
          iconStyle="bg-emerald-50 text-emerald-600"
        />

        {/* Classes */}
        <DashboardCard
          title="Classes"
          value={totalClasses}
          icon={FiClipboard}
          iconStyle="bg-orange-50 text-orange-500"
        />
      </div>

      {/* Detailed Reports */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Student Report */}
        <ReportCard
          title={"Student Report"}
          description={"Current student statistics"}
          rowTitle1={"Total Students"}
          rowTitle2={"Registered Students"}
          rowTitle3={"Other Users"}
          value1={students}
          value2={students}
          value3={users.filter((user) => user.role !== "student").length}
        />

        {/* Teacher Report */}
        <ReportCard
          title={"Teacher Report"}
          description={"Current teacher statistics"}
          rowTitle1={"Total Teachers"}
          rowTitle2={"Registered Teachers"}
          rowTitle3={"Other Users"}
          value1={teachers}
          value2={teachers}
          value3={users.filter((user) => user.role !== "teacher").length}
        />

        {/* Class Report */}
        <ReportCard
          title={"Teacher Report"}
          description={"Current class statistics"}
          rowTitle1={"Total Classes"}
          rowTitle2={"Classes With Students"}
          rowTitle3={"Empty Classes"}
          value1={totalClasses}
          value2={classesWithStudents}
          value3={emptyClasses}
        />
      </div>
    </div>
  );
};

export default Report;
