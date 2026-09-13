import { motion } from "framer-motion";
import { FiArrowRight, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface CtaProps {
  isAuthenticated: boolean;
  dashboardPath: string;
}

const Cta = ({ isAuthenticated, dashboardPath }: CtaProps) => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-teal-600 via-teal-600 to-emerald-600">
      <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />

      <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm sm:px-4 sm:text-sm"
        >
          <FiCheckCircle size={16} />
          Simple. Smart. Organized.
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Ready to manage your
          <span className="block text-teal-100">school smarter?</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-teal-50 sm:mt-5 sm:text-lg sm:leading-7"
        >
          Bring students, teachers, classes, assignments, and academic
          information together in one simple platform.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row"
        >
          {!isAuthenticated ? (
            <>
              {/* Create Account */}
              <button
                onClick={() => navigate("/register")}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-teal-700 shadow-xl transition-all duration-200 hover:scale-105 hover:bg-teal-50 active:scale-[0.97] sm:w-auto"
              >
                Create Your Account
                <FiArrowRight size={18} />
              </button>

              {/* Sign In */}
              <button
                onClick={() => navigate("/login")}
                className="w-full cursor-pointer rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white/20 active:scale-[0.97] sm:w-auto"
              >
                Sign In
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate(dashboardPath)}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-teal-700 shadow-xl transition-all duration-200 hover:scale-105 hover:bg-teal-50 active:scale-[0.97] sm:w-auto"
            >
              <FiBookOpen size={18} />
              Go to Dashboard
              <FiArrowRight size={18} />
            </button>
          )}
        </motion.div>

        {/* Bottom text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 text-xs text-teal-100 sm:mt-7 sm:text-sm"
        >
          Designed for administrators, teachers, and students.
        </motion.p>
      </div>
    </section>
  );
};

export default Cta;
