"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Privacy-friendly pageview tracker. On every route change it sends a tiny
 * beacon to /api/track with the current path and an anonymous per-tab session
 * id (sessionStorage — cleared when the tab closes, never a cookie, never tied
 * to a person). The server writes it to Firestore only when Firebase is
 * configured; otherwise the beacon is a harmless no-op.
 *
 * Admin pages are never tracked. Failures are swallowed — analytics must never
 * affect the visitor's experience.
 */
function sessionId(): string {
  try {
    const KEY = "cv_sid";
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    // Private mode / storage blocked — fall back to an ephemeral id.
    return "anon";
  }
}

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) return;

    let refHost: string | null = null;
    try {
      if (document.referrer) {
        const u = new URL(document.referrer);
        if (u.host !== window.location.host) refHost = u.host;
      }
    } catch {
      /* ignore */
    }

    const payload = JSON.stringify({ path: pathname, sid: sessionId(), ref: refHost });

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([payload], { type: "application/json" }));
      } else {
        fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      /* analytics must never throw into the UI */
    }
  }, [pathname]);

  return null;
}
