import type { AssignmentFormData, AssignmentFormErrors } from "../../type/AssignmentType";


export const validateAssignment = (
  formData: AssignmentFormData,
): AssignmentFormErrors => {
  const errors: AssignmentFormErrors = {};

  // Title
  if (!formData.title.trim()) {
    errors.title = "Title is required";
  } else if (!/^(?=(?:.*[A-Za-z]){3})[A-Za-z0-9\s]+$/.test(formData.title)) {
    errors.title =
      "Title must contain at least 3 letters and only letters, numbers, and spaces";
  }

  // Description
  if (!formData.description.trim()) {
    errors.description = "Description is required";
  }

  // Class
  if (!formData.classId.trim()) {
    errors.classId = "Class is required";
  }

  // Due date
  if (!formData.dueDate) {
    errors.dueDate = "Due date is required";
  }



  return errors;
};
