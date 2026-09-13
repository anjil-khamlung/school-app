import { create } from "zustand";
import type { SchoolStore, User } from "../type/type";
import { persist } from "zustand/middleware";

const initialUsers: User[] = [
  {
    id: 1,
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin123",
    role: "admin",
  },
];

export const useSchoolStore = create<SchoolStore>()(
  persist(
    (set) => ({
      users: initialUsers,
      currentUser: null,
      isAuthenticated: false,
      classes: [],
      assignments: [],
      announcements: [],

      register: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      login: (user) =>
        set(() => ({
          currentUser: user,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          currentUser: null,
          isAuthenticated: false,
        })),

      updateUser: (updateUser) =>
        set((state) => ({
          currentUser: updateUser,
          users: state.users.map((user) =>
            user.id === updateUser.id ? updateUser : user,
          ),
        })),

      addClass: (newClass) =>
        set((state) => ({
          classes: [...state.classes, newClass],
        })),
      deleteClass: (classId, teacherId) =>
        set((state) => ({
          classes: state.classes.filter(
            (classItem) =>
              !(classItem.id === classId && classItem.teacherId === teacherId),
          ),
        })),

      joinClass: (studentId, classId) =>
        set((state) => ({
          classes: state.classes.map((item) => {
            if (item.id !== classId) {
              return item;
            }

            const students = item.students || [];

            if (students.includes(studentId)) {
              return item;
            }

            return {
              ...item,
              students: [...students, studentId],
            };
          }),
        })),

      addAssignment: (newAssignment) =>
        set((state) => ({
          assignments: [...state.assignments, newAssignment],
        })),
      deleteAssignment: (assignmentId) =>
        set((state) => ({
          assignments: state.assignments.filter(
            (assignment) => assignment.id !== assignmentId,
          ),
        })),

      submitAssignment: (assignmentId, studentId) =>
        set((state) => ({
          assignments: state.assignments.map((assignment) => {
            if (assignment.id !== assignmentId) {
              return assignment;
            }

            const submittedBy = assignment.submittedBy || [];

            if (submittedBy.includes(studentId)) {
              return assignment;
            }

            return {
              ...assignment,
              submittedBy: [...submittedBy, studentId],
            };
          }),
        })),

      addAnnouncement: (announcement) =>
        set((state) => ({
          announcements: [announcement, ...state.announcements],
        })),

      deleteAnnouncement: (id) =>
        set((state) => ({
          announcements: state.announcements.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "school-store-2",
    },
  ),
);
