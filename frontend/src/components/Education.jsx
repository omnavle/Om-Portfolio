import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { education } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="section relative">
      <div className="container-px mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Education
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-heading mb-14"
        >
          Academic <span className="text-gradient">background</span>.
        </motion.h2>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl glass p-8 sm:p-10 border border-border hover:border-primary/40 transition-colors grid sm:grid-cols-[auto_1fr_auto] gap-8 items-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <FiBookOpen size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-heading mb-1">
                  {edu.degree}
                </h3>
                <p className="text-primary text-sm mb-2">{edu.branch}</p>
                <p className="text-muted text-sm">{edu.college}</p>
              </div>
              <div className="flex sm:flex-col gap-6 sm:gap-2 sm:text-right">
                <div>
                  <p className="text-xs text-muted">{edu.duration}</p>
                  <p className="text-heading font-medium">{edu.graduation}</p>
                </div>
                <div>
                  <p className="text-xs text-muted">{edu.scoreLabel}</p>
                  <p className="text-heading font-medium">{edu.score}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}