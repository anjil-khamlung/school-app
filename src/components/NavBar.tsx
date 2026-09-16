import { FiBookOpen } from "react-icons/fi";
import { NavLink, useLocation } from "react-router-dom";
import { useSchoolStore } from "../store/useSchoolStore";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const NavBar = () => {
  const { currentUser, isAuthenticated, logout } = useSchoolStore();
  const handleLogout = () => {
    logout();
  };

  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/teacher") ||
    location.pathname.startsWith("/student");
  return (
    <>
      <div className="shadow-sm border-b border-slate-200  ">
        <div className="navbar text-slate-600 text-sm font-semibold  max-w-7xl  mx-auto">
          <div className="navbar-start">
            {/* <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  aria-label="Menu"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={-1}
                className="menu menu-sm dropdown-content text-black rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Item 1</a>
                </li>

                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </div> */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <NavLink
                to="/"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-emerald-600 text-white shadow-sm"
              >
                <FiBookOpen size={21} />
              </NavLink>

              <span className="hidden truncate text-lg font-bold tracking-tight text-slate-900 sm:block lg:text-xl">
                School
                <span className="text-teal-600">Management</span>
                <span className="text-orange-400">System</span>
              </span>
            </div>
          </div>

          <div className="navbar-center  md:flex">
            {!isDashboard && (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-sm font-semibold px-3 py-2 ${
                      isActive
                        ? "border-b-2 border-teal-600 text-teal-600"
                        : "hover:text-teal-700"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-sm font-semibold px-3 py-2 ${
                      isActive
                        ? "border-b-2 border-teal-600 text-teal-600"
                        : "hover:text-teal-700"
                    }`
                  }
                >
                  About
                </NavLink>

                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-sm font-semibold px-3 py-2 ${
                      isActive
                        ? "border-b-2 border-teal-600 text-teal-600"
                        : "hover:text-teal-700"
                    }`
                  }
                >
                  Contacts
                </NavLink>
              </>
            )}

            {isAuthenticated && isDashboard && (
              <NavLink
                onClick={close}
                to={
                  currentUser?.role === "admin"
                    ? "/admin"
                    : currentUser?.role === "teacher"
                      ? "/teacher"
                      : "/student"
                }
                className={({ isActive }) =>
                  `text-sm font-semibold px-3 py-2 ${
                    isActive
                      ? "border-b-2 border-teal-600 text-teal-600"
                      : "hover:text-teal-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {!isAuthenticated && (
            <div className="navbar-end gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden rounded-3xl border-b-2 px-3 py-2 text-sm font-semibold transition sm:px-4 md:block ${
                    isActive
                      ? "rounded-none border-teal-600 bg-transparent text-teal-600"
                      : "border-transparent bg-teal-500 text-white hover:bg-teal-700"
                  }`
                }
              >
                Sign In
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hidden rounded-3xl border-b-2 px-3 py-2 text-sm font-semibold transition sm:px-4 md:block ${
                    isActive
                      ? "rounded-none border-teal-600 bg-transparent text-teal-600"
                      : "border-transparent bg-teal-500 text-white hover:bg-teal-700"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}

          {isAuthenticated && (
            <div className="navbar-end">
              <Menu as="div" className="relative">
                <MenuButton className="avatar avatar-online avatar-placeholder cursor-pointer ">
                  <div className="w-10 rounded-full bg-slate-200 text-slate-600">
                    <span className="text-2xl">
                      {currentUser?.name.charAt(0).toUpperCase()}
                      
                    </span>
                  </div>
                </MenuButton>

                <MenuItems
                  anchor="bottom end"
                  className="mt-2 w-auto rounded-lg border border-slate-300 bg-white p-2 shadow-lg"
                >
                  <MenuItem>
                    <NavLink
                      to={`/${currentUser?.role}`}
                      className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 hover:text-teal-600"
                    >
                      Profile
                    </NavLink>
                  </MenuItem>

                  {isDashboard && (
                    <>
                      <MenuItem>
                        <NavLink
                          to="/"
                          className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 hover:text-teal-600"
                        >
                          Home
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          to="/about"
                          className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 hover:text-teal-600"
                        >
                          About
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink
                          to="/contact"
                          className="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 hover:text-teal-600"
                        >
                          Contact
                        </NavLink>
                      </MenuItem>
                    </>
                  )}

                  <MenuItem>
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 hover:bg-red-200 hover:text-red-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
