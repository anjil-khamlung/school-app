interface SubmitAssignmentModalProps {
  submissionContent: string;
  setSubmissionContent?: (value: string) => void;
  onCancel: () => void;
  onSubmit?: () => void;

  mode?: "submit" | "view";

  title?: string;
  studentName?: string;
  date?: Date | null;
}

const SubmitAssignmentModal = ({
  submissionContent,
  setSubmissionContent,
  onCancel,
  onSubmit,
  mode = "submit",
  title,
  studentName,
  date,
}: SubmitAssignmentModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {mode === "view" ? title : "Submit Assignment"}
            </h2>

            {mode === "view" && (
              <div className="mt-2 space-y-1 text-sm text-slate-500">
                <p>
                  <span className="font-medium text-slate-700">Student:</span>{" "}
                  {studentName}
                </p>

                <p>
                  <span className="font-medium text-slate-700">Submitted At:</span>{" "}
                  {date ? new Date(date).toLocaleDateString() : "No date"}
                </p>
              </div>
            )}
          </div>

    
        </div>

        {/* Content */}
        {mode === "submit" ? (
          <>
            <p className="mt-2 text-sm text-slate-500">
              Write your answer below and submit your assignment when you are
              finished.
            </p>

            <textarea
              value={submissionContent}
              onChange={(e) => setSubmissionContent?.(e.target.value)}
              placeholder="Enter your answer..."
              rows={9}
              className="mt-6 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-5 text-base text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
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
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-xl bg-red-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            {mode === "view" ? "Close" : "Cancel"}
          </button>

          {mode === "submit" && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={!submissionContent.trim()}
              className="cursor-pointer rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Submit Assignment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitAssignmentModal;

