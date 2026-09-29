import { create } from "zustand";
import type { AssignmentsStore } from "../type/AssignmentType";
import { supabase } from "../lib/supabase";

export const useAssignments = create<AssignmentsStore>((set, get) => ({
  assignments: [],

  // Fetch classes
  getAssignments: async () => {
    const { data, error } = await supabase.from("assignments").select(`
      *,
      users (
        name
      )
    `);

    if (error) {
      console.error(error);
      return;
    }

    set({ assignments: data });
  },

  //Add assignment
  addAssignment: async (newAssignment) => {
    const { error } = await supabase.from("assignments").insert({
      title: newAssignment.title,
      classId: newAssignment.classId,
      description: newAssignment.description,
      dueDate: newAssignment.dueDate,
      teacherId: newAssignment.teacherId,
      fullMarks: newAssignment.fullMarks,
      passMarks: newAssignment.passMarks,
    });

    if (error) {
      console.log("error=", error);
      return false;
    }
    await useAssignments.getState().getAssignments();

    return true;
  },

  //Edit class
  updateAssignment: async (assignmentId, updatedData) => {
    const { error } = await supabase
      .from("assignments")
      .update({
        classId: updatedData.classId,
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
    await useAssignments.getState().getAssignments();

    return true;
  },

  //Submit assignment
  submitAssignment: async (assignmentId, studentId, content, date) => {
    const { error } = await supabase.from("assignmentsSubmitted").insert({
      assignmentId,
      studentId,
      content,
      date,
    });

    if (error) {
      console.log("Assignment submit error=", error);
      return false;
    }
    await get().getAssignments();

    return true;
  },

  //Get submitted Assignments for students
  getSubmittedAssignments: async (studentId: string) => {
    const { data, error } = await supabase
      .from("assignmentsSubmitted")
      .select("assignmentId")
      .eq("studentId", studentId);

    if (error) {
      console.error("Error fetching submissions:", error);
      return [];
    }

    return data.map((submission) => submission.assignmentId);
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
        title,
        description,
        fullMarks,
        passMarks,
        classId,
        teacherId,
        classes (
          class,
          subject
        )
      ),
      users (
        name
      )
    `,
      )
      .eq("assignments.teacherId", teacherId);

    if (error) {
      console.error(error);
      return [];
    }

    return data.map((submission) => ({
      ...submission,
      studentName: submission.users?.name || "Unknown Student",
      assignmentTitle: submission.assignments.title,
      description: submission.assignments.description,
      fullMarks: submission.assignments.fullMarks,
      passMarks: submission.assignments.passMarks,
      class: submission.assignments.classes?.class || "Unknown Class",
      subject: submission.assignments.classes?.subject || "Unknown Subject",
    }));
  },

  updateSubmittedAssignment: async (submissionId, marks) => {
    const { error } = await supabase
      .from("assignmentsSubmitted")
      .update({
        obtainedMarks: marks,
      })
      .eq("id", submissionId);

    if (error) {
      console.error(error);
      return false;
    }

    return true;
  },

  //teacher asignments and total submissions
  getTeacherAssignmentStats: async (teacherId: string) => {
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
}));
