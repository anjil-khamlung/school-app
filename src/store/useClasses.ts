import { create } from "zustand";

import { supabase } from "../lib/supabase";
import type { ClassesStore } from "../type/classType";

export const useClasses = create<ClassesStore>((set,get) => ({
  classes: [],

  // Fetch classes
  getClasses: async () => {
  const { data, error } = await supabase.from("classes").select(`
    *,
    classesJoined (
      studentId
    )
  `);

    if (error) {
      console.error(error);
      return;
    }
    set({ classes: data });
  },

  //Add class
  addClass: async (newClass) => {
    const { error } = await supabase.from("classes").insert({
      class: newClass.class,
      section: newClass.section,
      subject: newClass.subject,
      teacherId: newClass.teacherId,
      time: newClass.time,
    });

    if (error) {
      console.log("error=", error);
      return false;
    }

    await get().getClasses();
    return true;
  },

  //Edit class
  updateClass: async (classId, updatedData) => {
    const { error } = await supabase
      .from("classes")
      .update({
        class: updatedData.class,
        section: updatedData.section,
        subject: updatedData.subject,
        time: updatedData.time,
      })
      .eq("id", classId);

    if (error) {
      console.log("Update class error:", error);
      return false;
    }

    await get().getClasses();

    return true;
  },

  //Delete class
  deleteClass: async (classId, teacherId) => {
    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", classId)
      .eq("teacherId", teacherId);

    if (error) {
      console.log("error=", error);
      return false;
    }
    await get().getClasses();

    return true;
  },

  //Join class
  joinClass: async (studentId, classId) => {
    const { error } = await supabase.from("classesJoined").insert({
      studentId,
      classId,
    });

    if (error) {
      console.log("join class error=", error);
      return false;
    }

    await get().getClasses();

    return true;
  },
}));
