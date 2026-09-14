import { useState } from "react";
import { FiBookOpen, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import InputField from "../../components/inputs/InputField";
import { useSchoolStore } from "../../store/useSchoolStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { users, login } = useSchoolStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const foundUser = users.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );

    if (!foundUser) {
      toast.error("Invalid credentials");
      return;
    }
    toast.success("login successfull");
    login(foundUser);

    navigate(
      foundUser.role === "admin"
        ? "/admin"
        : foundUser.role === "teacher"
          ? "/teacher"
          : "/student",
    );
  };
  return (
    <div className="relative flex h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-[#071c1a] px-4">
      {/* Background decorations */}
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />

      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      {/* Main card */}
      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* Left section */}
        <div className="relative hidden overflow-hidden bg-linear-to-br from-teal-700 via-teal-600 to-emerald-600 p-10 text-white md:flex md:flex-col md:justify-between">
          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border-40 border-white/10" />

          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full border-50 border-white/10" />

          <div className="relative z-10">
            {/* Logo */}
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur">
              <FiBookOpen size={28} />
            </div>

            <h1 className="text-4xl font-bold leading-tight">
              Welcome to
              <br />
              School
              <br />
              Management
              <br />
              System
            </h1>

            <p className="mt-5 max-w-md leading-7 text-teal-50">
              A simple and powerful platform to manage students, teachers,
              classes, attendance and academic performance.
            </p>
          </div>

          {/* Bottom card */}
          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-400 text-white">
                <FiBookOpen size={19} />
              </div>

              <div>
                <p className="font-semibold">Everything in one place</p>

                <p className="text-sm text-teal-100">Learn. Manage. Grow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="p-7 sm:p-10 lg:p-12">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 md:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-teal-600 to-emerald-600 text-white">
              <FiBookOpen size={22} />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold text-teal-600">
              SCHOOL MANAGEMENT SYSTEM
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to continue to your account
            </p>
          </div>

          {/* Form UI */}
          <form onSubmit={handleSubmit} className="space-y-5 ">
            {/* Email */}
            <InputField
              label="Email address"
              type="email"
              placeholder="you@gmail.com"
              value={formData.email}
              setFormData={setFormData}
              name="email"
              style="pl-11"
              icon={FiMail}
            />

            {/* Password */}
            <div className="mb-2 flex items-center justify-end">
              <button
                type="button"
                className="cursor-pointer text-xs font-semibold text-teal-600 hover:text-teal-700"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                setFormData={setFormData}
                name="password"
                style="pl-11"
                icon={FiLock}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2/3 -translate-y-1/2 text-slate-400 transaction hover:text-teal-600 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
              </button>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />

              <label htmlFor="remember" className="text-sm text-slate-500">
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-medium text-slate-400">
              NEW HERE?
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Register */}
          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <span className="cursor-pointer font-bold text-teal-600 transition hover:text-emerald-600">
              Create an account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
