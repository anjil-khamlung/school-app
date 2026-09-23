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

export interface Assignment {
  id: string;
  title: string;
  className: string;
  description: string;
  dueDate: string;
  subject: string;
  teacher: string;
  teacherId: string;
}
export type CreateAssignment = Omit<Assignment, "id">;

export interface SubmittedAssignment {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName:string,
  content: string;
  title?: string;
  date?: Date;
}



export interface AssignmentsStore {
  assignments: Assignment[];
  getAssignments: () => Promise<void>;
  updateAssignment: (
    assignmentId: string,
    updatedData: {
      className: string;
      subject: string;
      title: string;
      dueDate: string;
      description: string;
    },
  ) => Promise<boolean>;

  addAssignment: (newAssignment: CreateAssignment) => Promise<boolean>;

  deleteAssignment: (
    assignmentId: string,
    teacherId: string,
  ) => Promise<boolean>;

  submitAssignment: (
    assignmentId: string,
    studentId: string,
    content: string,
    title: string,
    date: Date,
  ) => Promise<boolean>;

  getSubmittedAssignments: (studentId: string) => Promise<string[]>;

  //type= the object's key must be a string, and its value must be a number.
  getSubmissionCounts: () => Promise<Record<string, number>>;

  getSubmittedAssignmentsForTeacher: (
    teacherId: string,
  ) => Promise<SubmittedAssignment[]>;
}