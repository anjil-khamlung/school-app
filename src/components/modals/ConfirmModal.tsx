import { FiTrash } from "react-icons/fi";

interface ConfirmModalProps {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <div className="modal bg-black/20 backdrop-blur-xs" id="delete-modal" popover="auto" >
      <div className="modal-box">
        {/* Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <FiTrash size={22} className="text-red-600 dark:text-red-400" />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
          {message}
        </p>

        {/* Buttons */}
        <div className="modal-action">
          <button
            type="button"
            popoverTarget="delete-modal"
            popoverTargetAction="hide"
            onClick={onCancel}
            className="cursor-pointer rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          <button
            type="button"
            popoverTarget="delete-modal"
            popoverTargetAction="hide"
            onClick={onConfirm}
            className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
