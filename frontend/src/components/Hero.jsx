import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiArrowDown } from "react-icons/fi";
import { profile } from "../data/profile";
import Terminal from "./Terminal";
import TypingRoles from "./TypingRoles";
import MagneticButton from "./MagneticButton";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center pt-10 pb-16"
    >
      <div className="container-px mx-auto max-w-7xl grid lg:grid-cols-2 gap-16 items-center w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-mono text-primary mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {profile.tag}
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display font-semibold text-heading leading-[0.95] text-6xl sm:text-7xl xl:text-8xl tracking-tight mb-6"
          >
            {profile.firstName}
            <br />
            <span className="text-gradient-animated">{profile.lastName}</span>
          </motion.h1>

          <motion.div
            variants={item}
            className="font-mono text-lg sm:text-xl text-heading/90 mb-6 h-8"
          >
            <TypingRoles roles={profile.roles} />
          </motion.div>

          <motion.p
            variants={item}
            className="text-text text-base leading-relaxed max-w-xl mb-10"
          >
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-4 mb-10">
            <MagneticButton
              as="button"
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-full bg-primary text-bg font-medium text-sm hover:bg-hoverGreen hover:shadow-glow"
            >
              View Projects
            </MagneticButton>
            <MagneticButton
              as="a"
              href={profile.resumeUrl}
              download
              className="px-6 py-3 rounded-full glass text-heading font-medium text-sm hover:border-primary border border-border"
            >
              Download Resume
            </MagneticButton>
            <MagneticButton
              as="button"
              onClick={() => scrollTo("contact")}
              className="px-6 py-3 rounded-full text-text font-medium text-sm hover:text-primary underline decoration-border underline-offset-4"
            >
              Contact Me
            </MagneticButton>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-5">
            {[
              { icon: FiGithub, href: profile.socials.github, label: "GitHub" },
              { icon: FiLinkedin, href: profile.socials.linkedin, label: "LinkedIn" },
              { icon: FiMail, href: profile.socials.email, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        <Terminal />
      </div>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about"
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted hover:text-primary transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-[10px] font-mono tracking-widest">SCROLL</span>
        <FiArrowDown size={16} />
      </motion.button>
    </section>
  );
}
