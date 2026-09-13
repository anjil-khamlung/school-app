import { FiBell, FiCalendar, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import TextArea from "../../components/inputs/TextArea";
import ConfirmModal from "../../components/ConfirmModal";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useState } from "react";
import { toast } from "react-toastify";

const Announcement = () => {
  const { currentUser, announcements, addAnnouncement, deleteAnnouncement } =
    useSchoolStore();

  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    number | null
  >(null);

  const isAdmin = currentUser?.role === "admin";

  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.message.trim()) {
      return;
    }
    addAnnouncement({
      id: Date.now(),
      title: formData.title,
      message: formData.message,
      createdBy: currentUser!.name,
      date: new Date(),
    });

    setFormData({
      title: "",
      message: "",
    });

    setShowForm(false);
    toast.success("Announcement created successfully");
  };

  const confirmDelete = () => {
    if (!selectedAnnouncementId) return;

    deleteAnnouncement(selectedAnnouncementId);

    setSelectedAnnouncementId(null);

    toast.success("Announcement deleted successfully");
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-2 lg:p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            {isAdmin ? "Administration" : "School Updates"}
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Announcements
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin
              ? "Create and manage school announcements."
              : "View the latest school announcements."}
          </p>
        </div>

        {/* Admin only */}
        {isAdmin && (
          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex w-fit cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
              showForm
                ? "bg-red-500 hover:bg-red-600"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {showForm ? (
              <>
                <FiX size={18} />
                Cancel
              </>
            ) : (
              <>
                <FiPlus size={18} />
                New Announcement
              </>
            )}
          </button>
        )}
      </div>

      {/* Create Form - Admin only */}
      {isAdmin && showForm && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Create Announcement
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Share an important update with students and teachers.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Title */}
            <InputField
              label="Title"
              type={"text"}
              name={"title"}
              value={formData.title}
              setFormData={setFormData}
              placeholder={"Enter announcement title"}
            />

            {/* Message */}
            <TextArea
              label={"Message"}
              name={"message"}
              value={formData.message}
              setFormData={setFormData}
              placeholder={"Write your announcement..."}
              rows={5}
            />

            <button
              type="submit"
              className="rounded-xl cursor-pointer bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Publish Announcement
            </button>
          </form>
        </div>
      )}

      {/* Announcements */}
      <div className="mt-8 space-y-4">
        {announcements.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FiBell size={24} />
            </div>

            <h2 className="mt-4 font-bold text-slate-900">No announcements</h2>

            <p className="mt-1 text-sm text-slate-500">
              There are no announcements available yet.
            </p>
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                  <FiBell size={20} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-bold text-slate-900">
                        {announcement.title}
                      </h2>

                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <FiCalendar size={13} />
                        <span>
                          {new Date(announcement.date).toLocaleString("en-US", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                        {announcement.createdBy && (
                          <>
                            <span>•</span>
                            <span>By {announcement.createdBy}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Admin can delete */}
                    {isAdmin && (
                      <button
                        type="button"
                        popoverTarget="delete-modal"
                        popoverTargetAction="show"
                        onClick={() => {
                          setSelectedAnnouncementId(announcement.id);
                        }}
                        className="flex w-fit cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-50"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    )}
                  </div>

                  <p className="mt-4 text-sm leading-6 text-slate-600 whitespace-pre-wrap">
                    {announcement.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* confirm delete  */}
      <ConfirmModal
        title="Delete announcement?"
        message="Are you sure you want to delete this announcement? This action cannot be undone."
        onCancel={() => {
          setSelectedAnnouncementId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Announcement;
