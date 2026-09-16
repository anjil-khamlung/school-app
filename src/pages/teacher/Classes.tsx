import { useEffect, useState } from "react";
import { useSchoolStore } from "../../store/useSchoolStore";
import { FiBookOpen, FiPlus, FiX } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import { toast } from "react-toastify";
import type { Class } from "../../type/type";
import SearchInput from "../../components/inputs/SearchInput";
import ClassCard from "../../components/cards/ClassCard";
import ConfirmModal from "../../components/ConfirmModal";
import { useClasses } from "../../store/useClasses";

const Classes = () => {
  const { currentUser } = useSchoolStore();
  const {classes,getClasses, addClass, joinClass, deleteClass } = useClasses();

  // const [classes, setClasses] = useState<Class[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const initial = {
    name: "",
    section: "",
    subject: "",
    time: "",
  };
  const [formData, setFormData] = useState(initial);

  if (!currentUser) return;

  const isAdmin = currentUser?.role === "admin";
  const isTeacher = currentUser?.role === "teacher";
  const isStudent = currentUser?.role === "student";

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
    const value = search.trim().toLowerCase();

    if (!value) {
      return true;
    }

    return (
      item.name?.toLowerCase().includes(value) ||
      item.section?.toLowerCase().includes(value) ||
      item.subject?.toLowerCase().includes(value) ||
      item.teacherName?.toLowerCase().includes(value)
    );
  });

  // create class
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.section || !formData.subject) {
      toast.warning("Please fill all fields");
      return;
    }

    const newClass: Class = {
      id: Date.now(),
      name: formData.name,
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
    // setClasses((prev) => [...prev, newClass]);
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

    // Remove it from the UI immediately
    // setClasses((prev) => prev.filter((item) => item.id !== selectedClassId));

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

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  //fetching data
  // useEffect(() => {
  //   const getClasses = async () => {
  //     const { data, error } = await supabase.from("classes").select("*");

  //     if (error) {
  //       console.log("error=", error);
  //       return;
  //     }
  //     setClasses(data);
  //   };
  //   getClasses();
  // }, []);

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
                Create Class
              </>
            )}
          </button>
        )}
      </div>
      {/* Create Class Form */}
      {isTeacher && showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900">Create New Class</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {/* Class Name */}

            <InputField
              label="ClassName"
              type="text"
              placeholder="e.g. CLass 10"
              setFormData={setFormData}
              value={formData.name}
              name="name"
            />

            {/* Section */}

            <InputField
              label="Section"
              type="text"
              placeholder="e.g. A"
              setFormData={setFormData}
              value={formData.section}
              name="section"
            />

            {/* Subject */}

            <InputField
              label="Subject"
              type="text"
              placeholder="e.g. Mathmatics"
              setFormData={setFormData}
              value={formData.subject}
              name="subject"
            />

            {/* Class Time */}

            <InputField
              label="Time"
              type="text"
              placeholder="e.g. 10 AM to 11 AM"
              setFormData={setFormData}
              value={formData.time}
              name="time"
            />
          </div>

          {/* Actions */}
          <div className="mt-6">
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              <FiPlus size={17} />
              Create Class
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
        isStudent={isStudent}
        isTeacher={isTeacher}
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
