import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AboutCta = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-linear-to-br from-teal-600 to-emerald-600">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Ready to simplify school management?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-teal-50">
          Bring your school's students, teachers, classes, and academic
          information together in one modern platform.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-teal-700 shadow-xl transition-all duration-200 hover:scale-105  hover:bg-teal-50"
        >
          Get Started
          <FiArrowRight size={18} />
        </button>
      </div>
    </section>
  );
};

export default AboutCta;
