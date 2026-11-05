"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Clears the server session cookie and returns to the login screen. */
export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/admin/session", { method: "DELETE" });
    } catch {
      /* ignore */
    }
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      disabled={busy}
      className="rounded-lg border border-cream/15 px-3 py-1.5 text-[11px] uppercase tracking-wide2 text-cream/60 transition-colors hover:border-caramel/40 hover:text-caramel disabled:opacity-50"
    >
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
