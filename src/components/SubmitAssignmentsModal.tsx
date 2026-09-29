import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import type { SubmittedAssignment } from "../type/AssignmentType";

interface SubmitAssignmentModalProps {
  submission?: SubmittedAssignment;
  submissionContent?: string;
  setSubmissionContent?: (value: string) => void;
  onCancel: () => void;
  onSubmit?: () => void | Promise<void>;
  onGrade?: (marks: number) => void | Promise<boolean>;
  mode?: "submit" | "view";
  title?: string;
}

const SubmitAssignmentModal = ({
  submission,
  submissionContent,
  setSubmissionContent,
  onCancel,
  onSubmit,
  onGrade,
  mode = "submit",
  title,
}: SubmitAssignmentModalProps) => {
 const [marks, setMarks] = useState<number | "">(
   submission?.obtainedMarks ?? "",
 );

 const isGraded =
   submission?.obtainedMarks !== null &&
   submission?.obtainedMarks !== undefined;

 useEffect(() => {
   setMarks(submission?.obtainedMarks ?? "");
 }, [submission?.obtainedMarks]);

  const handleGrade = async () => {
    if (marks === "") {
      toast.error("Please enter marks");
      return;
    }

    if (marks < 0 || marks > (submission?.fullMarks ?? 0)) {
      toast.error("Please enter valid marks");
      return;
    }

    await onGrade?.(marks);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-bold text-slate-900">
              {mode === "view"
                ? `Title: ${submission?.assignmentTitle}`
                : "Submit Assignment"}
            </h2>

            {mode === "view" && (
              <div className="mt-3 grid grid-cols-2 ">
                {/* Column 1 */}
                <div className="space-y-1 text-sm text-slate-500">
                  <p>
                    <span className="font-medium text-slate-700">Class:</span>{" "}
                    {submission?.class}
                  </p>

                  <p>
                    <span className="font-medium text-slate-700">Subject:</span>{" "}
                    {submission?.subject}
                  </p>

                  <p>
                    <span className="font-medium text-slate-700">
                      Description:
                    </span>{" "}
                    {submission?.description}
                  </p>
                </div>

                {/* Column 2 */}
                <div className="text-right text-sm text-slate-500">
                  <p>
                    <span className="font-medium text-slate-700">
                      Full Marks:
                    </span>{" "}
                    {submission?.fullMarks}
                  </p>

                  <p className="mt-1">
                    <span className="font-medium text-slate-700">
                      Pass Marks:
                    </span>{" "}
                    {submission?.passMarks}
                  </p>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-lg bg-slate-50 p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
          >
            <FiX size={25} />
          </button>
        </div>

        {/* Content */}
        {mode === "submit" ? (
          <>
            <p className="mt-1">Description: {title}</p>

            <p className="mt-2 text-sm text-slate-500">
              Write your answer below and submit your assignment when you are
              finished.
            </p>

            <textarea
              value={submissionContent}
              onChange={(e) => setSubmissionContent?.(e.target.value)}
              placeholder="Enter your answer..."
              rows={9}
              className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
            />
          </>
        ) : (
          <div className="mt-6 max-h-[60vh] overflow-y-auto rounded-2xl bg-slate-50 p-5">
            <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
              {submission?.content}
            </p>
          </div>
        )}

        {/* Input marks */}
        <div className="mt-4 flex justify-end gap-3">
          {mode === "view" && (
            <div className="mr-auto flex flex-wrap items-center gap-3">
              {/* Marks */}
              <div className="flex items-center gap-2 mr-3">
                <label
                  htmlFor="marks"
                  className="text-sm font-medium text-gray-600"
                >
                  Marks:
                </label>

                <input
                  id="marks"
                  type="number"
                  min={0}
                  max={100}
                  value={marks}
                  disabled={isGraded}
                  onChange={(e) =>
                    setMarks(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-15 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>

              <div className="flex gap-4 text-sm text-slate-500">
                <p>
                  <span className="font-medium text-slate-700">Student:</span>{" "}
                  {submission?.studentName}
                </p>

                <p>
                  <span className="font-medium text-slate-700">
                    Submitted At:
                  </span>{" "}
                  {submission?.date
                    ? new Date(submission.date).toLocaleDateString()
                    : "No date"}
                </p>
              </div>
            </div>
          )}

          {mode === "submit" ? (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="cursor-pointer rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onSubmit}
                disabled={!submissionContent?.trim()}
                className="cursor-pointer rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Assignment
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGrade}
              disabled={isGraded || marks === "" || marks < 0}
              className="cursor-pointer rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGraded ? "Submitted" : "submit"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignmentModal;
