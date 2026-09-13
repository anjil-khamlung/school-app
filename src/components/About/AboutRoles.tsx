import { motion } from "framer-motion";
import { FiShield, FiUsers } from "react-icons/fi";

const AboutRoles = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
          One platform
        </p>

        <h2 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Designed for every role
        </h2>

        <p className="mt-4 text-slate-500">
          Different users, different responsibilities, one connected platform.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Administrators",
            description:
              "Manage users, classes, teachers, students, and overall school operations.",
            icon: FiShield,
          },
          {
            title: "Teachers",
            description:
              "Manage classes, students, attendance, and academic activities efficiently.",
            icon: FiUsers,
          },
          {
            title: "Students",
            description:
              "Access classes, monitor attendance, and stay connected with academic activities.",
            icon: FiUsers,
          },
        ].map((role, index) => {
          const Icon = role.icon;

          return (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Icon size={26} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-900">
                {role.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {role.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutRoles;
