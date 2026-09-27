import { useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { useAssignments } from "../store/useAssignments";
import type { SubmittedAssignment } from "../type/AssignmentType";

interface SubmitAssignmentModalProps {
  submissionContent: string;
  setSubmissionContent?: (value: string) => void;
  onCancel: () => void;
  onSubmit?: () => void | Promise<void>;
  onGrade?: (marks: number, result: "pass" | "fail") => void | Promise<void>;

  mode?: "submit" | "view";

  title?: string;
  className?: string;
  studentName?: string;
  date?: Date | string | null;
}

const SubmitAssignmentModal = ({
  submissionContent,
  setSubmissionContent,
  onCancel,
  onSubmit,
  onGrade,
  mode = "submit",
  title,
  className,
  studentName,
  date,
}: SubmitAssignmentModalProps) => {
  const [marks, setMarks] = useState<number | "">("");
  const [result, setResult] = useState<"pass" | "fail" | null>(null);



  const handleGrade = () => {
    if (marks === "" || result === null) {
        toast.error("Please enter marks")
        return;
      }

    if (marks < 0 || marks > 100) {
        toast.error("Please enter valid marks");  
        return;
    }
    
    if (result !== "pass" && result !== "fail") {
        toast.error("Please choose a result");
      return;
    }

    onGrade?.(marks, result);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {mode === "view" ? `Title: ${title}` : "Submit Assignment"}
            </h2>

            {mode === "view" && (
              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <p>
                  <span className="font-medium text-slate-700">Class:</span>{" "}
                  {className}
                </p>

                <p>
                  <span className="font-medium text-slate-700">Student:</span>{" "}
                  {studentName}
                </p>

                <p>
                  <span className="font-medium text-slate-700">
                    Submitted At:
                  </span>{" "}
                  {date ? new Date(date).toLocaleDateString() : "No date"}
                </p>
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
            <p className="mt-2">Description: {title}</p>

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
              {submissionContent}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-4 flex justify-end gap-3">
          {mode === "view" && (
            <div className="mr-auto flex flex-wrap items-center gap-3">
              {/* Marks input */}
              <div className="flex items-center gap-2">
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
                  value={marks}
                  onChange={(e) =>
                    setMarks(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>

              {/* Pass button */}
              <button
                type="button"
                onClick={() => setResult("pass")}
                className={`cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold transition ${
                  result === "pass"
                    ? "bg-green-500 text-white"
                    : "bg-green-100 text-green-700 hover:bg-green-200"
                }`}
              >
                Pass
              </button>

              {/* Fail button */}
              <button
                type="button"
                onClick={() => setResult("fail")}
                className={`cursor-pointer rounded-xl px-5 py-2 text-sm font-semibold transition ${
                  result === "fail"
                    ? "bg-red-500 text-white"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                Fail
              </button>
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
                disabled={!submissionContent.trim()}
                className="cursor-pointer rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Assignment
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGrade}
              disabled={
                marks === "" || result === null || marks < 0 
              }
              className="cursor-pointer rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignmentModal;
