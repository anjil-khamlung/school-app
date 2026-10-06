import { FiX } from "react-icons/fi";
import type { Result } from "../../type/AssignmentType";

interface ResultModalProps {
  id: string;
  obtainedMarks: number | null | undefined;
  result: Result  | undefined;
}

const ResultModal = ({ id, obtainedMarks, result }: ResultModalProps) => {
  return (
    <div id={id} popover="auto" className="modal">
      <div className="modal-box max-w-md bg-white">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">
            Assignment Result
          </h3>

          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className=" btn btn-ghost btn-sm btn-circle"
          >
            <FiX size={18} className="text-slate-400" />
          </button>
        </div>

        {/* Marks */}
        <div className="mt-6 rounded-xl bg-slate-50 p-5 text-center">
          <p className="text-sm text-slate-500">Obtained Marks</p>

          <p className="mt-1 text-3xl font-bold text-slate-800">
            {obtainedMarks ?? "Not graded"}
          </p>
        </div>

        {/* Result */}
        <div
          className={`mt-4 rounded-xl p-5 text-center ${
            result === "Pass"
              ? "bg-emerald-50"
              : result === "Fail"
                ? "bg-red-50"
                : "bg-orange-50"
          }`}
        >
          <p className="text-sm text-slate-500">Result</p>

          <p
            className={`mt-1 text-xl font-bold ${
              result === "Pass"
                ? "text-emerald-600"
                : result === "Fail"
                  ? "text-red-600"
                  : "text-orange-600"
            }`}
          >
            {result ?? "Pending"}
          </p>
        </div>

        {/* Close */}
        <div className="modal-action">
          <button
            type="button"
            popoverTarget={id}
            popoverTargetAction="hide"
            className="btn bg-teal-600 text-white hover:bg-teal-700"
          >
            Close
          </button>
        </div>
      </div>

      {/* Click outside to close */}
      <div
        className="modal-backdrop"
        onClick={() => {
          document.getElementById(id)?.hidePopover();
        }}
      />
    </div>
  );
};

export default ResultModal;
