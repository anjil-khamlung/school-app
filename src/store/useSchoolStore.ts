import { create } from "zustand";
import type { SchoolStore } from "../type/type";
import { persist } from "zustand/middleware";
import { supabase } from "../lib/supabase";

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,

      register: async (user) => {
        const { error } = await supabase.from("users").insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        });

        if (error) {
          console.log(error);
          return;
        }
      },

      login: (user) =>
        set(() => ({
          currentUser: user,
          // need refactor
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          currentUser: null,
          isAuthenticated: false,
        })),

      updateUser: async (updateUser) => {
        const { error } = await supabase
          .from("users")
          .update({
            name: updateUser.name,
          })
          .eq("id", updateUser.id);

        if (error) {
          console.log("error=", error);
          return false;
        }

        set({ currentUser: updateUser });
        return true;
      },

      // updateUser: async (updateUser) =>
      // {
      //   const { error } = await supabase.from("users").update({
      //     name:updateUser.name
      //   }).eq("id", updateUser.id)

      //   if(error)
      //   {
      //     console.log("error=",error)
      //     return false
      //   }

      //   return true
      //   // set((state) => ({
      //   //   currentUser: updateUser,
      //   //   users: state.users.map((user) =>
      //   //     user.id === updateUser.id ? updateUser : user,
      //   //   ),
      //   // })),
      // },

      // addClass: async (newClass) => {
      //   const { error } = await supabase.from("classes").insert({
      //     id: newClass.id,
      //     name: newClass.name,
      //     section: newClass.section,
      //     students: newClass.students,
      //     subject: newClass.subject,
      //     teacherId: newClass.teacherId,
      //     teacherName: newClass.teacherName,
      //     time: newClass.time,
      //   });

      //   if (error) {
      //     console.log("error=", error);
      //     return false;
      //   }
      //    await useSchoolStore.getState().
      //   return true;

      //   // set((state) => ({
      //   //   classes: [...state.classes, newClass],
      //   // }))

      // },

      // deleteClass: async (classId, teacherId) => {
      //   const { error } = await supabase
      //     .from("classes")
      //     .delete()
      //     .eq("id", classId)
      //     // .eq("teacherId", teacherId);

      //   if (error) {
      //     console.log("error=", error);
      //     return false;
      //   }
      //   return true;
      //   // set((state) => ({
      //   //   classes: state.classes.filter(
      //   //     (classItem) =>
      //   //       !(classItem.id === classId && classItem.teacherId === teacherId),
      //   //   ),
      //   // })),
      // },

      // joinClass: async(studentId, classId) =>

      // {
      //     const { error } = await supabase
      //       .from("classes")
      //       .update({
      //         students: [studentId],
      //       })
      //     .eq("id", classId);

      //   if (error) {
      //     console.log("error=",error)
      //     return false
      //   }

      //   return true
      //   // set((state) => ({
      //   //   classes: state.classes.map((item) => {
      //   //     if (item.id !== classId) {
      //   //       return item;
      //   //     }

      //   //     const students = item.students || [];

      //   //     if (students.includes(studentId)) {
      //   //       return item;
      //   //     }

      //   //     return {
      //   //       ...item,
      //   //       students: [...students, studentId],
      //   //     };
      //   //   }),
      //   // })),
      // },

      // addAssignment: async (newAssignment) => {
      //   const { error } = await supabase.from("assignments").insert({
      //     id: newAssignment.id,
      //     title: newAssignment.title,
      //     className: newAssignment.className,
      //     description: newAssignment.description,
      //     dueDate: newAssignment.dueDate,
      //     subject: newAssignment.subject,
      //     teacher: newAssignment.teacher,
      //     teacherId: newAssignment.teacherId,
      //     submittedBy: newAssignment.submittedBy,
      //   })

      //   if (error) {
      //     console.log("error=", error);
      //     return false;
      //   }

      //   return true;

      //   //   set((state) => ({
      //   //     assignments: [...state.assignments, newAssignment],
      //   //   })),
      // },

      // deleteAssignment: async(assignmentId,teacherId) =>
      // {
      //   const { error } = await supabase.from("assignments").delete().eq("id", assignmentId).eq("teacherId", teacherId)

      //   if (error) {
      //     console.log("error=",error)
      //     return false
      //   }

      //   return true
      //   // set((state) => ({
      //   //   assignments: state.assignments.filter(
      //   //     (assignment) => assignment.id !== assignmentId,
      //   //   ),
      //   // })),
      // },

      // submitAssignment: (assignmentId, studentId) =>
      //   set((state) => ({
      //     assignments: state.assignments.map((assignment) => {
      //       if (assignment.id !== assignmentId) {
      //         return assignment;
      //       }

      //       const submittedBy = assignment.submittedBy || [];

      //       if (submittedBy.includes(studentId)) {
      //         return assignment;
      //       }

      //       return {
      //         ...assignment,
      //         submittedBy: [...submittedBy, studentId],
      //       };
      //     }),
      //   })),

      //       addAnnouncement: async(announcement) =>
      //       {
      //         const { error } = await supabase.from("announcement").insert({
      //           id:announcement.id,
      //           title:announcement.title,
      //           message:announcement.message,
      //           date:announcement.date,
      //           createdBy:announcement.createdBy,
      //         })

      //         if (error) {
      //           console.log("error=",error)
      //           return false
      //         }

      //         return true
      //         // set((state) => ({
      //         //   announcements: [announcement, ...state.announcements],
      //         // })),
      //       },

      //       deleteAnnouncement: async(id) =>
      //       {
      // const {error}=await supabase.from("announcement").delete().eq("id",id)

      //         if (error) {
      //           console.log("error=",error)
      //           return false
      //         }

      //         return true
      //         // set((state) => ({
      //         //   announcements: state.announcements.filter((item) => item.id !== id),
      //         // })),
      //       }
    }),
    {
      name: "school-store-2",
    },
  ),
);
