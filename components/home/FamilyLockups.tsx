"use client";

import Link from "next/link";
import { FAMILIES, getFamilyMeta } from "@/lib/catalog";
import { track } from "@/lib/analytics";

const GRADIENTS: Record<string, string> = {
  masalas: "linear-gradient(180deg,#fff8d6,#fffcf6)",
  flour: "linear-gradient(180deg,#efe4d4,#fffcf6)",
  coffee: "linear-gradient(180deg,#e8d8cc,#fffcf6)",
  tea: "linear-gradient(180deg,#e4efd8,#fffcf6)",
  oil: "linear-gradient(180deg,#f3efc2,#fffcf6)",
};

export function FamilyLockups() {
  return (
    <div className="families">
      {FAMILIES.map((family, i) => {
        const meta = getFamilyMeta(family);
        if (!meta) return null;
        return (
          <Link
            key={family}
            href={meta.path}
            className="fam"
            style={{ background: GRADIENTS[family] }}
            onClick={() => track("home_family_click", { family })}
          >
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <strong>{meta.name}</strong>
            <span className="one">{meta.oneLiner}</span>
            <span className="shop">Shop →</span>
          </Link>
        );
      })}
    </div>
  );
}
