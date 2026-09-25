import {
  FiCalendar,
  FiCheck,
  FiEdit2,
  FiFileText,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import type {  User } from "../../type/type";
import type { Assignment } from "../../type/AssignmentType";
import { useState } from "react";
import SubmitAssignmentModal from "../SubmitAssignmentsModal";
import type { Class } from "../../type/classType";

interface AssignmentCardProps {
  assignment: Assignment;
  classes:Class[],
  isSubmitted: boolean;
  handleSubmit: (
    assignmentId: string,
    submissionContent: string,
  ) => Promise<boolean>;
  submittedCount: number;
  handleDelete: (assignmentId: string) => void;
  handleEdit: (assignmentId: string) => void;
  user?: User | null;
}

const AssignmentCard = ({
  assignment,
  classes,
  isSubmitted,
  submittedCount,
  handleDelete,
  handleEdit,
  handleSubmit,
  user,
}: AssignmentCardProps) => {

  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submissionContent, setSubmissionContent] = useState("");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    string | null
  >(null);
  
  const isTeacher = user?.role === "teacher";
  const isStudent = user?.role === "student";

  const submitted = isSubmitted;

const selectedClass = classes.find((item) => item.id === assignment.classId);

  return (
    <>
      <div className="group rounded-2xl border border-slate-200 bg-white p-6 xl:p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-xl">
        {/* Top */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition group-hover:bg-teal-600 group-hover:text-white">
            <FiFileText size={23} />
          </div>

          {/* Teacher Submission Count */}
          {isTeacher && (
            <div className="rounded-xl bg-emerald-50 p-2">
              <p className="text-xs font-medium text-slate-500">Submitted</p>

              <p className="text-center text-md font-bold text-emerald-600">
                {submittedCount}
              </p>
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="mt-5 min-h-7 line-clamp-1 text-xl font-bold text-slate-900">
          {assignment.title}
        </h2>

        {/* Subject */}
        <p className="mt-1 min-h-5 text-sm font-medium text-teal-600">
          {selectedClass?.subject || "Unknown Subject"}
        </p>

        {/* Description */}
        <p className="mt-3 min-h-10 line-clamp-2 text-sm leading-6 text-slate-600">
          {assignment.description}
        </p>

        {/* Class */}
        <div className="mt-5 flex min-h-5 items-center gap-2 text-sm text-orange-500">
          <FiFileText size={16} />
          <span>{selectedClass?.class || "Unknown Class"}</span>
        </div>

        {/* Teacher */}
        <div className="mt-3 flex min-h-5 items-center gap-2 text-sm text-teal-500">
          <FiUser size={16} />
          <span>{assignment.teacher}</span>
        </div>

        {/* Due Date */}
        <div className="mt-4 flex min-h-6 items-center gap-2 border-t border-slate-100 pt-4 text-sm font-bold text-slate-500">
          <FiCalendar size={16} />
          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
        </div>

        {/* Teacher Edit + Delete */}
        {isTeacher && assignment.teacherId === user?.id && (
          <div className="mt-5 flex gap-2">
            <button
              type="button"
              onClick={() => handleEdit(assignment.id)}
              className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-50 px-2 py-3 text-sm font-semibold text-orange-600 transition hover:bg-orange-100"
            >
              <FiEdit2 size={16} />
              Edit
            </button>

            <button
              type="button"
              popoverTarget="delete-modal"
              popoverTargetAction="show"
              onClick={() => handleDelete(assignment.id)}
              className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-50 px-2 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
            >
              <FiTrash2 size={16} />
              Delete
            </button>
          </div>
        )}

        {/* Student Submit */}
        {isStudent && (
          <button
            type="button"
            onClick={() => {
              setSelectedAssignmentId(assignment.id);
              setShowSubmitForm(true);
            }}
            disabled={submitted}
            className={`mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              submitted
                ? "cursor-not-allowed bg-emerald-50 text-emerald-600"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
          >
            <FiCheck size={17} />
            {submitted ? "Submitted" : "Submit "}
          </button>
        )}
      </div>

      {showSubmitForm && (
        <SubmitAssignmentModal
          submissionContent={submissionContent}
          setSubmissionContent={setSubmissionContent}
          onCancel={() => {
            setShowSubmitForm(false);
            setSubmissionContent("");
            setSelectedAssignmentId(null);
          }}
          onSubmit={async () => {
            if (!selectedAssignmentId) return;

            const success = await handleSubmit(
              selectedAssignmentId,
              submissionContent,
            );

            if (!success) return;

            setShowSubmitForm(false);
            setSubmissionContent("");
            setSelectedAssignmentId(null);
          }}
        />
      )}
    </>
  );
};

export default AssignmentCard;
