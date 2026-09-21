import type { ClassFormData, ClassFormErrors } from "../../type/classType";

export const validateClass = (formData: ClassFormData): ClassFormErrors => {
  const errors: ClassFormErrors = {};

  if (!formData.className.trim()) {
    errors.className = "Class is required";
  }

  if (!formData.section.trim()) {
    errors.section = "Section is required";
  }

  if (!formData.subject.trim()) {
    errors.subject = "Subject is required";
  }
  if (!/^(?=(?:.*[A-Za-z]){3})[A-Za-z0-9\s]+$/.test(formData.subject)) {
    errors.subject =
      "Subject must contain at least 3 letters and only letters, numbers, and spaces";
  }

  if (!formData.time.trim()) {
    errors.time = "Time is required";
  }

  return errors;
};
