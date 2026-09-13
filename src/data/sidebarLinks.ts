import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiCalendar,
  FiFileText,
  FiBarChart2,
  FiSettings,
} from "react-icons/fi";
import { TfiAnnouncement } from "react-icons/tfi";
import type { SidebarLink } from "../type/type";



export const adminLinks:SidebarLink[] = [
  {
    name: "Overview",
    path: "/admin",
    icon: FiHome,
  },
  {
    name: "Students",
    path: "/admin/students",
    icon: FiUsers,
  },
  {
    name: "Teachers",
    path: "/admin/teachers",
    icon: FiBookOpen,
  },
  {
    name: "Classes",
    path: "/admin/classes",
    icon: FiCalendar,
  },
  {
    name: "Assignments",
    path: "/admin/assignments",
    icon: FiFileText,
  },
  {
    name: "Announcements",
    path: "/admin/announcements",
    icon: TfiAnnouncement,
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: FiBarChart2,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: FiSettings,
  },
];

export const teacherLinks:SidebarLink[] = [
  {
    name: "Overview",
    path: "/teacher",
    icon: FiHome,
  },
  {
    name: "My Classes",
    path: "/teacher/classes",
    icon: FiBookOpen,
  },
  {
    name: "Students",
    path: "/teacher/students",
    icon: FiUsers,
  },

  {
    name: "Assignments",
    path: "/teacher/assignments",
    icon: FiFileText,
  },
  {
    name: "Announcements",
    path: "/teacher/announcements",
    icon: TfiAnnouncement,
  },
  {
    name: "Settings",
    path: "/teacher/settings",
    icon: FiSettings,
  },
];

export const studentLinks:SidebarLink[] = [
  {
    name: "Overview",
    path: "/student",
    icon: FiHome,
  },
  {
    name: "My Classes",
    path: "/student/classes",
    icon: FiBookOpen,
  },

  {
    name: "Assignments",
    path: "/student/assignments",
    icon: FiFileText,
  },
  {
    name: "Announcements",
    path: "/student/announcements",
    icon: TfiAnnouncement,
  },
  {
    name: "Settings",
    path: "/student/settings",
    icon: FiSettings,
  },
];
