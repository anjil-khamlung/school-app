import { FiBell, FiEdit2, FiPlus, FiX } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import TextArea from "../../components/inputs/TextArea";
import ConfirmModal from "../../components/ConfirmModal";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAnnouncements } from "../../store/useAnnouncements";
import AnnouncementCard from "../../components/cards/AnnouncementCard";
import type { AnnouncementFormErrors, CreateAnnouncement } from "../../type/AnnouncementType";
import { validateAnnouncement } from "../../lib/utils/validateAnnouncement";

const Announcements = () => {
  const { currentUser } = useSchoolStore();
  const {
    announcements,
    getAnnouncements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
  } = useAnnouncements();

  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);
  const [editingAnnouncementId, setEditingAnnouncementId] = useState<
    string | null
    >(null);
  const[errors,setErrors]=useState<AnnouncementFormErrors>({})

  const isAdmin = currentUser?.role === "admin";

  const initial = {
    title: "",
    message: "",
  };

  const [formData, setFormData] = useState(initial);

  //fetch announcements
  useEffect(() => {
    getAnnouncements();
  }, [getAnnouncements]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

//Validation
   const validationErrors = validateAnnouncement(formData);
   setErrors(validationErrors);
   if (Object.keys(validationErrors).length > 0) {
     return;
   }

    // EDIT
    if (editingAnnouncementId !== null) {
      const success = await updateAnnouncement(editingAnnouncementId, {
        title: formData.title,
        message: formData.message,
      });

      if (!success) {
        toast.error("Failed to update announcement");
        return;
      }

      toast.success("Announcement updated successfully");

      setFormData(initial);

      setEditingAnnouncementId(null);
      setShowForm(false);

      return;
    }

    // CREATE
    const newAnnouncement: CreateAnnouncement = {
      title: formData.title,
      message: formData.message,
      createdBy: currentUser!.name,
      date: new Date(),
    };

    const success = await addAnnouncement(newAnnouncement);

    if (!success) {
      toast.error("Failed to add announcement");
      return;
    }

    setFormData({
      title: "",
      message: "",
    });

    setShowForm(false);

    toast.success("Announcement created successfully");
  };

  const handleEdit = (announcementId: string) => {
    const announcement = announcements.find(
      (item) => item.id === announcementId,
    );

    if (!announcement) return;

    setEditingAnnouncementId(announcementId);

    setFormData({
      title: announcement.title,
      message: announcement.message,
    });

    setShowForm(true);
  };

  const confirmDelete = async () => {
    if (!selectedAnnouncementId) return;

    const success = await deleteAnnouncement(selectedAnnouncementId);

    if (!success) {
      toast.error("Failed to delete Announcement");
      return;
    }
    setSelectedAnnouncementId(null);

    toast.success("Announcement deleted successfully");
  };

  //Form toggle
  const handleFormToggle = () => {
    if (showForm) {
      // Cancel
      setFormData(initial);
      setEditingAnnouncementId(null);
      setShowForm(false);
    } else {
      // Open create form
      setFormData(initial);
      setEditingAnnouncementId(null);
      setShowForm(true);
    }
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
            type="button"
            onClick={handleFormToggle}
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
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
              error={errors.title}
            />

            {/* Message */}
            <TextArea
              label={"Message"}
              name={"message"}
              value={formData.message}
              setFormData={setFormData}
              placeholder={"Write your announcement..."}
              rows={5}
              error={errors.message}
            />

            {/* Actions  */}
            <button
              type="submit"
              className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white ${
                editingAnnouncementId !== null
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {editingAnnouncementId !== null ? (
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
          announcements
            .filter((announcement) => announcement.id !== editingAnnouncementId)
            .map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                isAdmin={isAdmin}
                handleEdit={handleEdit}
                handleDelete={(announcementId) => {
                  setSelectedAnnouncementId(announcementId);
                }}
              />
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
};;

export default Announcements;
