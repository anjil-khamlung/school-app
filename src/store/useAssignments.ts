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

  //Delete assignment
  deleteAssignment: async (assignmentId, teacherId) => {
    const { error } = await supabase
      .from("assignments")
      .delete()
      .eq("id", assignmentId)
      .eq("teacherId", teacherId);

    if (error) {
      console.log("error=", error);
      return false;
    }
      await useAssignments.getState().getAssignments();

    return true;

  },

  //Submit assignment
    submitAssignment: async(assignmentId, studentId) =>
    {
        const { error } = await supabase
          .from("assignments")
          .update({
            submittedBy: [studentId],
          })
          .eq("id", assignmentId);

        if(error)
        {
            console.log("error=",error)
            return false 
        }
      await useAssignments.getState().getAssignments();
        
        return true
      
      }
}));
