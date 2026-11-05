import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminAuth } from "./firebase-admin";

/**
 * Admin access control for the /admin area.
 *
 * Sign-in happens client-side via Firebase Auth; the ID token is exchanged for
 * a Firebase *session cookie* (set httpOnly by /api/admin/session). Every admin
 * page then verifies that cookie server-side and checks the signed-in email
 * against an allow-list, so only the owner can see the dashboard.
 */

export const ADMIN_SESSION_COOKIE = "cv_admin_session";

/** Lower-cased set of emails allowed into /admin. */
export function adminEmails(): Set<string> {
  const raw = process.env.ADMIN_EMAILS || "vijay.vemuri.89@gmail.com";
  return new Set(
    raw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isEmailAllowed(email: string | null | undefined): boolean {
  return Boolean(email && adminEmails().has(email.toLowerCase()));
}

/** True when the server can verify sessions (service-account credential set). */
export function isAdminConfigured(): boolean {
  return getAdminAuth() !== null;
}

/**
 * The verified admin email for the current request, or null when not signed in
 * (no cookie, invalid/expired/revoked cookie, or email not on the allow-list).
 */
export async function getAdminEmail(): Promise<string | null> {
  const auth = getAdminAuth();
  if (!auth) return null;
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    // checkRevoked: true so sign-out / disabled accounts are rejected promptly.
    const decoded = await auth.verifySessionCookie(token, true);
    return isEmailAllowed(decoded.email) ? (decoded.email as string) : null;
  } catch {
    return null;
  }
}

/** Use at the top of an admin page: redirect to the login page unless signed in. */
export async function requireAdmin(): Promise<string> {
  const email = await getAdminEmail();
  if (!email) redirect("/admin/login");
  return email;
}
