import { FiEdit2, FiPlus, FiX } from "react-icons/fi";
import TextArea from "../inputs/TextArea";
import InputField from "../inputs/InputField";


type AnnouncementFormData = {
  title: string;
  message: string;
};

type AnnouncementModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formData: AnnouncementFormData;
  setFormData: React.Dispatch<React.SetStateAction<AnnouncementFormData>>;
  errors: {
    title?: string;
    message?: string;
  };
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  editingAnnouncementId: string | null;
};

const AnnouncementModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  errors,
  handleSubmit,
  editingAnnouncementId,
}: AnnouncementModalProps) => {
  if (!isOpen) return null;

  const isEditing = editingAnnouncementId !== null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {isEditing ? "Edit Announcement" : "Create Announcement"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <FiX size={20} />
          </button>
        </div>

        <p className="text-sm text-slate-500">
          Share an important update with students and teachers.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <InputField
            label="Title"
            type="text"
            name="title"
            value={formData.title}
            setFormData={setFormData}
            placeholder="Enter announcement title"
            error={errors.title}
          />

          <TextArea
            label="Message"
            name="message"
            value={formData.message}
            setFormData={setFormData}
            placeholder="Write your announcement..."
            rows={5}
            error={errors.message}
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer  border  px-5 py-3 text-sm font-semibold  border-none bg-red-600 rounded-xl text-white hover:bg-red-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ${
                isEditing
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {isEditing ? (
                <>
                  <FiEdit2 size={17} />
                  Update Announcement
                </>
              ) : (
                <>
                  <FiPlus size={17} />
                  Publish Announcement
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementModal;
