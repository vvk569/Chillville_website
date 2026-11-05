/**
 * Admin session exchange.
 *
 *  POST   { idToken }  → verify the Firebase ID token, check the email against
 *                        the allow-list, mint a Firebase session cookie and set
 *                        it httpOnly. Returns 200 on success.
 *  DELETE              → clear the session cookie (sign out).
 *
 * The session cookie is what every /admin page verifies server-side
 * (lib/admin-auth.ts). Returns 503 when Firebase isn't configured yet.
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminAuth } from "@/lib/firebase-admin";
import { ADMIN_SESSION_COOKIE, isEmailAllowed } from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Session cookie lifetime (Firebase allows up to 14 days).
const EXPIRES_MS = 14 * 24 * 60 * 60 * 1000;

export async function POST(req: Request) {
  const auth = getAdminAuth();
  if (!auth) {
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  let idToken: unknown;
  try {
    idToken = (await req.json())?.idToken;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }
  if (typeof idToken !== "string" || !idToken) {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  try {
    const decoded = await auth.verifyIdToken(idToken, true);
    if (!isEmailAllowed(decoded.email)) {
      return NextResponse.json({ ok: false, error: "forbidden" }, { status: 403 });
    }
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: EXPIRES_MS });
    (await cookies()).set(ADMIN_SESSION_COOKIE, sessionCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: Math.floor(EXPIRES_MS / 1000),
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("admin session mint failed:", e);
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }
}

export async function DELETE() {
  (await cookies()).delete(ADMIN_SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
