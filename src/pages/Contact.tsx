import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import InputField from "../components/inputs/InputField";
import TextArea from "../components/inputs/TextArea";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.warning("Please fill in all fields.");
      return;
    }

    const existingMessages = JSON.parse(
      localStorage.getItem("contactMessages") || "[]",
    );

    const newMessage = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "contactMessages",
      JSON.stringify([...existingMessages, newMessage]),
    );

    toast.success("Your message has been sent successfully!");

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-7xl text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600">
            Get In Touch
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Have a question, suggestion, or need help with the School Management
            System? We're here to help.
          </p>
        </motion.div>
      </section>

      {/* Main */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -5 }}
            className="rounded-3xl bg-linear-to-br from-teal-600 to-emerald-600 p-6 text-white shadow-lg sm:p-8"
          >
            <h2 className="text-2xl font-bold">Let's talk</h2>

            <p className="mt-3 text-sm leading-6 text-teal-50">
              Whether you need technical support or have feedback about the
              system, feel free to reach out.
            </p>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <FiMail size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Email</p>
                  <p className="mt-1 text-sm text-teal-50">
                    support@schoolmanagement.com
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <FiPhone size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Phone</p>
                  <p className="mt-1 text-sm text-teal-50">+977 9800000000</p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <FiMapPin size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold">Location</p>
                  <p className="mt-1 text-sm text-teal-50">Kathmandu, Nepal</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-2"
          >
            <h2 className="text-2xl font-bold text-slate-900">
              Send us a message
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Fill out the form below and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Name */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <InputField
                    label={"Name"}
                    type={"name"}
                    name={"name"}
                    value={formData.name}
                    placeholder={"Enter your name"}
                    setFormData={setFormData}
                  />
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <InputField
                    label={"Email Address"}
                    type={"email"}
                    name={"email"}
                    value={formData.email}
                    placeholder={"Enter your email"}
                    setFormData={setFormData}
                  />
                </motion.div>

                {/* Subject */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="sm:col-span-2"
                >
                  <InputField
                    label={"Subject"}
                    type={"subject"}
                    name={"subject"}
                    value={formData.subject}
                    placeholder={"What is this about?"}
                    setFormData={setFormData}
                  />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="sm:col-span-2"
                >
                  <TextArea
                    label={"Message"}
                    name={"message"}
                    value={formData.message}
                    setFormData={setFormData}
                    placeholder={"Write your message..."}
                    rows={6}
                  />
                </motion.div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="mt-6 flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-teal-700 active:scale-[0.97]"
              >
                <FiSend size={17} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
