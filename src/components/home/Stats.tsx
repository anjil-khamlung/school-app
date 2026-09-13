import { motion } from "framer-motion";
import type { HomeProps, HomeStatsProps } from "../../type/type";

interface StatsProps{
    stats:HomeStatsProps[]
,}
const Stats = ({ stats }:StatsProps) => {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-2 sm:gap-6 sm:px-6 sm:py-12 lg:grid-cols-4 lg:px-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group h-48 perspective-[1000px] sm:h-52"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                }}
                whileHover={{ rotateY: 180 }}
                className="relative h-full w-full cursor-pointer transform-3d transition-transform duration-700"
              >
                {/* Front */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm backface-hidden sm:p-6">
                  <div
                    className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${stat.bg} ${stat.iconColor} sm:mb-4 sm:h-12 sm:w-12`}
                  >
                    <Icon size={21} />
                  </div>

                  <p className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>

                  <div className="mt-3 h-1 w-8 rounded-full bg-teal-500 sm:mt-4" />
                </div>

                {/* Back */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-linear-to-br from-teal-600 to-emerald-600 p-5 text-center text-white shadow-xl backface-hidden transform-[rotateY(180deg)] sm:p-6">
                  <Icon size={26} />

                  <h3 className="mt-3 text-lg font-bold sm:mt-4 sm:text-xl">
                    {stat.label}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-teal-50 sm:mt-3 sm:text-sm sm:leading-6">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Stats;
