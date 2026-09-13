import { Outlet } from "react-router-dom"
import DashboardSidebar from "../DashboardSidebar"
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

const DashboardLayout = () => {
  const [sidebarOpen,setSidebarOpen]=useState(false)
  return (
    <div className="flex min-h-screen bg-slate-50">
      <DashboardSidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile menu button */}
        <header className="flex h-16 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer rounded-xl p-2 text-slate-600 transition hover:bg-slate-100 hover:text-teal-600"
          >
            <FiMenu size={30} />
          </button>

          <span className="ml-3 font-bold text-slate-900">Dashboard</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout