import { create } from "zustand";
import type { AssignmentsStore } from "../type/AssignmentType";
import { supabase } from "../lib/supabase";

export const useAssignments = create<AssignmentsStore>((set, get) => ({
  assignments: [],

  // Fetch classes
  getAssignments: async () => {
    const { data, error } = await supabase
      .from("assignments")
      .select(
        `
      *,
      users (
        name
      ),
      classes (
    
        classId,
        subjectId,
        class:classId (
          className
        ),
        subject:subjectId (
          subjectName
        )
      ),
      assignmentQuestions!assignmentQuestions_assignmentId_fkey (
        id,
        question,
        marks,
        questionNumber
      )
    `,
      )
      .order("questionNumber", {
        referencedTable: "assignmentQuestions",
        ascending: true,
      });

    if (error) {
      console.error(error);
      return;
    }

    set({ assignments: data });
  },

  //Add assignment
  addAssignment: async (newAssignment) => {
    const { data, error } = await supabase
      .from("assignments")
      .insert(newAssignment)
      .select()
      .single();

    if (error) {
      console.log("error=", error);
      return false;
    }
    await get().getAssignments();

    return data;
  },

  //Edit class
  updateAssignment: async (assignmentId, updatedData) => {
    const { error } = await supabase
      .from("assignments")
      .update({
        classSubjectId: updatedData.classSubjectId,
        // subjectId:updatedData.subjectId,
        title: updatedData.title,
        dueDate: updatedData.dueDate,
        description: updatedData.description,
      })
      .eq("id", assignmentId);

    if (error) {
      console.log("Update assignment error:", error);
      return false;
    }

    await useAssignments.getState().getAssignments();

    return true;
  },

  //Delete assignment
  deleteAssignment: async (assignmentId, teacherId) => {
    const { error } = await supabase
      .from("assignments")
      .delete()
      .eq("id", assignmentId)
      .eq("teacherId", teacherId);

    if (error) {
      console.log("Delete assignment error:", error);
      return false;
    }
    await get().getAssignments();

    return true;
  },

  //Submit assignment
  submitAssignment: async (assignmentId, studentId, answers) => {
    // 1. Create submission
    const { data: submission, error } = await supabase
      .from("assignmentsSubmitted")
      .insert({
        assignmentId,
        studentId,
      })
      .select("id")
      .single();

    if (error || !submission) {
      console.log("Assignment submit error =", error);
      return false;
    }

    // 2. Prepare question answers
    const answerRows = Object.entries(answers).map(([questionId, answer]) => ({
      submissionId: submission.id,
      questionId,
      studentId,
      answer,
      marksObtained: null,
    }));

    // 3. Save answers
    const { error: answerError } = await supabase
      .from("assignmentAnswers")
      .insert(answerRows);

    if (answerError) {
      console.log("Answer submit error =", answerError);
      return false;
    }

    await get().getAssignments();

    return true;
  },

  //Get submitted Assignments for students
  getSubmittedAssignments: async (studentId: string) => {
    const { data, error } = await supabase
      .from("assignmentsSubmitted")
      .select("assignmentId, obtainedMarks, result")
      .eq("studentId", studentId);

    if (error) {
      console.error("Error fetching submissions:", error);
      return [];
    }

    return data;
  },

  //Get Submission Count
  getSubmissionCounts: async () => {
    const { data, error } = await supabase
      .from("assignmentsSubmitted")
      .select("assignmentId");

    if (error) {
      console.error(error);
      return {};
    }

    const counts: Record<string, number> = {};

    data.forEach((submission) => {
      counts[submission.assignmentId] =
        (counts[submission.assignmentId] || 0) + 1;
    });

    return counts;
  },

  //Get submitted Assignments for teachers
  getSubmittedAssignmentsForTeacher: async (teacherId: string) => {
const { data, error } = await supabase
  .from("assignmentsSubmitted")
  .select(
    `
    *,
    assignments!inner (
      id,
      title,
      description,
      dueDate,
      fullMarks,
      passMarks,
      teacherId,
      classSubjectId,
        classes (
        id,
        classId,
        subjectId,
        class (
          className
        ),
        subjects (
          subjectName
        )
      ),

      assignmentQuestions!assignmentQuestions_assignmentId_fkey (
        id,
        question,
        marks,
        questionNumber
      )
    ),
    assignmentAnswers (
      id,
      questionId,
      answer,
      marksObtained
    ),
    users (
      name
    )
  `,
  )
  .eq("assignments.teacherId", teacherId);

  if (error) throw error;

    if (error) {
      console.error("getSubmittedAssignmentsForTeacher error:", error);
      return [];
    }

 return data.map((submission) => ({
   ...submission,
   studentName: submission.users?.name || "Unknown Student",
   assignmentTitle: submission.assignments.title,
   description: submission.assignments.description,
   fullMarks: submission.assignments.fullMarks,
   passMarks: submission.assignments.passMarks,
   class: submission.assignments.classes?.class?.className || "Unknown Class",
   subject:
     submission.assignments.classes?.subjects?.subjectName || "Unknown Subject",
   assignmentQuestions: submission.assignments.assignmentQuestions ?? [],
   assignmentAnswers: submission.assignmentAnswers ?? [],
 }));
  },

  //Update submitted assignment answer marks
  updateAnswerMarks: async (questionMarks, assignmentAnswers) => {
    for (const answer of assignmentAnswers) {
      const marks = questionMarks[answer.questionId];

      if (marks === undefined || marks === "") {
        continue;
      }

      const { error } = await supabase
        .from("assignmentAnswers")
        .update({
          marksObtained: Number(marks),
        })
        .eq("id", answer.id);

      if (error) {
        console.error(error);
        return false;
      }
    }

    await get().getAssignments();

    return true;
  },

  //teacher asignments and total submissions
  getTeacherAssignmentStats: async (teacherId: string) => {
    await get().getAssignments();
    await get().getSubmissionCounts();

    const { assignments, getSubmissionCounts } = get();

    const teacherAssignments = assignments.filter(
      (assignment) => assignment.teacherId === teacherId,
    );

    const submissionCounts = await getSubmissionCounts();

    const totalSubmissions = teacherAssignments.reduce(
      (total, assignment) => total + (submissionCounts[assignment.id] || 0),
      0,
    );

    return {
      teacherAssignments,
      totalSubmissions,
    };
  },

  //Add assignment questions
  addAssignmentQuestions: async (
    assignmentId,
    question,
    marks,
    questionNumber,
  ) => {
    const { error } = await supabase.from("assignmentQuestions").insert({
      assignmentId,
      question,
      marks,
      questionNumber,
    });

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  },

  //Get assignmnet questions
  getAssignmentQuestions: async (assignmentId) => {
    const { data, error } = await supabase
      .from("assignmentQuestions")
      .select("*")
      .eq("assignmentId", assignmentId)
      .order("questionNumber");

    if (error) {
      console.error(error);
      return [];
    }

    return data;
  },

  //Update assignment questions
  updateAssignmentQuestion: async (questionId, question, marks) => {
    const { error } = await supabase
      .from("assignmentQuestions")
      .update({
        question,
        marks,
      })
      .eq("id", questionId);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  },

  //Check if assignment has submissions
  checkAssignmentSubmissions: async (assignmentId: string) => {
    const { count, error } = await supabase
      .from("assignmentsSubmitted")
      .select("id", { count: "exact", head: true })
      .eq("assignmentId", assignmentId);

    if (error) {
      console.error(error.message);
      return null;
    }

    return (count ?? 0) > 0;
  },

  //Delete assignment questions
  deleteAssignmentQuestion: async (questionId) => {
    const { error } = await supabase
      .from("assignmentQuestions")
      .delete()
      .eq("id", questionId);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  },
}));
