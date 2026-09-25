import { useEffect, useMemo,  useState } from "react";
import { useSchoolStore } from "../../store/useSchoolStore";
import { FiCalendar, FiEdit2, FiFileText, FiPlus, FiX } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import TextArea from "../../components/inputs/TextArea";
import DashboardCard from "../../components/cards/DashboardCard";
import SearchInput from "../../components/inputs/SearchInput";
import AssignmentCard from "../../components/cards/AssignmentsCard";
import ConfirmModal from "../../components/ConfirmModal";
import { toast } from "react-toastify";
import { useAssignments } from "../../store/useAssignments";
import SelectField from "../../components/inputs/SelectField";
import type { AssignmentFormErrors } from "../../type/AssignmentType";
import { validateAssignment } from "../../lib/utils/validateAssignment";
import { useNavigate } from "react-router-dom";
import { useClasses } from "../../store/useClasses";

const Assignments = () => {
  const { currentUser } = useSchoolStore();
  const{classes,getClasses}=useClasses()

  const {
    assignments,
    getAssignments,
    updateAssignment,
    addAssignment,
    deleteAssignment,
    submitAssignment,
    getSubmittedAssignments,
    getSubmissionCounts,
  } = useAssignments();
  if (!currentUser) return null;

  const isAdmin = currentUser?.role === "admin";
  const isTeacher = currentUser?.role === "teacher";
  const isStudent = currentUser?.role === "student";

  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    null | string
  >(null);
  const [editingAssignmentId, setEditingAssignmentId] = useState<string | null>(
    null,
  );
  const [submittedAssignmentIds, setSubmittedAssignmentIds] = useState<
    string[]
  >([]);
  const [submissionCounts, setSubmissionCounts] = useState<
    Record<string, number>
  >({});

  const [errors, setErrors] = useState<AssignmentFormErrors>({});
  const initial = {
    title: "",
    classId: "",
    description: "",
    dueDate: "",
  };
  const [formData, setFormData] = useState(initial);


  const navigate = useNavigate();

  //fetching assignemnts and submitted assignments
  useEffect(() => {
    const loadData = async () => {
      await getAssignments();
      await getClasses();

      if (!currentUser) return;

      if (currentUser.role === "student") {
        const submittedIds = await getSubmittedAssignments(currentUser.id);

        setSubmittedAssignmentIds(submittedIds);
      }

      if (currentUser.role === "teacher") {
        const counts = await getSubmissionCounts();

        setSubmissionCounts(counts);
      }
    };

    loadData();
  }, [
    currentUser,
    getAssignments,
    getSubmittedAssignments,
    getSubmissionCounts,
  ]);


  // Calculate total submissions for the current teacher
  const totalSubmissions = useMemo(() => {
    if (!currentUser || currentUser.role !== "teacher") {
      return 0;
    }

    const myAssignmentIds = assignments
      .filter((assignment) => assignment.teacherId === currentUser.id)
      .map((assignment) => assignment.id);

    return myAssignmentIds.reduce(
      (total, id) => total + (submissionCounts[id] || 0),
      0,
    );
  }, [assignments, submissionCounts, currentUser]);

  const teacherAssignments = assignments.filter(
    (assignments) => assignments.teacherId === currentUser.id,
  );

  const visibleAssignments = isTeacher ? teacherAssignments : assignments;

  //Search
  const filteredAssignments = visibleAssignments.filter((assignment) => {
    // Hide the assignment currently being edited
    if (editingAssignmentId !== null && assignment.id === editingAssignmentId) {
      return false;
    }

    const value = search.trim().toLowerCase();
    if (!value) return true;

    return (
      assignment.title?.toLowerCase().includes(value) ||
      assignment.description?.toLowerCase().includes(value) ||
      assignment.teacher?.toLowerCase().includes(value)
    );
  });

  // create assignment
  const handleCreateAssignment = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Validation
    const validationErrors = validateAssignment(formData);
    setErrors(validationErrors);
    // Stop if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // EDIT
    if (editingAssignmentId !== null) {
      const success = await updateAssignment(editingAssignmentId, {
        title: formData.title,
        classId: formData.classId,
        dueDate: formData.dueDate,
        description: formData.description,
      });

      if (!success) {
        toast.error("Failed to update class");
        return;
      }

      toast.success("Class updated successfully");

      setEditingAssignmentId(null);
      setFormData(initial);
      setShowForm(false);
      return;
    }

    //CREATE
    const newAssignment = {
      title: formData.title,
      classId: formData.classId,
      description: formData.description,
      dueDate: formData.dueDate,
      teacherId: currentUser.id,
      teacher: currentUser.name,
    };

    const success = await addAssignment(newAssignment);

    if (!success) {
      toast.error("Failed to create assignments");
      return;
    }
    toast.success("Assignments created successfully");

    setSearch("");
    setFormData(initial);
    setShowForm(false);
  };

  const handleDelete = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
  };

  //Edit class
  const handleEdit = (assignmentId: string) => {
    const selectedAssignment = assignments.find(
      (item) => item.id === assignmentId,
    );

    if (!selectedAssignment) return;

    setEditingAssignmentId(assignmentId);

    setFormData({
      classId: selectedAssignment.classId,
      title: selectedAssignment.title,
      dueDate: selectedAssignment.dueDate,
      description: selectedAssignment.description,
    });

    setShowForm(true);
  };

  //delete assignment
  const confirmDelete = async () => {
    if (selectedAssignmentId === null || !currentUser) return;

    const success = await deleteAssignment(
      selectedAssignmentId,
      currentUser.id,
    );

    if (!success) {
      toast.error("Failed to create Assignment");
      return;
    }

    setSelectedAssignmentId(null);

    toast.success("Assignment deleted successfully");
  };

  // submit assignment
  const handleSubmit = async (
    assignmentId: string,
    submissionContent: string,
  ) => {
    if (!currentUser) return false;

    const assignment = assignments.find(
      (assignment) => assignment.id === assignmentId,
    );

    if (!assignment) return false;

    const success = await submitAssignment(
      assignmentId,
      currentUser.id,
      submissionContent,
      new Date(),
    );

    if (success) {
      toast.success("Assignment submitted successfully");
    } else {
      toast.error("Failed to submit assignment");
    }

    setSubmittedAssignmentIds(await getSubmittedAssignments(currentUser.id));

    return success;
  };

  //Total assignments submitted by a student(currentUser)
  const submittedCount = assignments.filter((assignment) =>
    submittedAssignmentIds.includes(assignment.id),
  ).length;

  //Form toggle
  const handleFormToggle = () => {
    if (showForm) {
      // Cancel
      setFormData(initial);
      setEditingAssignmentId(null);
      setShowForm(false);
    } else {
      // Open create form
      setFormData(initial);
      setEditingAssignmentId(null);
      setShowForm(true);
    }
  };

  //Class options for selecting
