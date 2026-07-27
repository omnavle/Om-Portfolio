import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { education } from "../data/education";

const currentEducation = education[0];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="section relative">
      <div className="container-px mx-auto max-w-7xl">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          About
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-12">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-heading mb-6 leading-tight">
              Building at the intersection of{" "}
              <span className="text-gradient">software and intelligence</span>.
            </h2>
            <p className="text-text leading-relaxed mb-6">
              {profile.summary}
            </p>
            <p className="text-text leading-relaxed">
              Currently pursuing a {education.degree} in{" "}
              {education.branch} at {education.college}, expected to
              graduate in {education.graduation}. Outside of coursework, I
              spend my time shipping agentic AI products end-to-end — from
              retrieval pipelines to production-ready interfaces.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {profile.highlights.map((h, i) => (
                <motion.span
                  key={h}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ y: -3, borderColor: "#34D399" }}
                  className="px-4 py-2 rounded-full glass text-sm text-heading border border-border"
                >
                  {h}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl glass p-8 h-full">
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-primary/10 blur-2xl" />
              <p className="font-mono text-xs text-muted mb-6">timeline.json</p>
              <ol className="space-y-6 border-l border-border pl-6">
                {[
                  {
                    year: "2023",
                    title: "Software Developer Intern",
                    desc: "Cyber Sakshar Nashik — shipped 3 client projects.",
                  },
                  {
                    year: "2024",
                    title: "Full Stack Development",
                    desc: "MERN",
                  },
                  {
                    year: "2025–26",
                    title: "Generative AI Focus",
                    desc: "RAG systems, agentic workflows, LangGraph.",
                  },
                  {
                    year: "2027",
                    title: "Expected Graduation",
                    desc: `B.E. in ${education.branch}.`,
                  },
                ].map((t, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-primary shadow-glow-sm" />
                    <p className="font-mono text-xs text-primary mb-1">{t.year}</p>
                    <p className="text-heading font-medium">{t.title}</p>
                    <p className="text-sm text-muted">{t.desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
