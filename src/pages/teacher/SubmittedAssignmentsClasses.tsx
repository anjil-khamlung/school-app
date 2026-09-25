import { FiBookOpen } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useAssignments } from "../../store/useAssignments";
import { useClasses } from "../../store/useClasses";
import DashboardCard from "../../components/cards/DashboardCard";

const SubmittedAssignmentClasses = () => {
  const navigate = useNavigate();

  const { currentUser } = useSchoolStore();
  const { assignments } = useAssignments();
  const { classes } = useClasses();

  if (!currentUser) return null;

  // Only assignments created by the current teacher
  const myAssignments = assignments.filter(
    (assignment) => assignment.teacherId === currentUser.id,
  );

  // Get unique class IDs
  const classIds = [
    ...new Set(myAssignments.map((assignment) => assignment.classId)),
  ];

  // Find the actual class objects
  const myClasses = classIds
    .map((classId) => classes.find((item) => item.id === classId))
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-teal-600">
          Available Assignments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Select a class to view submitted assignments.
        </p>
      </div>

      {/* Classes */}
      {myClasses.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <FiBookOpen size={40} className="mx-auto text-slate-300" />

          <h2 className="mt-4 text-lg font-semibold text-slate-700">
            No classes found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            You haven't created any assignments yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {myClasses.map((classItem) => {
            if (!classItem) return null;

            const classAssignments = myAssignments.filter(
              (assignment) => assignment.classId === classItem.id,
            );

            return (
              <DashboardCard
                key={classItem.id}
                title={classItem.class}
                value={classAssignments.length}
                icon={FiBookOpen}
                iconStyle="bg-teal-50 text-teal-600"
                textStyle="text-teal-600"
                buttonText="View submissions"
                onClick={() =>
                  navigate(`/teacher/submittedAssignments/${classItem.id}`)
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmittedAssignmentClasses;
