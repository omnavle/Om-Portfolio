import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/projects";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <p className="font-mono text-primary mb-4">404</p>
        <h1 className="font-display text-3xl text-heading mb-6">
          Project not found
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:text-hoverGreen"
        >
          <FiArrowLeft /> Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen container-px mx-auto max-w-4xl pt-32 pb-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary mb-10 transition-colors"
      >
        <FiArrowLeft /> Back to home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-mono text-xs text-primary mb-3">{project.number}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-heading mb-3">
          {project.name}
        </h1>
        <p className="text-secondary mb-8">{project.tagline}</p>

        <p className="text-text leading-relaxed mb-10 max-w-2xl">
          {project.description}
        </p>

        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          <div>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-lg bg-card text-sm text-heading border border-border"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-mono text-xs text-muted uppercase tracking-widest mb-3">
              Features
            </h2>
            <ul className="space-y-1.5">
              {project.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-text">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-border text-heading hover:border-primary transition-colors text-sm"
          >
            <FiGithub /> View Code
          </a>
          
        </div>
      </motion.div>
    </div>
  );
}
