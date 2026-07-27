import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border">
      <div className="container-px mx-auto max-w-7xl py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-display text-lg font-semibold text-heading">
            {profile.name}
          </p>
          <p className="text-sm text-muted">
            {profile.roles[0]} · {profile.roles[1]}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="text-muted hover:text-primary transition-colors" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href={profile.socials.email} className="text-muted hover:text-primary transition-colors" aria-label="Email">
            <FiMail size={18} />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="text-sm text-muted hover:text-primary transition-colors border-l border-border pl-5"
          >
            Resume
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5">
        <p className="text-center text-xs text-muted">
          © {year} {profile.name}. Built with React, Tailwind CSS & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
