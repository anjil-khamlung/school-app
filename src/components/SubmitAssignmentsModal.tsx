import {  useState } from "react";
import { FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import type { AssignmentAnswer, Question, SubmittedAssignment } from "../type/AssignmentType";

interface SubmitAssignmentModalProps {
  submission?: SubmittedAssignment;
  onCancel: () => void;
  onSubmit?: (answers: Record<string, string>) => Promise<boolean> | void;
  onGrade?: (
    questionMarks: Record<string, number | string>,
  ) => Promise<boolean>;
  mode?: "submit" | "view";
  title?: string;
  assignmentQuestions?: Question[];
  assignmentAnswers?: AssignmentAnswer[];
}

const SubmitAssignmentModal = ({
  submission,
  onCancel,
  onSubmit,
  onGrade,
  mode = "submit",
  title,
  assignmentQuestions,
  assignmentAnswers,
}: SubmitAssignmentModalProps) => {

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [questionMarks, setQuestionMarks] = useState<
    Record<string, number | string>
  >({});

  const isGraded =
    submission?.obtainedMarks !== null &&
    submission?.obtainedMarks !== undefined;
  
  //Check if all marks are given
  const isMarksComplete = assignmentQuestions?.every(
    (item) => questionMarks[item.id ?? ""] !== "",
  );



  // Validate the entered marks and send them to the parent for grading
const handleGrade = async () => {
  // Make sure at least one mark is entered
  if (Object.keys(questionMarks).length === 0) {
    toast.error("Please enter marks");
    return;
  }

  // Validate each question's marks
  for (const item of assignmentQuestions ?? []) {
    const marks = item.id === undefined ? undefined : questionMarks[item.id];

    if (marks === undefined || marks === "") {
      toast.error(`Please enter marks for question ${item.id}`);
      return;
    }

    if (Number(marks) < 0 || Number(marks) > item.marks) {
      toast.error(`Invalid marks for question ${item.id}`);
      return;
    }
  }

  await onGrade?.(questionMarks);
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
              Answer each question below. Your answers will be submitted
              together.
            </p>

            <div className="mt-5 max-h-[60vh] space-y-4 overflow-y-auto pr-1">
              {assignmentQuestions?.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  {/* Question header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-semibold text-teal-700">
                        {index + 1}
                      </span>

                      <div>
                        <p className="font-medium leading-6 text-slate-800">
                          {item.question}
                        </p>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                      {item.marks} marks
                    </span>
                  </div>

                  {/* Answer */}
                  <div className="mt-4">
                    <label className="mb-2 block text-sm font-medium text-slate-600">
                      Your answer
                    </label>

                    <textarea
                      value={answers[item.id ?? ""] ?? ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [item.id ?? ""]: e.target.value,
                        }))
                      }
                      placeholder="Write your answer here..."
                      rows={1}
                      className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // View mode: display the questions and the student's submitted answers
          <div className="mt-6 max-h-[60vh] space-y-4 overflow-y-auto">
            {assignmentQuestions?.map((item, index) => {
              const answer = assignmentAnswers?.find(
                (itemAnswer) => itemAnswer.questionId === item.id,
              );

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-semibold text-teal-700">
                        {index + 1}
                      </span>

                      <p className="font-medium leading-6 text-slate-800">
                        {item.question}
                      </p>
                    </div>

                    <span className="shrink-0 text-xs font-medium text-slate-500">
                      {item.marks} marks
                    </span>
                  </div>

                  {/* Student answer */}
                  <div className="mt-2 rounded-xl bg-white px-4 py-2">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                      Answer
                    </p>

                    <p className="whitespace-pre-wrap text-sm leading-7 text-slate-700">
                      {answer?.answer || "No answer provided"}
                    </p>
                  </div>

                  {/* Marks input */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">
                      Marks obtained
                    </span>

                    {isGraded ? (
                      <span className="rounded-lg bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700">
                        {answer?.marksObtained ?? 0} / {item.marks}
                      </span>
                    ) : (
                      <input
                        type="number"
                        min={0}
                        max={item.marks}
                        value={questionMarks[item.id ?? ""] ?? ""}
                        onChange={(e) =>
                          setAnswers?.((prev) => ({
                            ...prev,
                            [item.id ?? ""]: e.target.value,
                          }))
                        }
                        className="w-20 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm outline-none focus:border-teal-500"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Input marks */}
        <div className="mt-4 flex justify-end gap-3">
          {mode === "view" && (
            <div className="mr-auto flex items-center ">
              <div className="flex gap-5 text-sm text-slate-500">
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
                onClick={() => onSubmit?.(answers)}
                className="cursor-pointer rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Assignment
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleGrade}
              disabled={isGraded || !isMarksComplete}
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
