import { motion } from "framer-motion";
import type { HomeProps } from "../../type/type";

interface FeaturesProp{
    features:HomeProps[]
}

const Features = ({ features }:FeaturesProp) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-2xl text-center"
      >
        <span className="inline-flex rounded-full bg-teal-50 px-3 py-2 text-xs font-bold uppercase tracking-widest text-teal-600 sm:px-4 sm:text-sm">
          Everything you need
        </span>

        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:mt-5 sm:text-4xl lg:text-5xl">
          Manage your school
          <span className="block text-teal-600">with ease</span>
        </h2>

        <p className="mt-4 text-sm leading-6 text-slate-500 sm:mt-5 sm:text-lg sm:leading-7">
          One powerful platform designed to make everyday school management
          simpler, faster, and more organized.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-2xl sm:rounded-3xl sm:p-8"
            >
              <div
                className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-linear-to-br ${feature.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-20`}
              />

              <div
                className={`absolute left-0 top-0 h-1 w-0 bg-linear-to-r ${feature.gradient} transition-all duration-500 group-hover:w-full`}
              />

              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.1,
                }}
                className={`relative flex h-14 w-14 items-center justify-center rounded-2xl ${feature.bg} ${feature.iconColor} transition-all duration-300 group-hover:shadow-lg sm:h-16 sm:w-16`}
              >
                <Icon size={26} />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-current opacity-30" />
              </motion.div>

              <div className="relative mt-6 sm:mt-7">
                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base sm:leading-7">
                  {feature.description}
                </p>
              </div>

             
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Features;
