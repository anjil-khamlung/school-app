import type { IconType } from "react-icons";

export type Role = "admin" | "student" | "teacher";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface SidebarLink {
  name: string;
  path: string;
  icon: IconType;
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
