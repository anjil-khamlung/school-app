import { useEffect, useState } from "react";
import { useSchoolStore } from "../../store/useSchoolStore";
import { FiBookOpen, FiEdit2, FiPlus, FiX } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import { toast } from "react-toastify";
import type { Class } from "../../type/type";
import SearchInput from "../../components/inputs/SearchInput";
import ClassCard from "../../components/cards/ClassCard";
import ConfirmModal from "../../components/ConfirmModal";
import { useClasses } from "../../store/useClasses";
import SelectField from "../../components/inputs/SelectField";
import { className, section, time } from "../../data/classOptions";
import type { ClassFormErrors } from "../../type/classType";
import { validateClass } from "../../lib/utils/validateClass";

const Classes = () => {
  const { currentUser } = useSchoolStore();
  const { classes, getClasses, updateClass, addClass, joinClass, deleteClass } =
    useClasses();

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [editingClassId, setEditingClassId] = useState<number | null>(null);
  const [errors, setErrors] = useState<ClassFormErrors>({});
  const initial = {
    className: "",
    section: "",
    subject: "",
    time: "",
  };
  const [formData, setFormData] = useState(initial);

  if (!currentUser) return;

  const isAdmin = currentUser?.role === "admin";
  const isTeacher = currentUser?.role === "teacher";
  const isStudent = currentUser?.role === "student";

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  // Classes visible to each role
  let visibleClasses = classes;

  if (isTeacher) {
    visibleClasses = classes.filter(
      (item) => String(item.teacherId) === String(currentUser?.id),
    );
  }

  if (isStudent) {
    visibleClasses = classes;
  }

  // Search
  const filteredClasses = visibleClasses.filter((item) => {
    // Hide the class currently being edited
    if (editingClassId !== null && item.id === editingClassId) {
      return false;
    }

    const value = search.trim().toLowerCase();

    if (!value) {
      return true;
    }

    return (
      item.className?.toLowerCase().includes(value) ||
      item.section?.toLowerCase().includes(value) ||
      item.subject?.toLowerCase().includes(value) ||
      item.teacherName?.toLowerCase().includes(value)
    );
  });

  // create class
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    const validationErrors = validateClass(formData);
    setErrors(validationErrors);
    // Stop if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // EDIT
    if (editingClassId !== null) {
      const success = await updateClass(editingClassId, {
        className: formData.className,
        section: formData.section,
        subject: formData.subject,
        time: formData.time,
      });

      if (!success) {
        toast.error("Failed to update class");
        return;
      }

      toast.success("Class updated successfully");

      setEditingClassId(null);
      setFormData(initial);
      setShowForm(false);
      return;
    }

    // CREATE
    const newClass: Class = {
      id: Date.now(),
      className: formData.className,
      section: formData.section,
      subject: formData.subject,
      time: formData.time,
      students: [],
      teacherId: currentUser.id,
      teacherName: currentUser.name,
    };

    const success = await addClass(newClass);

    if (!success) {
      toast.error("Failed to create a class");
      return;
    }
    toast.success("Class created successfully");

    setFormData(initial);
    setSearch("");

    setShowForm(false);
  };

  //Edit class
  const handleEdit = (classId: number) => {
    const selectedClass = classes.find((item) => item.id === classId);

    if (!selectedClass) return;

    setEditingClassId(classId);

    setFormData({
      className: selectedClass.className,
      section: selectedClass.section,
      subject: selectedClass.subject,
      time: selectedClass.time,
    });

    setShowForm(true);
  };

  // Delete class

  const handleDelete = (classId: number) => {
    setSelectedClassId(classId);
  };

  const handleConfirmDelete = async () => {
    if (selectedClassId === null || !currentUser) return;

    const success = await deleteClass(selectedClassId, currentUser.id);

    if (!success) {
      toast.error("Failed to delete class");
      return;
    }

    setSelectedClassId(null);

    toast.success("Class deleted successfully");
  };

  // Join class

  const handleJoinClass = async (classId: number) => {
    if (!currentUser?.id) return;

    const success = await joinClass(currentUser.id, classId);

    if (!success) {
      toast.error("Failed to join class");
      return;
    }

    toast.success("Class joined successfully");
  };

  //Form toggle
  const handleFormToggle = () => {
    if (showForm) {
      // Cancel
      setFormData(initial);
      setEditingClassId(null);
      setShowForm(false);
    } else {
      // Open create form
      setFormData(initial);
      setEditingClassId(null);
      setShowForm(true);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-2 lg:p-4">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            {isAdmin
              ? "Administration"
              : isTeacher
                ? "Teacher Portal"
                : "Student Portal"}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Classes
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin && "View all classes and their teachers."}

            {isTeacher && "Create and manage your classes."}

            {isStudent && "View available classes and join your classes."}
          </p>
        </div>

        {/* Create / Cancel Class */}
        {isTeacher && (
          <button
            onClick={handleFormToggle}
            className={`flex mt-auto w-fit cursor-pointer items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
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
                Create
              </>
            )}
          </button>
        )}
      </div>

      {/* Create Class Form */}
      {isTeacher && showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900">Create New Class</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* Class Name */}

            <SelectField
              label="Class"
              placeholder="Select Class"
              value={formData.className}
              options={className}
              error={errors.className}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  className: value,
                }))
              }
            />

            {/* Section */}
            <SelectField
              label="Section"
              placeholder="Select Section"
              value={formData.section}
              options={section}
              error={errors.section}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  section: value,
                }))
              }
            />

            {/* Subject */}

            <InputField
              label="Subject"
              type="text"
              placeholder="e.g. Mathmatics"
              setFormData={setFormData}
              value={formData.subject}
              name="subject"
              error={errors.subject}
            />

            {/* Class Time */}
            <SelectField
              label="Time"
              placeholder="Select Time"
              value={formData.time}
              options={time}
              error={errors.time}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  time: value,
                }))
              }
            />
          </div>

          {/* Actions */}
          <div className="mt-6">
            <button
              type="submit"
              className={`flex  cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                editingClassId !== null
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {editingClassId !== null ? (
                <>
                  <FiEdit2 size={17} />
                  Edit
                </>
              ) : (
                <>
                  <FiPlus size={17} />
                  Create
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <SearchInput
        placeholder="Search class ...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
        <FiBookOpen size={17} />

        <span>
          {filteredClasses.length}{" "}
          {filteredClasses.length === 1 ? "Class" : "Classes"}
        </span>
      </div>

      {/* Classes */}
      <ClassCard
        user={currentUser}
        filteredClasses={filteredClasses}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleJoinClass={handleJoinClass}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        title="Delete class?"
        message="Are you sure you want to delete this class? This action cannot be undone."
        onCancel={() => {
          setSelectedClassId(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      {/* Empty */}
      {filteredClasses.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FiBookOpen size={24} />
          </div>

          <p className="mt-4 font-semibold text-slate-800">No classes found</p>

          <p className="mt-1 text-sm text-slate-500">
            {isTeacher
              ? "You haven't created any classes yet."
              : isStudent
                ? "No classes are available."
                : "No classes available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Classes;
