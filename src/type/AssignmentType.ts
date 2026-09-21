export interface AssignmentFormData {
  title: string;
  className: string;
  description: string;
  dueDate: string;
  subject: string;
}

export interface AssignmentFormErrors {
  title?: string;
  className?: string;
  description?: string;
  dueDate?: string;
  subject?: string;
}