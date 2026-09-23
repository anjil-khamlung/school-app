import { useEffect, useState } from "react";
import { FiCalendar, FiFileText, FiUser } from "react-icons/fi";
import { useAssignments } from "../../store/useAssignments";
import { useSchoolStore } from "../../store/useSchoolStore";
import type { SubmittedAssignment } from "../../type/AssignmentType";
import SubmitAssignmentModal from "../../components/SubmitAssignmentsModal";

const SubmittedAssignments = () => {
    const { getSubmittedAssignmentsForTeacher } = useAssignments();
    const{currentUser}=useSchoolStore()
const [selectedSubmission, setSelectedSubmission] =
  useState<SubmittedAssignment | null>(null);
  const [submissions, setSubmissions] = useState<any[]>([]);

useEffect(() => {
  const loadSubmissions = async () => {
    if (!currentUser) return;

    const data = await getSubmittedAssignmentsForTeacher(currentUser.id);

    setSubmissions(data);
  };

  loadSubmissions();
}, [currentUser, getSubmittedAssignmentsForTeacher]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Submitted Assignments
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          View assignments submitted by students.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
            <FiFileText className="text-2xl text-teal-600" />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            No submissions yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Students have not submitted any of your assignments yet.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {submission.title}
                  </h2>

                  <div className="mt-2 flex gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <FiUser />
                      {submission.studentName}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiCalendar />
                      {submission.date
                        ? new Date(submission.date).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                </div>

                <FiFileText className="text-xl text-teal-600" />
              </div>

              {/* Submission preview */}
              <div className="mt-5 rounded-xl bg-slate-50 p-4">
                <p className="line-clamp-1 text-sm leading-6 text-slate-700">
                  {submission.content}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedSubmission(submission)}
                  className="mt-3 cursor-pointer text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  See more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedSubmission && (
        <SubmitAssignmentModal
          mode="view"
          title={selectedSubmission.title}
          studentName={selectedSubmission.studentName}
          date={selectedSubmission.date}
          submissionContent={selectedSubmission.content}
          onCancel={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};

export default SubmittedAssignments;




