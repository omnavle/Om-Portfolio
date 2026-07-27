import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiMenu, FiX } from "react-icons/fi";
import { profile } from "../data/profile";
import useActiveSection from "../hooks/useActiveSection";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(NAV_ITEMS.map((n) => n.id));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 inset-x-0 z-50">
      <div className="bg-bg/10 backdrop-blur-sm border-b border-border/20">
        <nav className="container-px mx-auto max-w-7xl flex items-center justify-between h-14 md:h-16">
          <button
            onClick={() => scrollTo("home")}
            className="font-display font-semibold text-heading text-base tracking-tight"
          >
            Om<span className="text-primary">.</span>Navle
          </button>

          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3.5 py-1.5 text-sm rounded-full transition-colors ${
                    active === item.id
                      ? "text-heading"
                      : "text-muted hover:text-heading"
                  }`}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-card border border-border"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href={profile.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="text-muted hover:text-primary transition-colors"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="text-muted hover:text-primary transition-colors"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={profile.socials.email}
              aria-label="Email"
              className="text-muted hover:text-primary transition-colors"
            >
              <FiMail size={18} />
            </a>
          </div>

          <button
            className="lg:hidden text-heading"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-strong border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col p-6 gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-base ${
                      active === item.id
                        ? "text-primary bg-card"
                        : "text-text hover:text-heading"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-5 px-6 pb-6">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-primary">
                <FiGithub size={20} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-primary">
                <FiLinkedin size={20} />
              </a>
              <a href={profile.socials.email} className="text-muted hover:text-primary">
                <FiMail size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
