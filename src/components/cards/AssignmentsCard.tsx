import {
  FiCalendar,
  FiCheck,
  FiFileText,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import type { Assignment, User } from "../../type/type";

interface AssignmentCardProps{
  filteredAssignments: Assignment[],
  isSubmitted: (assignment:Assignment)=>boolean,
  isTeacher: boolean,
  isStudent: boolean,
  handleSubmit: (assignmentId: number) => void,
  handleDelete: (assignment: Assignment) => void,
  user?:User|null,
}

const AssignmentCard = ({
  filteredAssignments,
  isSubmitted,
  isTeacher,
  handleDelete,
  isStudent,
  handleSubmit,
  user,
}:AssignmentCardProps) => {
  return (
    <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {filteredAssignments.map((assignment) => {
        const submitted = isSubmitted(assignment);

        return (
          <div
            key={assignment.id}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl"
          >
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
                <FiFileText size={23} />
              </div>

              {/* Teacher Delete */}
              {isTeacher && assignment.teacherId === user?.id && (
                <button
                  type="button"
                  popoverTarget="delete-modal"
                  popoverTargetAction="show"
                  onClick={() => handleDelete(assignment)}
                  className="cursor-pointer rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                  title="Delete assignment"
                >
                  <FiTrash2 size={17} />
                </button>
              )}

              {/* Teacher Submission Count */}
              {isTeacher && (
                <div className="rounded-xl bg-emerald-50 p-2">
                  <p className="text-xs font-medium text-slate-500">
                    Submitted
                  </p>

                  <p className="mt-1 text-md font-bold text-emerald-600">
                    {assignment.submittedBy?.length || 0}
                  </p>
                </div>
              )}
            </div>

            {/* Title */}
            <h2 className="mt-5 min-h-7 text-xl font-bold text-slate-900 line-clamp-1">
              {assignment.title}
            </h2>

            {/* Subject */}
            <p className="mt-1 min-h-5 text-sm font-medium text-teal-600">
              {assignment.subject}
            </p>

            {/* Description */}
            <p className="mt-3 min-h-18 line-clamp-3 text-sm leading-6 text-slate-500">
              {assignment.description}
            </p>

            {/* Class */}
            <div className="mt-5 flex min-h-5 items-center gap-2 text-sm text-slate-500">
              <FiFileText size={16} />
              <span>{assignment.className}</span>
            </div>

            {/* Teacher */}
            <div className="mt-3 flex min-h-5 items-center gap-2 text-sm text-slate-500">
              <FiUser size={16} />
              <span>{assignment.teacher}</span>
            </div>

            {/* Due Date */}
            <div className="mt-4 flex min-h-6 items-center gap-2 border-t border-slate-100 pt-4 text-sm text-slate-500">
              <FiCalendar size={16} />
              <span>
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>

            {/* Student Submit */}
            {isStudent && (
              <button
                type="button"
                onClick={() => handleSubmit(assignment.id)}
                disabled={submitted}
                className={`mt-5 cursor-pointer flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  submitted
                    ? "cursor-not-allowed bg-emerald-50 text-emerald-600"
                    : "bg-teal-600 text-white hover:bg-teal-700"
                }`}
              >
                <FiCheck size={17} />

                {submitted ? "Submitted" : "Submit Assignment"}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AssignmentCard;
