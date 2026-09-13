import { motion } from "framer-motion";
import { FiTarget } from "react-icons/fi";

const AboutMission = () => {
  return (
    <section className="bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-bold uppercase tracking-widest text-teal-400">
              Our Mission
            </span>

            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Technology that helps schools work better.
            </h2>

            <p className="mt-5 leading-7 text-slate-400">
              Our goal is to simplify school administration by replacing
              scattered processes with a single, intuitive digital platform.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="rounded-3xl border border-slate-800 bg-slate-900 p-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
              <FiTarget size={24} />
            </div>

            <h3 className="mt-6 text-2xl font-bold text-white">Our Vision</h3>

            <p className="mt-3 leading-7 text-slate-400">
              To create a connected learning environment where managing academic
              information is simple, accessible, and efficient for everyone.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMission;
