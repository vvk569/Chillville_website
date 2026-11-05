import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";
import { getAuth, type Auth } from "firebase-admin/auth";

/**
 * Lazily initialise the Firebase Admin SDK from a service-account credential.
 *
 * The key is read from an environment variable (set as a protected secret on
 * the host — never committed): `FIREBASE_SERVICE_ACCOUNT` (raw JSON) or
 * `FIREBASE_SERVICE_ACCOUNT_B64` (base64 of the JSON).
 *
 * When no credential is configured these return `null`, and callers fall back
 * gracefully (static menu, un-tracked analytics, no admin session) — so the
 * site behaves exactly as before until the key is added on the host.
 *
 * These modules (and the firebase-admin dependency) must only be imported from
 * Server Components / route handlers — never from a client component.
 */
let cachedApp: App | null | undefined;
let cachedDb: Firestore | null | undefined;
let cachedAuth: Auth | null | undefined;

function loadServiceAccount(): Record<string, unknown> | null {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  try {
    if (raw && raw.trim()) return JSON.parse(raw);
    if (b64 && b64.trim()) return JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  } catch (e) {
    console.error("FIREBASE_SERVICE_ACCOUNT is set but could not be parsed:", e);
  }
  return null;
}

/** The shared Admin app, or null when no service-account credential is set. */
export function getAdminApp(): App | null {
  if (cachedApp !== undefined) return cachedApp;
  const svc = loadServiceAccount();
  if (!svc) {
    cachedApp = null;
    return cachedApp;
  }
  cachedApp =
    getApps()[0] ?? initializeApp({ credential: cert(svc as Parameters<typeof cert>[0]) });
  return cachedApp;
}

export function getDb(): Firestore | null {
  if (cachedDb !== undefined) return cachedDb;
  const app = getAdminApp();
  cachedDb = app ? getFirestore(app) : null;
  return cachedDb;
}

export function getAdminAuth(): Auth | null {
  if (cachedAuth !== undefined) return cachedAuth;
  const app = getAdminApp();
  cachedAuth = app ? getAuth(app) : null;
  return cachedAuth;
}
