import { useState } from "react";
import { FiUser, FiMail, FiSave } from "react-icons/fi";
import { useSchoolStore } from "../store/useSchoolStore";
import { toast } from "react-toastify";
import type { User } from "../type/type";

const Settings = () => {
  const {currentUser,updateUser}=useSchoolStore()

  const [name, setName] = useState(currentUser?.name || "");

  const handleSubmit = (e:React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) return;

    if (!name.trim()) {
      toast.warning("Name cannot be empty");
      return;
    }

    const updatedUser:User = {
      ...currentUser,
      name: name.trim(),
    };

    updateUser(updatedUser);

    toast.success("Name updated successfully");
  };
  return (
    <div className="mx-auto w-full max-w-3xl p-2 lg:p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your profile information.
        </p>
      </div>

      {/* Profile */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Section Header */}
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <FiUser size={19} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900">Profile Information</h2>

              <p className="text-sm text-slate-500">
                Update your profile name.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <div className="relative">
              <FiUser
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <div className="relative">
              <FiMail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />

              <input
                type="email"
                value={currentUser?.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-500 outline-none"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Account Type
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium capitalize text-slate-500">
              {currentUser?.role}
            </div>
          </div>

          {/* Save */}
          <button
            type="submit"
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
          >
            <FiSave size={17} />
            Save Changes
          </button>
        </form>
      </section>
    </div>
  );
};

export default Settings;
