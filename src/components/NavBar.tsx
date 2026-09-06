import { FiBookOpen } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useSchoolStore } from "../store/useSchoolStore";

const NavBar = () => {
  const isAuthenticated=useSchoolStore((state)=>state.isAuthenticated)

  return (
    <>
      <div className="shadow-sm">
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
          <div className="navbar-center hidden md:flex">
            <NavLink to="/" className={({isActive})=>`text-sm font-semibold px-3 py-2 ${isActive?"border-b-2 border-teal-600 text-teal-600":"hover:text-teal-700"}`}>
              Home
            </NavLink>
        
          
          </div>
          {!isAuthenticated && (
            <div className="navbar-end gap-2">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `hidden rounded-3xl px-3 py-2 text-sm font-semibold transition sm:px-4 md:block ${
                    isActive
                      ? "rounded-none border-b-2 border-teal-600 bg-transparent text-teal-600"
                      : "bg-teal-500 text-white hover:bg-teal-700"
                  }`
                }
              >
                Sign In
              </NavLink>

              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `hidden rounded-3xl px-3 py-2 text-sm font-semibold transition sm:px-4 md:block ${
                    isActive
                      ? "rounded-none border-b-2 border-teal-600 bg-transparent text-teal-600"
                      : "bg-teal-500 text-white hover:bg-teal-700"
                  }`
                }
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar