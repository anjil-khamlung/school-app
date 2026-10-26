import type {
  AssignmentFormData,
  AssignmentFormErrors,
  AssignmentQuestion,
} from "../../type/AssignmentType";

export const validateAssignment = (
  formData: AssignmentFormData,
  questions: AssignmentQuestion[],
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

  // Subject
  if (!formData.subjectId.trim()) {
    errors.subjectId = "Subject is required";
  }

  // Due date
  if (!formData.dueDate) {
    errors.dueDate = "Due date is required";
  }

  // Questions
questions.forEach((item, index) => {
  if (!item.question.trim()) {
    errors[`question-${index}`] = `Question ${index + 1} is required`;
  }

const marks = Number(item.marks);

if (String(item.marks).trim() === "" || Number.isNaN(marks)) {
  errors[`marks-${index}`] = "Marks must contain numbers only";
} else if (!Number.isInteger(marks) || marks <= 0 || marks > 100) {
  errors[`marks-${index}`] = "Marks must be a whole number between 1 and 100";
}
});

  return errors;
};
