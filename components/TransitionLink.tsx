"use client";

import { MouseEvent, ReactNode, CSSProperties } from "react";
import { useRouter } from "next/navigation";

type Props = { href: string; children: ReactNode; className?: string; style?: CSSProperties; onBeforeNavigate?: () => void };

export default function TransitionLink({ href, children, className, style, onBeforeNavigate }: Props) {
  const router = useRouter();

  function navigate(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onBeforeNavigate?.();
    const go = () => router.push(href);
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    if (doc.startViewTransition) doc.startViewTransition(go);
    else go();
  }

  return <a href={href} onClick={navigate} className={className} style={style}>{children}</a>;
}
