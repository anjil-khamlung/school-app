import { FiBookOpen, FiPlus } from "react-icons/fi";
import { useSchoolStore } from "../../store/useSchoolStore";

const Subjects = () => {
  const { currentUser } = useSchoolStore();

      const isAdmin = currentUser?.role === "admin";
      const isTeacher = currentUser?.role === "teacher";
    const isStudent = currentUser?.role === "student";
    
  return (
    <div className="mx-auto w-full max-w-7xl p-2 lg:p-4">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-teal-600">
            {isAdmin
              ? "Administration"
              : isTeacher
                ? "Teacher Portal"
                : "Student Portal"}
          </p>

          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Subjects
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin && "View all subjects and their teachers."}

            {isTeacher && "Create and manage your subjects."}

            {isStudent && "View available classes and join your subjects."}
          </p>
        </div>

        {/* Create / Cancel Class */}
        {isTeacher && (
          <button
            type="button"
            popoverTarget="create-class-modal"
            popoverTargetAction="show"
            className="mt-auto flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            <FiPlus size={18} />
            Create
          </button>
        )}
      </div>

      {/* Create Class Form */}
      {/* <ClassModal
        formData={formData}
        setFormData={setFormData}
        currentUser={currentUser}
        editingClassId={editingClassId}
        setEditingClassId={setEditingClassId}
        className={className}
        section={section}
        time={time}
        initial={initial}
        setSearch={setSearch}
      /> */}

      {/* Search */}
      {/* <SearchInput
        placeholder="Search class ...."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}

      {/* Count */}
      <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
        <FiBookOpen size={17} />

        {/* <span>
          {filteredClasses.length}{" "}
          {filteredClasses.length === 1 ? "Class" : "Classes"}
        </span> */}
      </div>

      {/* Delete confirmation modal */}
      {/* <ConfirmModal
        title="Delete class?"
        message="Are you sure you want to delete this class? This action cannot be undone."
        onCancel={() => {
          setSelectedClassId(null);
        }}
        onConfirm={handleConfirmDelete}
      /> */}

      {/* Classes */}
      {/* {filteredClasses.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredClasses.map((item) => (
            <ClassCard
              key={item.id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleJoinClass={handleJoinClass}
              user={currentUser}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <FiBookOpen size={24} />
          </div>

          <p className="mt-4 font-semibold text-slate-800">No classes found</p>

          <p className="mt-1 text-sm text-slate-500">
            {isTeacher
              ? "You haven't created any classes yet."
              : isStudent
                ? "No classes are available."
                : "No classes available."}
          </p>
        </div>
      )} */}
    </div>
  );
}

export default Subjects