import { useState } from "react";
import { useSchoolStore } from "../../store/useSchoolStore";
import { FiCalendar, FiFileText, FiPlus, FiX } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import TextArea from "../../components/inputs/TextArea";
import DashboardCard from "../../components/cards/DashboardCard";
import SearchInput from "../../components/inputs/SearchInput";
import AssignmentCard from "../../components/cards/AssignmentsCard";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-toastify";
import type { Assignment } from "../../type/type";

const Assignments = () => {
  const {
    currentUser,
    assignments,
    addAssignment,
    deleteAssignment,
    submitAssignment,
  } = useSchoolStore();

  if (!currentUser) return null;

  const isAdmin = currentUser?.role === "admin";
  const isTeacher = currentUser?.role === "teacher";
  const isStudent = currentUser?.role === "student";

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    null | number
  >(null);

  const [formData, setFormData] = useState({
    title: "",
    className: "",
    description: "",
    dueDate: "",
    subject: "",
  });

  const teacherAssignments = assignments.filter(
    (assignments) => assignments.teacherId === currentUser.id,
  );

  const visibleAssignments = isTeacher ? teacherAssignments : assignments;

  const filteredAssignments = visibleAssignments.filter((assignment) => {
    const value = search.trim().toLowerCase();
    if (!value) return true;

    return (
      assignment.title?.toLowerCase().includes(value) ||
      assignment.subject?.toLowerCase().includes(value) ||
      assignment.className?.toLowerCase().includes(value) ||
      assignment.description?.toLowerCase().includes(value) ||
      assignment.teacher?.toLowerCase().includes(value)
    );
  });

  // create assignment
  const handleCreateAssignment = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.className ||
      !formData.description ||
      !formData.dueDate ||
      !formData.subject
    ) {
      toast.warning("Please fill all required fields");
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title: formData.title,
      className: formData.className,
      description: formData.description,
      dueDate: formData.dueDate,
      subject: formData.subject,
      teacherId: currentUser.id,
      teacher: currentUser.name,
      submittedBy: [],
    };

    addAssignment(newAssignment);
    toast.success("Assignments created successfully");

    setSearch("");

    setShowForm(false);
  };

  const handleDelete = (assignment: Assignment) => {
    setSelectedAssignmentId(assignment.id);
  };

  const confirmDelete = () => {
    if (selectedAssignmentId === null) return;

    deleteAssignment(selectedAssignmentId);
    setSelectedAssignmentId(null);

    toast.success("Assignment deleted successfully");
  };

  // submit assignment
  const handleSubmit = (assignmentId: number) => {
    if (!isStudent) return;
    submitAssignment(assignmentId, currentUser.id);
  };

  // check whether student submitted
  const isSubmitted = (assignment: Assignment) => {
    return assignment.submittedBy?.includes(currentUser.id);
  };

  //   Student submitted count
  const submittedCount = assignments.filter((assignment) => {
    assignment.submittedBy?.includes(currentUser.id);
  }).length;

  return (
    <div className="mx-auto w-full max-w-7xl p-2 lg:p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            {isAdmin
              ? "Administration"
              : isTeacher
                ? "Teacher Portal"
                : "Student Portal"}
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {isStudent ? "My Assignments" : "Assignments"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin
              ? "View all assignments in the school."
              : isTeacher
                ? "Create and manage assignments for your classes."
                : "View and submit your assigned coursework."}
          </p>
        </div>

        {/* Teacher Create Button */}
        {isTeacher && (
          <button
            onClick={() => setShowForm(!showForm)}
            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
              showForm
                ? "bg-red-500 hover:bg-red-600"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {showForm ? (
              <>
                <FiX size={17} />
                Cancel
              </>
            ) : (
              <>
                <FiPlus size={17} />
                Create Assignment
              </>
            )}
          </button>
        )}
      </div>

      {/* Create Assignment Form */}
      {isTeacher && showForm && (
        <form
          onSubmit={handleCreateAssignment}
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900">
            Create Assignment
          </h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {/* Title */}
            <InputField
              label="Assignment title"
              type="text"
              name="title"
              value={formData.title}
              setFormData={setFormData}
              placeholder="e.g. importance of education"
            />
            <InputField
              label="Subject"
              type="text"
              name="subject"
              value={formData.subject}
              setFormData={setFormData}
              placeholder="e.g. Social Studies"
            />
            <InputField
              label="Class"
              type="text"
              name="className"
              value={formData.className}
              setFormData={setFormData}
              placeholder="e.g. Class 10"
            />

            {/* Due Date */}
            <div className="relative">
              <InputField
                label="Date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                setFormData={setFormData}
              />

              <FiCalendar
                className="pointer-events-none  absolute right-4 top-2/3 -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>

            {/* Description */}
            <TextArea
              label={"Description"}
              name={"description"}
              value={formData.description}
              setFormData={setFormData}
              placeholder={"Assignment description"}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="mt-5 cursor-pointer rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Create Assignment
          </button>
        </form>
      )}

      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <DashboardCard
          title="Total Assignments"
          icon={FiFileText}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          value={isTeacher ? teacherAssignments.length : assignments.length}
        />

        <DashboardCard
          title={isStudent ? "Submitted Assignments" : "Available"}
          icon={FiFileText}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          value={
            isStudent
              ? submittedCount
              : isTeacher
                ? teacherAssignments.length
                : assignments.length
          }
        />
      </div>

      {/* Search */}
      <SearchInput
        value={search}
        placeholder="Search assignments ..."
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Assignment Count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
        <FiFileText size={17} />

        <span>
          {filteredAssignments.length}{" "}
          {filteredAssignments.length === 1 ? "Assignment" : "Assignments"}
        </span>
      </div>

      {/* Assignment Cards */}
      <AssignmentCard
        user={currentUser}
        filteredAssignments={filteredAssignments}
        isSubmitted={isSubmitted}
        isTeacher={isTeacher}
        isStudent={isStudent}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
      />

      {/* Empty */}
      {filteredAssignments.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FiFileText size={24} />
          </div>

          <h2 className="mt-4 font-bold text-slate-900">
            No assignments found
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {isTeacher
              ? "Create an assignment to get started."
              : "Try searching with a different keyword."}
          </p>
        </div>
      )}

      <ConfirmModal
        title="Delete assignment?"
        message="Are you sure you want to delete this assignment? This action cannot be undone."
        onCancel={() => {
          setSelectedAssignmentId(null);
        }}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Assignments;
