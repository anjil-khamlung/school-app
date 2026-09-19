import type { Dispatch, SetStateAction } from "react";
import { FiLogOut,  FiX } from "react-icons/fi";
import SidebarLinks from "./SidebarLinks";
import { useSchoolStore } from "../store/useSchoolStore";
import { adminLinks, studentLinks, teacherLinks } from "../data/sidebarLinks";
import type { SidebarLink } from "../type/type";
import { toast } from "react-toastify";

interface DashboardSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardSidebar = ({ open, setOpen }: DashboardSidebarProps) => {
  const { currentUser,logout } = useSchoolStore();

  if (!currentUser) return null;
  const user = currentUser;

  const links: SidebarLink[] =
    user.role === "admin"
      ? adminLinks
      : user.role === "teacher"
        ? teacherLinks
        : studentLinks;

  const mainLinks = links.slice(0, -1);
  const settingsLinks = links.slice(-1);

  const handleLogout = () => {
    logout()
    toast.warning("You have been logout")
  }

  return (
    <aside
      className={`fixed left-0 top-16 z-50 border-t flex h-[calc(100vh-4rem)] w-70 flex-col
    overflow-y-auto
    border-r border-slate-200 bg-white shadow-xl
    transition-transform duration-300
    lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none
     ${open ? "translate-x-0" : "-translate-x-full"}
    `}
    >
      {/* Close button */}
      <button
        onClick={() => setOpen(false)}
        className="ml-auto mr-4 mt-2 shrink-0 cursor-pointer rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
      >
        <FiX size={30} />
      </button>

      {/* Navigation */}
      <nav className="flex-1  overflow-y-auto px-4 py-4">
        {/* Main Menu */}
        <p className="mb-4 px-3 text-sm font-bold uppercase tracking-widest text-slate-400">
          Main Menu
        </p>

        <SidebarLinks links={mainLinks} user={user} setOpen={setOpen} />

        {/* System */}
        <div className="mt-4">
          <p className="mb-4 px-3 text-sm font-bold uppercase tracking-widest text-slate-400">
            System
          </p>

          <SidebarLinks links={settingsLinks} user={user} setOpen={setOpen} />
        </div>

        {/* Logout */}
        <div className="mt-4 border-t border-slate-200 pt-4">
          <button
            onClick={handleLogout}
            className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-red-500 transition hover:bg-red-100"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition group-hover:bg-red-100">
              <FiLogOut size={18} />
            </div>
            Logout
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
