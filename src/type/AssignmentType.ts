export interface AssignmentFormData {
  title: string;
  classId: string;
  description: string;
  dueDate: string;
}

export interface AssignmentFormErrors {
  title?: string;
  classId?: string;
  description?: string;
  dueDate?: string;
}

export interface Assignment {
  id: string;
  title: string;
  classId: string;
  description: string;
  dueDate: string;
  // teacher: string;
  teacherId: string;
  fullMarks: number
  passMarks:number
}
export type CreateAssignment = Omit<Assignment, "id">;

export interface SubmittedAssignment {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  class: string;
  subject:string,
  content: string;
  assignmentTitle: string;
  description: string,
  date: Date;
  fullMarks: number,
  passMarks:number,
  obtainedMarks: number | null;
  result: "pass" | "fail" | null;
}



export interface AssignmentsStore {
  assignments: Assignment[];
  getAssignments: () => Promise<void>;
  updateAssignment: (
    assignmentId: string,
    updatedData: {
      classId: string;
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
    date: Date,
  ) => Promise<boolean>;

  getSubmittedAssignments: (studentId: string) => Promise<string[]>;

  //type= the object's key must be a string, and its value must be a number.
  getSubmissionCounts: () => Promise<Record<string, number>>;

  getSubmittedAssignmentsForTeacher: (
    teacherId: string,
  ) => Promise<SubmittedAssignment[]>;

  updateSubmittedAssignment:(submissionId:string,obtainedMarks:number,)=>Promise<boolean>

}