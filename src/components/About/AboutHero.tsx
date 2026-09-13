import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";

const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-50 via-white to-emerald-50">
      {/* Decorations */}
      <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 text-center lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm">
            <FiBookOpen size={16} />
            About SchoolManagement
          </span>

          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Making school management
            <span className="block text-teal-600">simpler and smarter.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            SchoolManagement System is a modern platform designed to bring
            students, teachers, and administrators together in one organized and
            easy-to-use environment.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
