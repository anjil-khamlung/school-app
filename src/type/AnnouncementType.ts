export interface AnnouncementFormData {
  title: string;
  message: string;
}

export interface AnnouncementFormErrors {
  title?: string;
  message?: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  date: Date;
  createdBy: string;
}
export type CreateAnnouncement = Omit<Announcement, "id">;


export interface AnnouncementsStore {
  announcements: Announcement[];
  getAnnouncements: () => Promise<void>;
  addAnnouncement: (announcement: CreateAnnouncement) => Promise<boolean>;
  updateAnnouncement: (
    announcementId: string,
    updatedData: {
      title: string;
      message: string;
    },
  ) => Promise<boolean>;
  deleteAnnouncement: (id: string) => Promise<boolean>;
}