import {
  FiUsers,
  FiClipboard,
  FiShield,
  FiUser,
  FiCalendar,
  FiFilePlus,
} from "react-icons/fi";

export const features = [
  {
    title: "Student Management",
    description:
      "Keep student profiles, academic information, and records organized in one central place.",
    icon: FiUsers,
    gradient: "from-teal-500 to-emerald-500",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    title: "Teacher Management",
    description:
      "Manage teachers, classes, subjects, and academic responsibilities efficiently.",
    icon: FiUsers,
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    title: "Attendance Tracking",
    description:
      "Record and monitor student attendance with accurate and easy-to-understand records.",
    icon: FiClipboard,
    gradient: "from-orange-500 to-amber-500",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
];

export const roles = [
  {
    title: "Admin",
    description:
      "Manage users, teachers, students, classes, and the entire school system.",
    icon: FiShield,
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    title: "Teacher",
    description:
      "Manage classes, attendance, subjects, students, and academic activities.",
    icon: FiUser,
    gradient: "from-emerald-500 to-green-500",
  },
  {
    title: "Student",
    description:
      "Access classes, attendance, academic information, and personal records.",
    icon: FiUser,
    gradient: "from-orange-500 to-amber-500",
  },
];

interface HomeStatsProps{
  students: number,
  teachers: number,
  totalClasses: number,
  totalAssignments:number
}


export const homeStats = ({
  students,
  teachers,
  totalClasses,
  totalAssignments,
}:HomeStatsProps) => [
  {
    label: "Students",
    value: students,
    icon: FiUsers,
    description: "Students registered in the school.",
    bg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
  {
    label: "Teachers",
    value: teachers,
    icon: FiUsers,
    description: "Teachers currently registered.",
    bg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    label: "Classes",
    value: totalClasses,
    icon: FiCalendar,
    description: "Classes available in the system.",
    bg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    label: "Assignments",
    value: totalAssignments,
    icon: FiFilePlus,
    description: "Assignments available for students.",
    bg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
];
