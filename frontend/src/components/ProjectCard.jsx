import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiBriefcase,
  FiBarChart2,
  FiSearch,
  FiCode,
  FiArrowUpRight,
} from "react-icons/fi";

const ICONS = {
  briefcase: FiBriefcase,
  "bar-chart": FiBarChart2,
  search: FiSearch,
  code: FiCode,
};

const TECH_VISIBLE = 3;

export default function ProjectCard({ project, index }) {
  const Icon = ICONS[project.icon] || FiCode;
  const visibleTech = project.tech.slice(0, TECH_VISIBLE);
  const overflowCount = project.tech.length - TECH_VISIBLE;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col h-full rounded-2xl bg-card border border-border hover:border-primary/40 transition-colors p-6"
    >
      {/* eyebrow row */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-primary">
          <Icon size={14} />
          <span>
            {project.category[0]} <span className="text-border">·</span>{" "}
            {project.category[1]}
          </span>
        </div>
        {/* <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.name} live demo`}
          className="text-muted hover:text-primary transition-colors flex-shrink-0"
        >
          <FiArrowUpRight size={16} />
        </a> */}
      </div>

      {/* title + description */}
      <h3 className="font-display text-lg font-semibold text-heading mb-3 leading-snug">
        {project.name}
      </h3>
      <p className="text-text text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      <div className="mt-auto">
        {/* highlight badges — mint outline */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.features.map((f) => (
            <span
              key={f}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-primary bg-primary/10 border border-primary/25"
            >
              {f}
            </span>
          ))}
        </div>

        {/* tech badges — neutral */}
        <div className="flex flex-wrap gap-2 mb-6">
          {visibleTech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-md text-[11px] font-mono text-muted bg-bg-secondary border border-border"
            >
              {t}
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono text-muted bg-bg-secondary border border-border">
              +{overflowCount}
            </span>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-5 border-t border-border">
          <span className="text-xs text-muted">Personal Project</span>
          <Link
            to={`/projects/${project.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-hoverGreen transition-colors"
          >
            View case study
            <FiArrowUpRight size={13} className="rotate-45 group-hover:rotate-0 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
