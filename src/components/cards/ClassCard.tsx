import { FiBookOpen, FiEdit2, FiTrash2, FiUser, FiUsers } from "react-icons/fi";
import type {  User } from "../../type/type";
import type { Class } from "../../type/classType";

interface ClassCardProps {
  item: Class;
  handleEdit: (classId: string) => void;
  handleDelete: (classId: string) => void;
  handleJoinClass: (classId: string) => void;
  user: User;
}

const ClassCard = ({
  item,
  handleEdit,
handleDelete,
  handleJoinClass,
  user,
}: ClassCardProps) => {
  const isTeacher = user.role === "teacher";
  const isStudent = user.role === "student";

  const studentJoined = isStudent && item.students?.includes(user.id);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 xl:p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
          <FiBookOpen size={23} />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600">
          {item.section}
        </span>
      </div>

      {/* Name */}
      <h2 className="mt-5 text-xl font-bold text-slate-900">
        {item.class}
      </h2>

      {/* Subject */}
      <p className="mt-2 text-sm text-teal-500">{item.subject}</p>

      {/* Teacher */}
      <div className="mt-3 flex items-center gap-2 text-sm text-orange-500">
        <FiUser size={16} />
        <span>{item.teacherName || "Teacher not assigned"}</span>
      </div>

      {/* Time */}
      <p className="mt-2 text-sm font-bold text-slate-500">{item.time}</p>

      {/* Students */}
      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-sm text-teal-500">
        <FiUsers size={16} />

        <span>
          {item.students?.length || 0}{" "}
          {item.students?.length === 1 ? "Student" : "Students"}
        </span>
      </div>

      {/* Teacher controls */}
      {isTeacher && (
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            onClick={() => handleEdit(item.id)}
            className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-50 px-4 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-200"
          >
            <FiEdit2 size={16} />
            Edit
          </button>

          <button
            popoverTarget="delete-modal"
            popoverTargetAction="show"
            onClick={() => handleDelete(item.id)}
            className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-200"
          >
            <FiTrash2 size={16} />
            Delete
          </button>
        </div>
      )}

      {/* Student controls */}
      {isStudent && (
        <div className="mt-5">
          {studentJoined ? (
            <div className="rounded-xl bg-emerald-50 px-4 py-3 text-center text-sm font-semibold text-emerald-600">
              Joined
            </div>
          ) : (
            <button
              onClick={() => handleJoinClass(item.id)}
              className="w-full cursor-pointer rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Join Class
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassCard;
