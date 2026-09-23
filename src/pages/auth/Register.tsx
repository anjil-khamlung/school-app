import { Link, NavLink, useNavigate } from "react-router-dom";
import InputField from "../../components/inputs/InputField";
import {
  FiBookOpen,
  FiUser,
  FiMail,
  FiLock,


} from "react-icons/fi";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUsers } from "../../store/useUsers";
import SelectField from "../../components/inputs/SelectField";
import type { RegisterForm, RegisterFormErrors } from "../../type/registerType";
import { validateRegister } from "../../lib/utils/validateRegister";
import { supabase } from "../../lib/supabase";

const Register = () => {
  const navigate = useNavigate();
  const { users, getUsers } = useUsers()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const roles = ["student", "teacher",];
  //Fetching users
  useEffect(() => {
    getUsers()
  },[getUsers])

 const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
   e.preventDefault();

   // Validation
   const validationErrors = validateRegister(formData);
   setErrors(validationErrors);

   if (Object.keys(validationErrors).length > 0) {
     return;
   }
   const existingUser = users.find((user) => user.email === formData.email);

   if (existingUser) {
     toast.warning("User already exists");
     return;
   }

   setLoading(true);

   try {
     // 1. Create authentication user
     const { data, error } = await supabase.auth.signUp({
       email: formData.email,
       password: formData.password,
     });
     
     if (error) {
       toast.error(error.message);
       return;
     }

     // 2. Make sure Supabase returned a user
     if (!data.user) {
       toast.error("Registration failed");
       return;
     }

     // 3. Insert profile/application data
     const { error: profileError } = await supabase.from("users").insert({
       id: data.user.id,
       name: formData.name,
       email: formData.email,
       role: formData.role,
     });

     if (profileError) {
       toast.error(profileError.message);
       return;
     }

     toast.success("Registration successful");
     navigate("/login");
   } finally {
     setLoading(false);
   }
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

            <span className="text-xl font-bold text-slate-900">
              School<span className="text-teal-600">Management</span>
              <span className="text-orange-400">System</span>
            </span>
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
              error={errors.name}
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
              error={errors.email}
            />

            {/* Role */}
            <SelectField
              label="Account type"
              value={formData.role}
              options={roles}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  role: value as "student" | "teacher",
                }))
              }
            />

            {/* Password */}
            <div className="relative">
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                setFormData={setFormData}
                placeholder="Create a password"
                style="pl-11"
                icon={FiLock}
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showPasswordToggle
              />

          
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
                error={errors.confirmPassword}
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                showPasswordToggle
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                required
                className=" mt-0.5 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
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
              disabled={loading}
              className="flex justify-center w-full cursor-pointer rounded-xl bg-linear-to-r from-teal-600 to-emerald-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition duration-200 hover:-translate-y-0.5 hover:from-teal-700 hover:to-emerald-700 hover:shadow-xl"
            >
              {loading && (
                <span className="loading loading-spinner text-success "></span>
              )}
              Create Account
            </button>
          </form>

          {/* Login */}
          <p className="mt-3 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-bold text-teal-600 transition hover:text-emerald-400"
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
