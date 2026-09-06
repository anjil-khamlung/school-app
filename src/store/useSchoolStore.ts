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
    }),
    {
      name: "school-store-2",
    },
  ),
);

