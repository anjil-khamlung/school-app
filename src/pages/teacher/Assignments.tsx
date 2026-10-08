import { useEffect, useState } from "react";
import { useSchoolStore } from "../../store/useSchoolStore";
import { FiFileText, FiPlus } from "react-icons/fi";
import DashboardCard from "../../components/cards/DashboardCard";
import SearchInput from "../../components/inputs/SearchInput";
import AssignmentCard from "../../components/cards/AssignmentsCard";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import { useAssignments } from "../../store/useAssignments";
import { useNavigate } from "react-router-dom";
import { useClasses } from "../../store/useClasses";
import AssignmentModal from "../../components/modals/AssignmentsModal";
import type {
  Result,
  Assignment,
  AssignmentQuestion,
} from "../../type/AssignmentType";

const Assignments = () => {
  const { currentUser } = useSchoolStore();
  const { classes, getClasses } = useClasses();
  const {
    assignments,
    getAssignments,
    deleteAssignment,
    submitAssignment,
    getSubmittedAssignments,
    getSubmissionCounts,
    getTeacherAssignmentStats,
    getAssignmentQuestions,
    checkAssignmentSubmissions,
  } = useAssignments();
  if (!currentUser) return null;

  const isAdmin = currentUser?.role === "admin";
  const isTeacher = currentUser?.role === "teacher";
  const isStudent = currentUser?.role === "student";

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

  const [stats, setStats] = useState<{
    teacherAssignments: Assignment[];
    totalSubmissions: number;
  }>({
    teacherAssignments: [],
    totalSubmissions: 0,
  });

  const [submittedAssignments, setSubmittedAssignments] = useState<
    {
      assignmentId: string;
      obtainedMarks: number | null;
      result: Result;
    }[]
  >([]);

  const initialQuestions = {
    question: "",
    marks: 25,
  };
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([
    initialQuestions,
  ]);

  const initial = {
    title: "",
    classId: "",
    subjectId: "",
    description: "",
    dueDate: "",
  };
  const [formData, setFormData] = useState(initial);

  const navigate = useNavigate();

  //fetching assignemnts,classes and submitted assignments
  useEffect(() => {
    const loadData = async () => {
      await getAssignments();
      await getClasses();

      if (!currentUser) return;

      if (currentUser.role === "student") {
        const data = await getSubmittedAssignments(currentUser.id);

        setSubmittedAssignments(data);
        setSubmittedAssignmentIds(
          data.map((submission) => submission.assignmentId),
        );
      }

      if (currentUser.role === "teacher") {
        const counts = await getSubmissionCounts();
        setSubmissionCounts(counts);

        const data = await getTeacherAssignmentStats(currentUser.id);
        setStats(data);
      }
    };

    loadData();
  }, [
    currentUser,
    getAssignments,
    getSubmittedAssignments,
    getSubmissionCounts,
    getTeacherAssignmentStats,
  ]);


  
const joinedClassSubjectIds = new Set(
  classes
    .filter((cls) => cls.classesJoined?.some((joined) => joined.studentId === currentUser.id))
    .map((cls) => cls.id),
);

  //Assignments according to role
const visibleAssignments = isTeacher
  ? assignments.filter((a) => a.teacherId === currentUser.id)
  : isStudent
    ? assignments.filter((a) => joinedClassSubjectIds.has(a.classSubjectId))
    : assignments;


  //Search
  const filteredAssignments = visibleAssignments.filter((assignment) => {
    const value = search.trim().toLowerCase();
    if (!value) return true;

    return (
      assignment.title?.toLowerCase().includes(value) ||
      assignment.description?.toLowerCase().includes(value)
    );
  });

  //Edit assignment
  const handleEdit = async (assignmentId: string) => {
    const hasSubmissions = await checkAssignmentSubmissions(assignmentId);

    if (hasSubmissions === null) return;

    if (hasSubmissions) {
      toast.error("Cannot edit because students have submitted.");
      return;
    }

    const selectedAssignment = assignments.find(
      (item) => item.id === assignmentId,
    );

    if (!selectedAssignment) return;

    setEditingAssignmentId(assignmentId);

    setFormData({
      classId: selectedAssignment.classes?.classId ?? "",
      subjectId: selectedAssignment.classes?.subjectId ?? "",
      title: selectedAssignment.title,
      dueDate: selectedAssignment.dueDate,
      description: selectedAssignment.description,
    });

    // Get questions from Supabase
    const data = await getAssignmentQuestions(assignmentId);

    setQuestions(
      data.map((item) => ({
        id: item.id,
        question: item.question,
        marks: item.marks,
      })),
    );

    // Open popover modal
    const modal = document.getElementById("create-assignment-modal");

    if (modal instanceof HTMLElement) {
      modal.showPopover();
    }
  };

  const handleDelete = (assignmentId: string) => {
    setSelectedAssignmentId(assignmentId);
  };

  //delete assignment
  const confirmDelete = async () => {
    if (selectedAssignmentId === null || !currentUser) return;

    const success = await deleteAssignment(
      selectedAssignmentId,
      currentUser.id,
    );

    if (!success) {
      toast.error("Failed to Delete Assignment");
      return;
    }

    setSelectedAssignmentId(null);

    toast.success("Assignment deleted successfully");
  };

  // submit assignment
  const handleSubmit = async (
    assignmentId: string,
    answers: Record<string, string>,
  ) => {
    if (!currentUser) return false;

    const assignment = assignments.find(
      (assignment) => assignment.id === assignmentId,
    );

    if (!assignment) return false;

    const success = await submitAssignment(
      assignmentId,
      currentUser.id,
      answers,
    );

    if (success) {
      toast.success("Assignment submitted successfully");
    } else {
      toast.error("Failed to submit assignment");
    }

    setSubmittedAssignmentIds(
      (await getSubmittedAssignments(currentUser.id)).map(
        (submission) => submission.assignmentId,
      ),
    );

    return success;
  };

  //Total assignments submitted by a student
  const submittedCount = assignments.filter((assignment) =>
    submittedAssignmentIds.includes(assignment.id),
  ).length;

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
            type="button"
            popoverTarget="create-assignment-modal"
            popoverTargetAction="show"
            className="mt-auto flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <FiPlus size={18} />
            Create
          </button>
        )}
      </div>

      {/* Create Assignment modal */}
      <AssignmentModal
        formData={formData}
        setFormData={setFormData}
        editingAssignmentId={editingAssignmentId}
        currentUser={currentUser}
        setEditingAssignmentId={setEditingAssignmentId}
        initial={initial}
        setSearch={setSearch}
        questions={questions}
        setQuestions={setQuestions}
        initialQuestions={initialQuestions}
      />

      {/* Statistics */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <DashboardCard
          title="Total Assignments"
          icon={FiFileText}
          iconStyle="bg-teal-50 text-teal-600"
          textStyle="text-teal-600 hover:text-teal-700"
          value={
            isTeacher ? stats.teacherAssignments.length : assignments.length
          }
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
                ? stats.totalSubmissions
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
          {filteredAssignments.map((assignment) => {
            const submission = submittedAssignments.find(
              (item) => item.assignmentId === assignment.id,
            );

            return (
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
                result={submission?.result}
                obtainedMarks={submission?.obtainedMarks}
              />
            );
          })}
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
