import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";

// Each "command" produces a block of output lines.
const COMMANDS = [
  { cmd: "whoami", lines: profile.terminal.whoami },
  { cmd: "skills", lines: profile.terminal.skills, list: true },
  { cmd: "experience", lines: profile.terminal.experience },
];

const TYPE_SPEED = 38;

export default function Terminal() {
  const [renderedCommands, setRenderedCommands] = useState([]);
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [phase, setPhase] = useState("typing"); // typing -> printing -> done
  const containerRef = useRef(null);

  useEffect(() => {
    if (currentCmdIndex >= COMMANDS.length) return;
    const target = COMMANDS[currentCmdIndex].cmd;

    if (phase === "typing") {
      if (typedCmd.length < target.length) {
        const t = setTimeout(
          () => setTypedCmd(target.slice(0, typedCmd.length + 1)),
          TYPE_SPEED
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("printing"), 300);
      return () => clearTimeout(t);
    }

    if (phase === "printing") {
      const t = setTimeout(() => {
        setRenderedCommands((prev) => [...prev, COMMANDS[currentCmdIndex]]);
        setTypedCmd("");
        setCurrentCmdIndex((i) => i + 1);
        setPhase("typing");
      }, 500);
      return () => clearTimeout(t);
    }
  }, [typedCmd, phase, currentCmdIndex]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [renderedCommands, typedCmd]);

  const finished = currentCmdIndex >= COMMANDS.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto lg:mx-0"
      style={{ perspective: 1000 }}
    >
      <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-3xl" />
      <div className="relative rounded-2xl glass-strong shadow-card overflow-hidden border border-border">
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-bg-secondary/60">
          <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          <span className="ml-auto font-mono text-xs text-muted">
            om@navle: ~ portfolio
          </span>
        </div>

        {/* body */}
        <div
          ref={containerRef}
          className="p-5 font-mono text-[13px] leading-relaxed h-80 overflow-y-auto"
        >
          {renderedCommands.map((block, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-center gap-2 text-primary">
                <span className="text-secondary">$</span>
                <span>{block.cmd}</span>
              </div>
              <div className="mt-1 pl-4 text-text">
                {block.list ? (
                  <div className="flex flex-wrap gap-x-2 gap-y-1">
                    {block.lines.map((line, j) => (
                      <span
                        key={j}
                        className="px-2 py-0.5 rounded-full bg-card border border-border text-[11px] text-heading"
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                ) : (
                  block.lines.map((line, j) => (
                    <div key={j} className={j === 0 ? "text-heading" : ""}>
                      {line}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {!finished && (
            <div className="flex items-center gap-2 text-primary">
              <span className="text-secondary">$</span>
              <span>{typedCmd}</span>
              <span className="inline-block w-[7px] h-[15px] bg-primary animate-blink" />
            </div>
          )}

          {finished && (
            <div className="flex items-center gap-2 text-primary">
              <span className="text-secondary">$</span>
              <span className="inline-block w-[7px] h-[15px] bg-primary animate-blink" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
