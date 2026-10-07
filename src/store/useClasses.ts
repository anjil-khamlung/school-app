import { create } from "zustand";

import { supabase } from "../lib/supabase";
import type { ClassesStore } from "../type/classType";

export const useClasses = create<ClassesStore>((set, get) => ({
  classes: [],
  subjects: [],

  // Fetch classes
  getClasses: async () => {
  const { data, error } = await supabase.from("classes").select(`
    *,
    class:classId (
      className
    ),
    subject:subjectId (
      subjectName
    ),
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

  getClass: async () => {
    const { data, error } = await supabase
      .from("class")
      .select("id, className");

    if (error) {
      console.error("Error fetching classes:", error);
      return [];
    }

    return data ?? [];
  },
  
  getSubjects: async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("id, subjectName")
      .order("subjectName");

    if (error) {
      console.error("Error fetching subjects:", error);
      return [];
    }

    set({ subjects: data ?? [] });

    return data ?? [];
  },

  //Add class
  addClass: async (newClass) => {
    const { error } = await supabase.from("classes").insert({
      classId: newClass.classId,
      subjectId: newClass.subjectId,
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
        classId: updatedData.classId,
        subjectId: updatedData.subjectId,
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