const classOptions = classes
  .filter((item) => item.teacherId === currentUser?.id)
  .map((item) => ({
    value: item.id,
    label: `${item.class} - ${item.subject}`,
  }));

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
  

        {/* Teacher Create /Cancel Button */}
        {isTeacher && (
          <button
            onClick={handleFormToggle}
            className={`flex mt-auto cursor-pointer items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
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
                Create
              </>
            )}
          </button>
        )}
      </div>

      {/* Create Assignment Form */}
      {isTeacher && showForm && (
        <form
          onSubmit={handleCreateAssignment}
          className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-bold text-slate-900">
            Create Assignment
          </h2>

          <div className="mt-5 grid items-start gap-4 sm:grid-cols-2">
            {/* Title */}
            <InputField
              label="Assignment title"
              type="text"
              name="title"
              value={formData.title}
              setFormData={setFormData}
              placeholder="e.g. importance of education"
              error={errors.title}
            />

            {/* Class  */}
            <SelectField
              label="Class"
              placeholder="Select class"
              value={formData.classId}
              options={classOptions}
              error={errors.classId}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  classId: value,
                }))
              }
            />

            {/* Due Date */}
            <div className="relative">
              <InputField
                label="Date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                setFormData={setFormData}
                error={errors.dueDate}
              />

              <FiCalendar
                className="pointer-events-none absolute right-12 top-2/3 -translate-y-1/2 text-slate-400"
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
              error={errors.description}
            />
          </div>

          {/* Actions */}
          <div className="mt-6">
            <button
              type="submit"
              className={`flex cursor-pointer items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                editingAssignmentId !== null
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {editingAssignmentId !== null ? (
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
          title={isStudent || isTeacher ? "Submitted Assignments" : "Available"}
          icon={FiFileText}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          value={
            isStudent
              ? submittedCount
              : isTeacher
                ? totalSubmissions
                : assignments.length
          }
          buttonText={isTeacher ? "See assignments" : ""}
          onClick={() => navigate("/teacher/submittedAssignments")}
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

      {/* Assignment Card */}
      {filteredAssignments.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              classes={classes}
              isSubmitted={submittedAssignmentIds.includes(assignment.id)}
              submittedCount={submissionCounts[assignment.id] || 0}
              handleSubmit={handleSubmit}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              user={currentUser}
            />
          ))}
        </div>
      ) : (
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
