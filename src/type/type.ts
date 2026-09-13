import type { IconType } from "react-icons";

export type  Role="admin"|"student"|"teacher"

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}


export interface RegisterForm{
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
   role:Role,
}

export interface LoginForm{
    email: string,
    password:string,
}

export interface ContactForm{
  name: string,
  email: string,
  subject: string,
  message:string,
}

export interface SidebarLink {
  name: string;
  path: string;
  icon: IconType;
}

export interface Class{
  id: number,
  name: string,
  section: string,
  students: number[],
  subject: string,
  teacherId: number,
  teacherName: string,
  time:string,
  
}

export interface Assignment{
  id: number,
  title:string,
  className: string,
  description: string,
  dueDate: string,
  subject: string,
  teacher: string,
  teacherId: number,
  submittedBy:number[],
}

export interface Announcement{
  id: number,
  title: string,
  message: string,
  date: Date,
  createdBy:string,
}

export interface SchoolStore {
  users: User[];
  currentUser: User | null;
  isAuthenticated: boolean;
  classes: Class[];
  announcements: Announcement[];
  assignments: Assignment[];
  
  register: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updateUser: User) => void;
  addClass: (newClass: Class) => void;
  deleteClass: (classId: number, teacherId: number) => void;
  joinClass: (studentId: number, classId: number) => void;
  addAssignment: (newAssignment: Assignment) => void;
  deleteAssignment: (assignmentId: number) => void;
  submitAssignment: (assignmentId: number, studentId: number) => void;
  addAnnouncement: (announcement: Announcement) => void;
  deleteAnnouncement: (id: number) => void;
}

export interface HomeProps{
  title: string,
  description: string,
  icon: IconType,
  gradient: string,
  bg?: string,
  iconColor?:string,
}

export interface HomeStatsProps {
  students: User[];
  teachers: User[];
  totalClasses: number;
  totalAssignments: number;
}