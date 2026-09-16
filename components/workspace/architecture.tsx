import type { ArchitectureNode } from "@/lib/brain/types";

export function ArchitectureFlow({ nodes }: { nodes: ArchitectureNode[] }) {
  return (
    <ol className="grid gap-2 sm:grid-cols-2">
      {nodes.map((node, index) => (
        <li key={node.id} className="rounded-2xl border border-line bg-bg-elevated p-4">
          <div className="mono text-[10px] uppercase tracking-[0.16em] text-faint">
            {String(index + 1).padStart(2, "0")} · {node.kind}
          </div>
          <div className="mt-2 text-sm">{node.label}</div>
          <p className="mt-1 text-xs leading-5 text-muted">{node.detail}</p>
        </li>
      ))}
    </ol>
  );
}
