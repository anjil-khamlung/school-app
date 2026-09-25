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
      classId: newAssignment.classId,
      description: newAssignment.description,
      dueDate: newAssignment.dueDate,
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
    // Get teacher's assignments
    const { data: assignments, error: assignmentError } = await supabase
      .from("assignments")
      .select("id, title, classId")
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
    const studentIds = submissions.map((submission) => submission.studentId);

    // Get student names
    const { data: students, error: studentError } = await supabase
      .from("users")
      .select("id, name")
      .in("id", studentIds);

    if (studentError) {
      console.error(studentError);
      return [];
    }

    // Get class IDs from assignments
    const classIds = [
      ...new Set(assignments.map((assignment) => assignment.classId)),
    ];

    // Get classes
    const { data: classes, error: classError } = await supabase
      .from("classes")
      .select("id, className")
      .in("id", classIds);

    if (classError) {
      console.error(classError);
      return [];
    }

    // Add student name, assignment title, and class name
    return submissions.map((submission) => {
      const student = students.find(
        (student) => student.id === submission.studentId,
      );

      const assignment = assignments.find(
        (assignment) => assignment.id === submission.assignmentId,
      );

      const selectedClass = classes.find(
        (item) => item.id === assignment?.classId,
      );

      return {
        ...submission,
        studentName: student?.name || "Unknown Student",
        assignmentTitle: assignment?.title || "Unknown Assignment",
        className: selectedClass?.className || "Unknown Class",
      };
    });
  },
}));
