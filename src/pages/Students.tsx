import { useState } from "react";
import { useSchoolStore } from "../store/useSchoolStore";
import { FiUsers } from "react-icons/fi";
import SearchInput from "../components/inputs/SearchInput";
import UsersTable from "../components/UsersTable";

const Students = () => {
    const { currentUser, users } = useSchoolStore()
    const [search,setSearch]=useState("")
    const isAdmin=currentUser?.role==="admin"
    const students = users.filter((user) => {
      return user.role==="student"
    })
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="mx-auto w-full max-w-7xl p-2 lg:p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            {isAdmin ? "Administration" : "Teacher Portal"}
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Students
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin
              ? "View and manage all registered students."
              : "View students and their academic information."}
          </p>
        </div>

        {/* Student count */}
        <div className="flex w-fit items-center gap-2 rounded-xl bg-teal-50 px-4 py-3">
          <FiUsers size={18} className="text-teal-600" />

          <span className="text-sm font-semibold text-teal-700">
            {students.length} Students
          </span>
        </div>
      </div>

      {/* Search */}
      <SearchInput
        placeholder="Search students ..."
        value={search}
        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />

      {/* Students */}
      <UsersTable users={filteredStudents} totalUsers={students.length} />
    </div>
  );
}

export default Students