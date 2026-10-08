export interface ClassFormData {
  classId: string;
  subjectId: string;
  time: string;
}

export interface ClassFormErrors {
  classId?: string;
  subjectId?: string;
  time?: string;
}

export interface Class {
  id: string;
  classId: string;
  subjectId: string;
  teacherId: string;
  time: string;

  class?: {
    className: string;
  };

  subject?: {
    subjectName: string;
  };

  teacher?: {
    name:string
  }

  classesJoined?: {
    studentId: string;
  }[];
}
export type CreateClass = Omit<Class, "id">;

export interface Subject{
    id: string
    subjectName:string
}

export interface ClassesStore {
  classes: Class[];
  subjects: Subject[];
  getClasses: (classId?:string) => Promise<void>;
  getClass: () => Promise<{ id: string; className: string }[]>;
  getSubjects: () => Promise<{ id: string; subjectName: string }[]>;
  addClass: (newClass: CreateClass) => Promise<boolean>;
  updateClass: (
    classId: string,
    updatedData: {
      classId: string;
      subjectId: string;
      time: string;
    },
  ) => Promise<boolean>;
  deleteClass: (classId: string, teacherId: string) => Promise<boolean>;
  joinClass: (studentId: string, classId: string) => Promise<boolean>;
}
