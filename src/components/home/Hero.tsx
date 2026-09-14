import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import type { HomeProps,  User } from "../../type/type";

interface HeroProps {
  dashboardPath:string,
  stats:HomeProps[],
  recentUsers:User[],
  users:User[],
  isAuthenticated:boolean,
}

const Hero = ({
  dashboardPath,
  stats,
  recentUsers,
  users,
  isAuthenticated,
}:HeroProps) => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-50 via-white to-emerald-50">
      {/* Decorations */}
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-teal-200/30 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />

      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-emerald-200/30 blur-3xl sm:h-64 sm:w-64 lg:h-72 lg:w-72" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 md:gap-12 lg:grid-cols-2 lg:px-8 lg:py-20">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="min-w-0">
            <div className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-teal-200 bg-white px-3 py-2 text-xs font-medium text-teal-700 shadow-sm sm:px-4 sm:text-sm">
              <FiCheckCircle className="shrink-0" size={16} />

              <span>Smart School Management</span>
            </div>

            <h1 className="max-w-2xl wrap-break-word text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Everything your school needs,
              <span className="block text-teal-600">in one place.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8">
              School Management System makes it simple to manage students,
              teachers, classes, assignments, and academic information from one
              modern platform.
            </p>

            {/* Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              {isAuthenticated ? (
                  <button
                    onClick={() => navigate(dashboardPath)}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 hover:scale-105  hover:bg-teal-700 sm:w-auto"
                  >
                    Go to Dashboard
                    <FiArrowRight />
                  </button>
              ) : (
                <>
                  <button
                    onClick={() => navigate("/login")}
                    className="flex cursor-pointer w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 hover:scale-105  hover:bg-teal-700 sm:w-auto"
                  >
                    Get Started
                    <FiArrowRight />
                  </button>

                  <button
                    onClick={() => navigate("/register")}
                    className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-105  hover:border-teal-300 hover:text-teal-600 sm:w-auto"
                  >
                    Create Account
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* RIGHT - DYNAMIC DASHBOARD PREVIEW */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-full min-w-0">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/60 sm:rounded-3xl sm:p-5">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 sm:pb-5">
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-emerald-600 text-white sm:h-10 sm:w-10">
                    <FiBookOpen />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-900 sm:text-base">
                      SchoolManagementSystem
                    </p>

                    <p className="text-[10px] text-slate-400 sm:text-xs">
                      Management Dashboard
                    </p>
                  </div>
                </div>

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700">
                  <FiUser size={18} />
                </div>
              </div>

              {/* Dynamic Stats */}
              <div className="grid grid-cols-2 gap-2.5 py-4 sm:gap-4 sm:py-5">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className={`rounded-xl ${stat.bg} p-3 sm:rounded-2xl sm:p-4`}
                    >
                      <Icon
                        className={`mb-2 ${stat.iconColor} sm:mb-3`}
                        size={20}
                      />

                      <p className="text-xl font-bold text-slate-900 sm:text-2xl">
                        {stat.value}
                      </p>

                      <p className="text-xs text-slate-500 sm:text-sm">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Recent Activity */}
              <div className="rounded-xl border border-slate-100 p-3 sm:rounded-2xl sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
                  <p className="text-sm font-semibold text-slate-900 sm:text-base">
                    Recent Users
                  </p>

                  <span className="shrink-0 text-[10px] font-medium text-teal-600 sm:text-xs">
                    {users.length} total
                  </span>
                </div>

                <div className="space-y-3">
                  {recentUsers.length > 0 ? (
                    recentUsers.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 sm:gap-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 sm:h-9 sm:w-9">
                          {item.name?.charAt(0).toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-medium text-slate-700 sm:text-sm">
                            {item.name}
                          </p>

                          <p className="text-[10px] capitalize text-slate-400 sm:text-xs">
                            {item.role}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400">
                      No users registered yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
