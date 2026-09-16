import { create } from "zustand";
import type { ClassesStore } from "../type/type";
import { supabase } from "../lib/supabase";

export const useClasses = create<ClassesStore>((set) => ({
  classes: [],

  // Fetch classes
  getClasses: async () => {
    const { data, error } = await supabase.from("classes").select("*");

    if (error) {
      console.error(error);
      return;
    }
    set({ classes: data });
  },

  //Add class
  addClass: async (newClass) => {
    const { error } = await supabase.from("classes").insert({
      id: newClass.id,
      name: newClass.name,
      section: newClass.section,
      students: newClass.students,
      subject: newClass.subject,
      teacherId: newClass.teacherId,
      teacherName: newClass.teacherName,
      time: newClass.time,
    });

    if (error) {
      console.log("error=", error);
      return false;
      }
      
      await useClasses.getState().getClasses()
    return true;

 
  },

  //Delete class
  deleteClass: async (classId, teacherId) => {
    const { error } = await supabase.from("classes").delete().eq("id", classId)
    .eq("teacherId", teacherId);

    if (error) {
      console.log("error=", error);
      return false;
      }
      await useClasses.getState().getClasses();
      

    return true;

  },

  //Join class
  joinClass: async (studentId, classId) => {
    const { error } = await supabase
      .from("classes")
      .update({
        students: [studentId],
      })
      .eq("id", classId);

    if (error) {
      console.log("error=", error);
      return false;
    }
      await useClasses.getState().getClasses();

    return true;

  },
}));