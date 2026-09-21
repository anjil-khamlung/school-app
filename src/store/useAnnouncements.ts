import { create } from "zustand";
import type { AnnouncementsStore } from "../type/type";
import { supabase } from "../lib/supabase";

export const useAnnouncements = create<AnnouncementsStore>((set) => ({
  announcements: [],

  // Fetch classes
  getAnnouncements: async () => {
    const { data, error } = await supabase.from("announcements").select("*");

    if (error) {
      console.error(error);
      return;
    }
    set({ announcements: data });
  },

  //Add announcement
  addAnnouncement: async (announcement) => {
    const { error } = await supabase.from("announcements").insert({
      id: announcement.id,
      title: announcement.title,
      message: announcement.message,
      date: announcement.date,
      createdBy: announcement.createdBy,
    });

    if (error) {
      console.log("error=", error);
      return false;
    }
    await useAnnouncements.getState().getAnnouncements();

    return true;
  },

  updateAnnouncement: async (announcementId, updatedData) => {
    const {  error } = await supabase
      .from("announcements")
      .update({
        title: updatedData.title,
        message: updatedData.message,
      })
      .eq("id", announcementId)
      .select()
      .single();

    if (error) {
      console.log("Update announcement error:", error);
      return false;
    }

      await useAnnouncements.getState().getAnnouncements();

    return true;
  },

  //Delete announcement
  deleteAnnouncement: async (id) => {
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("error=", error);
      return false;
    }
    await useAnnouncements.getState().getAnnouncements();

    return true;
  },
}));
