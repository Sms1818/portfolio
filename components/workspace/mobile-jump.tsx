"use client";

import { useRouter } from "next/navigation";
import { explorerGroups } from "@/lib/brain";

export function MobileJump({ active }: { active: string }) {
  const router = useRouter();
  const current = active === "/" || active === "" ? "/explore" : `/explore${active.startsWith("/") ? active : `/${active}`}`;

  return (
    <div className="border-b border-line md:hidden">
      <label className="sr-only" htmlFor="workspace-jump">
        Jump to
      </label>
      <select
        id="workspace-jump"
        className="w-full bg-transparent px-4 py-3 text-sm"
        value={current}
        onChange={(event) => router.push(event.target.value)}
      >
        <option value="/explore">Workspace home</option>
        {explorerGroups.map((group) => (
          <optgroup key={group.id} label={group.label}>
            {group.items.map((item) => (
              <option key={item.href} value={item.href}>
                {item.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
