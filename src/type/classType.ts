export interface ClassFormData {
  className: string;
  section: string;
  subject: string;
  time: string;
}

export interface ClassFormErrors {
  className?: string;
  section?: string;
  subject?: string;
  time?: string;
}

export interface Class {
  id: string;
  className: string;
  section: string;
  students: string[];
  subject: string;
  teacherId: string;
  teacherName: string;
  time: string;
}
export type CreateClass = Omit<Class, "id">;

export interface ClassesStore {
  classes: Class[];
  getClasses: () => Promise<void>;
  addClass: (newClass: CreateClass) => Promise<boolean>;
  updateClass: (
    classId: string,
    updatedData: {
      className: string;
      section: string;
      subject: string;
      time: string;
    },
  ) => Promise<boolean>;
  deleteClass: (classId: string, teacherId: string) => Promise<boolean>;
  joinClass: (studentId: string, classId: string) => Promise<boolean>;
}
