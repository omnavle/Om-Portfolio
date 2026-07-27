import { useEffect, useRef } from "react";

/**
 * Ambient, low-cost background: animated grid, floating blur gradients,
 * a mouse-follow spotlight, and a sparse particle field. Everything is
 * pointer-events-none and sits behind page content.
 */
export default function BackgroundFX() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let raf = null;
    const handleMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(57,230,178,0.06), transparent 40%)`;
        }
        raf = null;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const particles = Array.from({ length: 26 });

  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-noise"
      aria-hidden="true"
    >
      {/* animated grid */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />

      {/* floating blur blobs */}
      <div className="absolute -top-40 -left-32 w-[32rem] h-[32rem] rounded-full bg-primary/[0.06] blur-[130px] animate-blob" />
      <div className="absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full bg-secondary/[0.06] blur-[130px] animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-0 left-1/4 w-[26rem] h-[26rem] rounded-full bg-accent/[0.06] blur-[130px] animate-blob [animation-delay:8s]" />

      {/* particles */}
      {particles.map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-primary/40 animate-float"
          style={{
            width: `${1 + (i % 3)}px`,
            height: `${1 + (i % 3)}px`,
            top: `${(i * 37) % 100}%`,
            left: `${(i * 61) % 100}%`,
            animationDuration: `${6 + (i % 5)}s`,
            animationDelay: `${(i % 6) * 0.6}s`,
            opacity: 0.5,
          }}
        />
      ))}

      {/* mouse spotlight */}
      <div ref={spotlightRef} className="absolute inset-0 transition-opacity" />
    </div>
  );
}
