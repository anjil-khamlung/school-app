import { Link, NavLink, useNavigate } from "react-router-dom";
import InputField from "../../components/inputs/InputField";
import {
  FiBookOpen,
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiCheck,
  FiChevronDown,
} from "react-icons/fi";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { useState } from "react";
import type { RegisterForm, User } from "../../type/type";
import { useSchoolStore } from "../../store/useSchoolStore";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const users = useSchoolStore((state) => state.users);
  const register = useSchoolStore((state) => state.register);
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const existingUser = users.find((user) => user.email === formData.email);

    if (existingUser) {
      toast.warning("User already exists");
      return;
    }

    const user: User = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    };

    register(user);
    toast.success("register successfull");
    navigate("/login");
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071c1a] px-4 py-8">
      {/* Background decorations */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Main card */}
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2 ">
        {/* Left section */}
        <div className="relative hidden overflow-hidden bg-linear-to-br from-teal-700 via-teal-600 to-emerald-600 p-10 text-white md:flex md:flex-col md:justify-between">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border-40 border-white/10" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-50 border-white/10" />

          <div className="relative z-10">
            {/* Logo */}
            <NavLink
              to="/"
              className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur"
            >
              <FiBookOpen size={28} />
            </NavLink>

            <h1 className="text-4xl font-bold leading-tight">
              Join
              <br />
              SchoolManagement
              <br />
              System
            </h1>

            <p className="mt-5 max-w-md leading-7 text-teal-50">
              Create your account and become part of a smarter and more
              connected learning environment.
            </p>
          </div>

          {/* Features */}
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                ✓
              </div>

              <span className="text-sm text-teal-50">
                Easy access to your dashboard
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                ✓
              </div>

              <span className="text-sm text-teal-50">
                Manage your academic activities
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                ✓
              </div>

              <span className="text-sm text-teal-50">
                Stay connected with your school
              </span>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="p-7 sm:p-10 md:p-6">
          {/* Mobile logo */}
          <div className="mb-7 flex items-center gap-3 md:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-emerald-600 text-white">
              <FiBookOpen size={22} />
            </div>

            {/* <span className="text-xl font-bold text-slate-900">
              School<span className="text-teal-600">Management</span>
              <span className="text-orange-400">System</span>
            </span> */}
          </div>

          {/* Heading */}
          <div className="mb-7">
            <p className="mb-2 text-sm font-semibold text-teal-600">
              GET STARTED
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <InputField
              label="Full name"
              type="text"
              name="name"
              value={formData.name}
              setFormData={setFormData}
              placeholder="Enter your full name"
              style="pl-11"
              icon={FiUser}
            />

            {/* Email */}
            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              setFormData={setFormData}
              placeholder="you@gmail.com"
              style="pl-11"
              icon={FiMail}
            />

            {/* Role */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Account type
              </label>

              <Listbox
                value={formData.role}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    role: value,
                  }))
                }
              >
                <div className="relative">
                  <ListboxButton className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-left text-sm font-medium text-slate-900 outline-none transition hover:border-slate-300 focus:border-teal-500 focus:bg-white focus:ring-4 focus:ring-teal-500/10">
                    <span className="capitalize">{formData.role}</span>

                    <FiChevronDown className="text-slate-400" size={18} />
                  </ListboxButton>

                  <ListboxOptions
                    anchor="bottom"
                    className="z-50 mt-2 w-(--button-width) rounded-xl border border-slate-200 bg-white p-1 shadow-xl outline-none"
                  >
                    <ListboxOption
                      value="student"
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 data-focus:bg-teal-50 data-focus:text-teal-700"
                    >
                      <span>Student</span>

                      <FiCheck
                        size={17}
                        className="invisible text-teal-600 group-data-selected:visible"
                      />
                    </ListboxOption>

                    <ListboxOption
                      value="teacher"
                      className="group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-slate-700 data-focus:bg-teal-50 data-focus:text-teal-700"
                    >
                      <span>Teacher</span>

                      <FiCheck
                        size={17}
                        className="invisible text-teal-600 group-data-selected:visible"
                      />
                    </ListboxOption>
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>

            {/* Password */}
            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                setFormData={setFormData}
                placeholder="Create a password"
                minLength={6}
                style="pl-11"
                icon={FiLock}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2/3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-teal-600"
              >
                {showPassword ? <FiEye size={19} /> : <FiEyeOff size={19} />}
              </button>
            </div>

            {/* Confirm password */}
            <div className="relative">
              <InputField
                label="Confirm password"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                setFormData={setFormData}
                placeholder="Confirm your password"
                style="pl-11"
                icon={FiLock}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-2/3 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-teal-600"
              >
                {showConfirmPassword ? (
                  <FiEye size={19} />
                ) : (
                  <FiEyeOff size={19} />
                )}
              </button>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />

              <p className="text-xs leading-5 text-slate-500">
                I agree to{" "}
                <span className="font-semibold text-teal-600">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-semibold text-teal-600">
                  Privacy Policy
                </span>
              </p>
            </div>

            {/* Register button */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl"
            >
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-teal-600 transition hover:text-emerald-600"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
