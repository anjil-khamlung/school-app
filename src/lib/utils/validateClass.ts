import type { ClassFormData, ClassFormErrors } from "../../type/classType";

export const validateClass = (formData: ClassFormData): ClassFormErrors => {
  const errors: ClassFormErrors = {};

  if (!formData.classId.trim()) {
    errors.classId = "Class is required";
  }

  if (!formData.subjectId.trim()) {
    errors.subjectId = "Subject is required";
  }

  if (!formData.time.trim()) {
    errors.time = "Time is required";
  }

  return errors;
};
