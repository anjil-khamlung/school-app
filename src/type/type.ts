import type { IconType } from "react-icons";

export type Role = "admin" | "student" | "teacher";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}

export interface SidebarLink {
  name: string;
  path: string;
  icon: IconType;
}

export interface Class {
  id: number;
  className: string;
  section: string;
  students: number[];
  subject: string;
  teacherId: number;
  teacherName: string;
  time: string;
}

export interface Assignment {
  id: number;
  title: string;
  className: string;
  description: string;
  dueDate: string;
  subject: string;
  teacher: string;
  teacherId: number;
  submittedBy: number[];
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
  date: Date;
  createdBy: string;
}

export interface ClassesStore {
  classes: Class[];
  getClasses: () => Promise<void>;
  addClass: (newClass: Class) => Promise<boolean>;
  updateClass: (
    classId: number,
    updatedData: {
      className: string;
      section: string;
      subject: string;
      time: string;
    },
  ) => Promise<boolean>;
  deleteClass: (classId: number, teacherId: number) => Promise<boolean>;
  joinClass: (studentId: number, classId: number) => Promise<boolean>;
}

export interface AssignmentsStore {
  assignments: Assignment[];
  getAssignments: () => Promise<void>;
  updateAssignment: (
    assignmentId: number,
    updatedData: {
      className: string;
      subject: string;
      title: string;
      dueDate: string;
      description:string,
    },
  ) => Promise<boolean>;
  addAssignment: (newAssignment: Assignment) => Promise<boolean>;
  deleteAssignment: (
    assignmentId: number,
    teacherId: number,
  ) => Promise<boolean>;
  submitAssignment: (
    assignmentId: number,
    studentId: number,
  ) => Promise<boolean>;
}

export interface AnnouncementsStore {
  announcements: Announcement[];
  getAnnouncements: () => Promise<void>;
  addAnnouncement: (announcement: Announcement) => Promise<boolean>;
  deleteAnnouncement: (id: number) => Promise<boolean>;
}

export interface UsersStore {
  users: User[];
  getUsers: () => Promise<void>;
}

export interface SchoolStore {
  currentUser: User | null;
  isAuthenticated: boolean;
  register: (user: User) => Promise<void>;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updateUser: User) => Promise<boolean>;
}

export interface HomeProps {
  label?: string;
  value?: number;
  title?: string;
  description: string;
  icon: IconType;
  gradient?: string;
  bg?: string;
  iconColor?: string;
}
