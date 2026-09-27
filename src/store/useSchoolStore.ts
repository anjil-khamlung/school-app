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
         
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          currentUser: null,
          isAuthenticated: false,
        })),

      updateUser: async (updateUser) => {
        const { data,error } = await supabase
          .from("users")
          .update({
            name: updateUser.name,
          })
          .eq("id", updateUser.id).select().single()
        
        if (error) {
          console.log("error=", error);
          return false;
        }

        set({ currentUser: data });
        return true;
      },

     
    }),
    {
      name: "school-store-2",
    },
  ),
);
