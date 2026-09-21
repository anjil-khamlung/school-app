import type { AnnouncementFormData, AnnouncementFormErrors } from "../../type/AnnouncementType";


export const validateAnnouncement = (
  formData: AnnouncementFormData,
): AnnouncementFormErrors => {
  const errors: AnnouncementFormErrors = {};

  // Title
  if (!formData.title.trim()) {
    errors.title = "Title is required";
  } else if (!/^(?=(?:.*[A-Za-z]){3})[A-Za-z0-9\s]+$/.test(formData.title)) {
    errors.title =
      "Title must contain at least 3 letters and only letters, numbers, and spaces";
  }

  // Message
  if (!formData.message.trim()) {
    errors.message = "Message is required";
  } else if (formData.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
};;
