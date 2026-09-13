import { FiMail, FiUser } from "react-icons/fi";
import type { User } from "../type/type";

interface UsersTableProps {
  users: User[];
  totalUsers: number;
}

const UsersTable = ({ users, totalUsers }: UsersTableProps) => {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {users.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100  text-slate-400">
            <FiUser size={24} />
          </div>

          <h2 className="mt-4 font-bold text-slate-900">No users found</h2>

          <p className="mt-1 text-sm text-slate-500">
            {totalUsers === 0
              ? "No users have been registered yet."
              : "Try changing your search."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Email
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    Role
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                    ID
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="transition hover:bg-teal-50">
                    {/* User */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-teal-600 to-emerald-600 font-semibold text-white">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {user.name}
                          </p>

                          <p className="text-xs text-slate-400">User</p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FiMail size={15} />
                        {user.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold capitalize text-emerald-700">
                        {user.role}
                      </span>
                    </td>

                    {/* ID */}
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {user.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="divide-y divide-base-300 md:hidden">
            {users.map((user) => (
              <div key={user.id} className="p-5">
                <div className="flex items-center gap-3">
                  <div className="avatar placeholder">
                    <div className="w-11 rounded-full bg-primary text-primary-content">
                      <span>{user.name?.charAt(0).toUpperCase() || "U"}</span>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold">{user.name}</p>

                    <p className="truncate text-sm opacity-60">{user.email}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="badge badge-success">{user.role}</span>

                  <span className="text-xs opacity-50">ID: {user.id}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersTable