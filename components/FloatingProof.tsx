"use client";
import { type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Server, Brain, GitMerge } from "lucide-react";

export default function FloatingProof() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  // Smooth out the pointer motion
  const smoothX = useSpring(mx, { damping: 40, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(my, { damping: 40, stiffness: 200, mass: 0.5 });

  // Transforms for parallax
  const x1 = useTransform(smoothX, [-0.5, 0.5], [-25, 25]);
  const y1 = useTransform(smoothY, [-0.5, 0.5], [-25, 25]);
  const r1 = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);

  const x2 = useTransform(smoothX, [-0.5, 0.5], [35, -35]);
  const y2 = useTransform(smoothY, [-0.5, 0.5], [35, -35]);
  const r2 = useTransform(smoothX, [-0.5, 0.5], [6, -6]);

  const x3 = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const y3 = useTransform(smoothY, [-0.5, 0.5], [20, -20]);
  const r3 = useTransform(smoothX, [-0.5, 0.5], [4, -4]);

  const orbX = useTransform(smoothX, [-0.5, 0.5], [40, -40]);
  const orbY = useTransform(smoothY, [-0.5, 0.5], [40, -40]);

  function move(e: PointerEvent<HTMLDivElement>) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(x);
    my.set(y);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="proofScene" onPointerMove={move} onPointerLeave={reset} aria-hidden="true" style={{ perspective: 1200 }}>
      <motion.div className="orb orbOne" style={{ x: orbX, y: orbY }} />
      <motion.div className="orb orbTwo" style={{ x: orbX, y: orbY }} />
      
      <motion.div className="proofCard p1" style={{ x: x1, y: y1, rotateY: r1, rotateX: r2 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Server size={14}/> 01</span>
        <b>Backend systems</b><small>Java · Spring Boot</small>
      </motion.div>
      
      <motion.div className="proofCard p2" style={{ x: x2, y: y2, rotateY: r2, rotateX: r1 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Brain size={14}/> 02</span>
        <b>Applied AI</b><small>Models + deterministic systems</small>
      </motion.div>
      
      <motion.div className="proofCard p3" style={{ x: x3, y: y3, rotateY: r3, rotateX: r2 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><GitMerge size={14}/> 03</span>
        <b>Open source</b><small>2 merged Caspian PRs</small>
      </motion.div>
      
      <div className="wire w1" /><div className="wire w2" /><div className="wire w3" />
    </div>
  );
}

