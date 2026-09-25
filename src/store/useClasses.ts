import { create } from "zustand";

import { supabase } from "../lib/supabase";
import type { ClassesStore } from "../type/classType";

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
      class: newClass.class,
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

    await useClasses.getState().getClasses();
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

    await useClasses.getState().getClasses();

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
    await useClasses.getState().getClasses();

    return true;
  },

  //Join class
  joinClass: async (studentId, classId) => {
    // Get the current class
    const { data: classData, error: fetchError } = await supabase
      .from("classes")
      .select("students")
      .eq("id", classId)
      .single();

    if (fetchError) {
      console.log("error=", fetchError);
      return false;
    }

    const students = classData.students || [];

    // Prevent joining twice
    if (students.includes(studentId)) {
      return true;
    }

    const { error } = await supabase
      .from("classes")
      .update({
        students: [...students, studentId],
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
