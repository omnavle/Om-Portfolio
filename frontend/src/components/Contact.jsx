import { useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiAlertCircle, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/profile";
import { sendContactMessage } from "../utils/api";
import MagneticButton from "./MagneticButton";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err?.response?.data?.message ||
          "Something went wrong. Please try again in a moment."
      );
    }
  };

  return (
    <section id="contact" className="section relative">
      <div className="container-px mx-auto max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4 text-center"
        >
          Contact
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-heading mb-4 text-center"
        >
          Let's build something <span className="text-gradient">worth shipping</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center text-muted mb-14 max-w-lg mx-auto"
        >
          Open to internships, freelance AI/full-stack work, and interesting
          collaborations. Drop a message and I'll get back to you.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="relative rounded-2xl glass-strong p-8 sm:p-10 border border-border"
        >
          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-xs text-muted mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-heading placeholder:text-muted focus:border-primary outline-none transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-muted mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-card border border-border rounded-xl px-4 py-3 text-heading placeholder:text-muted focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="subject" className="block text-xs text-muted mb-2">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              placeholder="What's this about?"
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-heading placeholder:text-muted focus:border-primary outline-none transition-colors"
            />
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-xs text-muted mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about the project or opportunity..."
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-heading placeholder:text-muted focus:border-primary outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <MagneticButton
              as="button"
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-bg font-medium text-sm hover:bg-hoverGreen hover:shadow-glow disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
              <FiSend size={15} />
            </MagneticButton>

            <div className="flex items-center gap-4">
              {[
                { icon: FiGithub, href: profile.socials.github },
                { icon: FiLinkedin, href: profile.socials.linkedin },
                { icon: FiMail, href: profile.socials.email },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-2 text-sm text-primary"
            >
              <FiCheckCircle /> Message sent — thanks for reaching out, I'll reply soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-2 text-sm text-red-400"
            >
              <FiAlertCircle /> {errorMsg}
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
