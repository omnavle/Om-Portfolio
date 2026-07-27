import { useEffect, useState } from "react";

export default function TypingRoles({ roles, typeSpeed = 60, pause = 1400 }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex % roles.length];
    let timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typeSpeed
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        typeSpeed / 2
      );
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => i + 1);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex, roles, typeSpeed, pause]);

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient">{text}</span>
      <span className="ml-1 w-[2px] h-[1em] bg-primary animate-blink" />
    </span>
  );
}
