import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { achievements } from "../data/achievements";

export default function Achievements() {
  return (
    <section id="achievements" className="section relative bg-bg-secondary/40">
      <div className="container-px mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow mb-4"
        >
          Achievements
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className="font-display text-3xl sm:text-4xl font-semibold text-heading mb-14"
        >
          Recognition along the <span className="text-gradient">way</span>.
        </motion.h2>

        <div className="grid gap-6">
          {achievements.map((a, i) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl glass p-8 border border-border hover:border-primary/40 transition-colors flex gap-6"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                <FiAward size={22} />
              </div>
              <div>
                <p className="font-mono text-xs text-primary mb-2">{a.date}</p>
                <h3 className="font-display text-xl font-semibold text-heading mb-1">
                  {a.title}
                </h3>
                <p className="text-sm text-secondary mb-3">{a.subtitle}</p>
                <p className="text-text text-sm leading-relaxed">{a.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
