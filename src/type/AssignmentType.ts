export type Result = "Pass" | "Fail" | null;

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
  teacherId: string;
  fullMarks: number;
  passMarks: number;
  users?: {
    name: string;
  } | null;
  assignmentQuestions?: AssignmentQuestion[];
}
export type CreateAssignment = Omit<Assignment, "id">;

export interface AssignmentQuestion {
  id?: string;
  question: string;
  marks: number;
  questionNumber?: number;
}

export interface AssignmentAnswer {
  id: string;
  questionId: string;
  answer: string | null;
  marksObtained: number | null;
}

export interface SubmittedAssignment {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  class: string;
  subject: string;
  content: string;
  assignmentTitle: string;
  description: string;
  date: Date;
  fullMarks: number;
  passMarks: number;
  obtainedMarks: number | null;
  result: Result
  assignmentQuestions: AssignmentQuestion[];
  assignmentAnswers: AssignmentAnswer[];
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

  addAssignment: (newAssignment: CreateAssignment) => Promise<Assignment>;

  deleteAssignment: (
    assignmentId: string,
    teacherId: string,
  ) => Promise<boolean>;

  submitAssignment: (
    assignmentId: string,
    studentId: string,
    answers: Record<string, string>,
  ) => Promise<boolean>;

  getSubmittedAssignments: (studentId: string) => Promise<
    {
      assignmentId: string;
      obtainedMarks:number
      result: Result
    }[]
  >;

  //type= the object's key must be a string, and its value must be a number.
  getSubmissionCounts: () => Promise<Record<string, number>>;

  getSubmittedAssignmentsForTeacher: (
    teacherId: string,
  ) => Promise<SubmittedAssignment[]>;

  getTeacherAssignmentStats: (teacherId: string) => Promise<{
    teacherAssignments: Assignment[];
    totalSubmissions: number;
  }>;

  addAssignmentQuestions: (
    assignmentId: string,
    question: string,
    marks: number,
    questionNumber: number,
  ) => Promise<boolean>;

  getAssignmentQuestions: (
    AssignmentId: string,
  ) => Promise<AssignmentQuestion[]>;

  updateAssignmentQuestion: (
    questionId: string,
    question: string,
    marks: number,
  ) => Promise<boolean>;

  updateAnswerMarks: (
    questionMarks: Record<string, number | string>,
    assignmentAnswers: AssignmentAnswer[],
  ) => Promise<boolean>;

  checkAssignmentSubmissions: (AssignmentId: string) => Promise<boolean | null>;

  deleteAssignmentQuestion: (questionId: string) => Promise<boolean>;
}
