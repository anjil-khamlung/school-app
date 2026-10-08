import {  useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiBookOpen, FiCalendar, FiCircle, FiFileText, FiUser } from "react-icons/fi";

import { useAssignments } from "../../store/useAssignments";
import { useSchoolStore } from "../../store/useSchoolStore";

import type { SubmittedAssignment } from "../../type/AssignmentType";
import SubmitAssignmentModal from "../../components/modals/SubmitAssignmentsModal";
import { toast } from "react-toastify";
import { useClasses } from "../../store/useClasses";

const SubmittedAssignments = () => {
  const { classSubjectId } = useParams();
  const navigate=useNavigate()

  const {
    assignments,
    getSubmittedAssignmentsForTeacher,
    getAssignments,
    updateAnswerMarks,
  } = useAssignments();

  const { classes, getClasses } = useClasses();

  const { currentUser } = useSchoolStore();

  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmittedAssignment | null>(null);

  const [submissions, setSubmissions] = useState<SubmittedAssignment[]>([]);

  useEffect(() => {
    getClasses()
    getAssignments()
  },[getClasses,getAssignments])

  useEffect(() => {

    const loadSubmissions = async () => {
      if (!currentUser || !classSubjectId) return;

      const data = await getSubmittedAssignmentsForTeacher(currentUser.id);

    

      const classSubjectIds = classes
        .filter((item) => item.id === classSubjectId)
        .map((item) => item.id);


      const AssignmentIds = assignments
        .filter((assignment) =>
          classSubjectIds.includes(assignment.classSubjectId),
        )
        .map((assignment) => assignment.id);


      const filteredSubmissions = data.filter((submission) =>
        AssignmentIds.includes(submission.assignmentId),
      );


      setSubmissions(filteredSubmissions);
    };

    loadSubmissions();
  }, [
    currentUser,
    classSubjectId,
    assignments,
    classes,
    getSubmittedAssignmentsForTeacher,
  ]);

  const currentClass = classes.find((cls) => cls.id === classSubjectId)
  const className = currentClass?.class?.className
  const subject=currentClass?.subject?.subjectName
  

  return (
    <div className="p-1">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-2 text-sm font-medium cursor-pointer text-slate-600 hover:text-teal-600"
        >
          <FiArrowLeft size={17} />
          Go Back
        </button>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold text-teal-600 mr-4">
            Submitted Assignments
          </h1>
          <FiCircle size={7} className="fill-orange-400 text-orange-400" />

          <span className="rounded-lg  text-md font-semibold text-orange-600 mr-2">
            {className}
          </span>

          <FiCircle size={7} className="fill-teal-400 text-teal-400" />

          <span className="text-md font-medium text-teal-600">{subject}</span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          View assignments submitted by students for this class.
        </p>
      </div>

      {/* Submissions */}
      {submissions.length === 0 ? (
        <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-50">
            <FiFileText className="text-2xl text-teal-600 " />
          </div>

          <h2 className="mt-5 text-lg font-semibold text-slate-900">
            No submissions yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-slate-500">
            Students have not submitted any assignments for this class yet.
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
                    {submission.assignmentTitle}
                  </h2>

                  <div className="mt-2 flex gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <FiUser />
                      {submission.studentName}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiFileText />
                      {submission.class}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiBookOpen />
                      {submission.subject}
                    </span>

                    <span className="flex items-center gap-1">
                      <FiCalendar />
                      {submission.date
                        ? new Date(submission.date).toLocaleDateString()
                        : "No date"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedSubmission(submission)}
                >
                  <FiFileText className="text-xl text-teal-600 bg-teal-50  cursor-pointer " />
                </button>
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
                  Check assignment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View submission modal */}
      {selectedSubmission && (
        <SubmitAssignmentModal
          mode="view"
          submission={selectedSubmission}
          assignmentQuestions={selectedSubmission.assignmentQuestions}
          assignmentAnswers={selectedSubmission.assignmentAnswers}
          onCancel={() => setSelectedSubmission(null)}
          onGrade={async (questionMarks) => {
            const success = await updateAnswerMarks(
              questionMarks,
              selectedSubmission.assignmentAnswers,
            );

            if (!success) {
              toast.error("Failed to update marks");
              return false;
            }

            toast.success("Marks updated successfully");
            setSelectedSubmission(null);

            return true;
          }}
        />
      )}
    </div>
  );
};

export default SubmittedAssignments;
