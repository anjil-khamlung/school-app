import { motion } from "framer-motion";
import type { HomeProps,  } from "../../type/type";

interface rolesProps{
    roles:HomeProps[],
}

const Roles = ({ roles }:rolesProps) => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl sm:h-96 sm:w-96" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <span className="inline-flex rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-2 text-xs font-bold uppercase tracking-widest text-teal-400 sm:px-4">
            Built for everyone
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            One platform.
            <span className="block text-teal-400">
              Three powerful experiences.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400 sm:mt-5 sm:text-lg sm:leading-7">
            SchoolManagementSystem gives every member of your school the tools
            they need to stay organized, productive, and connected.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => {
            const Icon = role.icon;

            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl transition-shadow duration-300 hover:border-slate-700 hover:shadow-2xl sm:rounded-3xl sm:p-7"
              >
                <div
                  className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-linear-to-br ${role.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
                />

                <motion.div
                  whileHover={{
                    rotate: 8,
                    scale: 1.1,
                  }}
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${role.gradient} text-white shadow-lg`}
                >
                  <Icon size={25} />
                </motion.div>

                <div className="relative mt-6 sm:mt-7">
                  <h3 className="text-xl font-bold text-white sm:text-2xl">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-400 sm:min-h-20 sm:leading-7">
                    {role.description}
                  </p>
                </div>

             
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Roles;
