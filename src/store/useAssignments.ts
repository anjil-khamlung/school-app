import { create } from "zustand";
import type { AssignmentsStore } from "../type/type";
import { supabase } from "../lib/supabase";

export const useAssignments = create<AssignmentsStore>((set) => ({
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
      id: newAssignment.id,
      title: newAssignment.title,
      className: newAssignment.className,
      description: newAssignment.description,
      dueDate: newAssignment.dueDate,
      subject: newAssignment.subject,
      teacher: newAssignment.teacher,
      teacherId: newAssignment.teacherId,
      submittedBy: newAssignment.submittedBy,
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
        description:updatedData.description,
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
  submitAssignment: async (assignmentId, studentId) => {
    //Get the current class
    const { data: assignmentData, error: fetchError } = await supabase
      .from("assignments")
      .select("submittedBy")
      .eq("id", assignmentId)
      .single();

    if (fetchError) {
      console.log("error=", fetchError);
      return false;
    }

    const submittedBy = assignmentData.submittedBy || [];

    //Prevent joining twice
    if (submittedBy.includes(studentId)) {
      return true;
    }

    const { error } = await supabase
      .from("assignments")
      .update({
        submittedBy: [...submittedBy, studentId],
      })
      .eq("id", assignmentId);

    if (error) {
      console.log("error=", error);
      return false;
    }
    await useAssignments.getState().getAssignments();

    return true;
  },
}));
