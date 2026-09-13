import { NavLink } from "react-router-dom";
import type { SidebarLink, User } from "../type/type";
import type { Dispatch, SetStateAction } from "react";

interface SidebarLinksProps{
    links: SidebarLink[],
    user: User,
    setOpen:Dispatch<SetStateAction<boolean>>
    
}

const SidebarLinks = ({ links, user, setOpen }:SidebarLinksProps) => {
  return (
    <div className="flex flex-col gap-6">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === `/${user?.role}`}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-teal-50 text-teal-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-teal-600"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600"
                  }`}
                >
                  <Icon size={18} />
                </div>

                {link.name}
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};

export default SidebarLinks;
