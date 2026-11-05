/**
 * Pageview intake for the admin analytics dashboard.
 *
 * Receives an anonymous beacon from the site (see components/analytics/Tracker)
 * and appends one document to the analytics collection in Firestore. Stores
 * only a sanitised path, an anonymous session id, the referrer host, and a
 * store-local day/hour — no cookies, no IP, no personal data.
 *
 * When Firebase isn't configured the route quietly accepts and drops the
 * beacon (204), so the public site works unchanged until a key is added.
 */

import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { getDb } from "@/lib/firebase-admin";
import { ANALYTICS_COLLECTION, storeDayAndHour } from "@/lib/analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ok = () => new NextResponse(null, { status: 204 });

function cleanPath(input: unknown): string | null {
  if (typeof input !== "string") return null;
  // Path only — strip query/hash, cap length, must start with "/".
  const path = input.split(/[?#]/)[0].trim().slice(0, 200);
  if (!path.startsWith("/")) return null;
  // Never record the admin area or API routes.
  if (path.startsWith("/admin") || path.startsWith("/api")) return null;
  return path;
}

export async function POST(req: Request) {
  let body: { path?: unknown; sid?: unknown; ref?: unknown };
  try {
    body = await req.json();
  } catch {
    return ok();
  }

  const path = cleanPath(body.path);
  if (!path) return ok();

  const sid =
    typeof body.sid === "string" && body.sid.trim()
      ? body.sid.trim().slice(0, 64)
      : "anon";
  const ref =
    typeof body.ref === "string" && body.ref.trim() ? body.ref.trim().slice(0, 120) : null;

  const db = getDb();
  if (!db) return ok(); // analytics not configured — accept and drop

  const { day, hour } = storeDayAndHour(new Date());

  try {
    await db.collection(ANALYTICS_COLLECTION).add({
      path,
      sid,
      ref,
      day,
      hour,
      ts: FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.error("pageview write failed:", e);
    // Still 204 — never surface analytics errors to the visitor.
  }
  return ok();
}
