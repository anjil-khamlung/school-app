import { create } from "zustand";
import type { AssignmentsStore } from "../type/AssignmentType";
import { supabase } from "../lib/supabase";

export const useAssignments = create<AssignmentsStore>((set, get) => ({
  assignments: [],

  // Fetch classes
  getAssignments: async () => {
    const { data, error } = await supabase.from("assignments").select("*");

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
      className: newAssignment.className,
      description: newAssignment.description,
      dueDate: newAssignment.dueDate,
      subject: newAssignment.subject,
      teacher: newAssignment.teacher,
      teacherId: newAssignment.teacherId,
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
        className: updatedData.className,
        subject: updatedData.subject,
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
  submitAssignment: async (assignmentId, studentId, content, title, date) => {
    const { error } = await supabase.from("assignmentsSubmitted").insert({
      assignmentId,
      submittedBy: studentId,
      content,
      title,
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
      .eq("submittedBy", studentId);

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

  //Get submitted Assignments for students
  getSubmittedAssignmentsForTeacher: async (teacherId: string) => {
    // Get teacher's assignments
    const { data: assignments, error: assignmentError } = await supabase
      .from("assignments")
      .select("id")
      .eq("teacherId", teacherId);

    if (assignmentError) {
      console.error(assignmentError);
      return [];
    }

    const assignmentIds = assignments.map((assignment) => assignment.id);

    if (assignmentIds.length === 0) {
      return [];
    }

    // Get submissions
    const { data: submissions, error: submissionError } = await supabase
      .from("assignmentsSubmitted")
      .select("*")
      .in("assignmentId", assignmentIds);

    if (submissionError) {
      console.error(submissionError);
      return [];
    }

    if (submissions.length === 0) {
      return [];
    }

    // Get student IDs
    const studentIds = submissions.map((submission) => submission.submittedBy);
    // Get student names
    const { data: students, error: studentError } = await supabase
      .from("users")
      .select("id, name")
      .in("id", studentIds);

    if (studentError) {
      console.error(studentError);
      return [];
    }

    // Add student name to each submission
    return submissions.map((submission) => {
      const student = students.find(
        (student) => student.id === submission.submittedBy,
      );

      return {
        ...submission,
        studentName: student?.name || "Unknown Student",
      };
    });
  },
}));
