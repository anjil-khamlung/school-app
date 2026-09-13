import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiShield,
  FiTarget,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Abouts = () => {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
            Our platform
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything organized in one place
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            Managing a school involves handling students, teachers, classes,
            attendance, and academic information every day. Our platform brings
            these essential activities together so they can be managed from a
            single, centralized system.
          </p>

          <p className="mt-4 leading-7 text-slate-600">
            Whether you are an administrator managing the school, a teacher
            managing your classes, or a student tracking your academic
            activities, the system provides tools designed for your role.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-7 flex cursor-pointer items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all duration-200 hover:scale-105  hover:bg-teal-700"
          >
            Explore the platform
            <FiArrowRight size={18} />
          </button>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <FiUsers size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Connected Community
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Connect administrators, teachers, and students through one
              platform.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <FiCheckCircle size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Simple Management
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Manage everyday school activities through a clean and simple
              interface.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
              <FiTarget size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Built with Purpose
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Focused on making academic management more organized and
              efficient.
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-500">
              <FiShield size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Role-Based Access
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Each user gets access to tools and information relevant to their
              role.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Abouts;
