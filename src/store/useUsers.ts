import { create } from "zustand";
import type { UsersStore } from "../type/type";
import { supabase } from "../lib/supabase";

export const useUsers = create<UsersStore>((set) => ({
  users: [],

  getUsers: async () => {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
        console.log("error=", error);
        return
        
      }
      
      set({users:data})
  },

 
}));
