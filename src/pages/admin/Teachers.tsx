import { FiUsers } from "react-icons/fi";
import { useSchoolStore } from "../../store/useSchoolStore";
import SearchInput from "../../components/inputs/SearchInput";
import { useState } from "react";
import UsersTable from "../../components/UsersTable";

const Teachers = () => {
    const { currentUser, users } = useSchoolStore()

    const [search,setSearch]=useState("")
    
    const isAdmin = currentUser?.role === "admin"

    const teachers = users.filter((user) => user.role === "teacher")

    const filteredTeachers = teachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(search.toLowerCase())
    )
  return (
    <div className="p-2 lg:p-4 ">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            {isAdmin ? "Administration" : "Teacher Portal"}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Teachers
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin
              ? "View and manage all registered teachers."
              : "View teachers and their academic information."}
          </p>
        </div>

        {/* Total teachers */}
        <div className="flex w-fit items-center gap-2 rounded-xl bg-teal-50 px-4 py-3">
          <FiUsers size={18} className="text-teal-600" />

          <span className="text-sm font-semibold text-teal-700">
            {teachers.length} Teachers
          </span>
        </div>
      </div>

      {/* Search */}
      <SearchInput
        placeholder="Search teachers ..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Teachers */}
      <UsersTable users={filteredTeachers} totalUsers={teachers.length} />
    </div>
  );
}

export default Teachers