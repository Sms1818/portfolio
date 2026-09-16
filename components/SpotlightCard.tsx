"use client";
import { useRef, useState, type PointerEvent, ReactNode } from "react";
import { motion } from "framer-motion";

export default function SpotlightCard({ children, className = "" }: { children: ReactNode, className?: string }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <article
      ref={divRef}
      onPointerMove={handleMouseMove}
      onPointerEnter={() => setOpacity(1)}
      onPointerLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
      style={{ position: 'relative' }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          position: 'absolute',
          inset: 0,
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(100,124,255,0.1), transparent 40%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </article>
  );
}
