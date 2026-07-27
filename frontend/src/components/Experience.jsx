import { motion } from "framer-motion";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section relative">
      <div className="container-px mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-heading mb-14"
        >
          Where I've <span className="text-gradient">shipped code</span>.
        </motion.h2>

        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative rounded-2xl glass p-8 grid md:grid-cols-[1fr_2fr] gap-8 border border-border hover:border-primary/40 transition-colors"
            >
              <div>
                <p className="font-mono text-xs text-primary mb-2">{exp.date}</p>
                <h3 className="font-display text-xl font-semibold text-heading">
                  {exp.role}
                </h3>
                <p className="text-muted mt-1">{exp.company}</p>
              </div>
              <ul className="space-y-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex items-start gap-3 text-text text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
