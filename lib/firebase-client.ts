import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

/**
 * Browser-side Firebase, used only for the admin sign-in form. The config is
 * public by design (Firebase client keys are not secrets — access is governed
 * by Auth + Firestore security rules), and is read from NEXT_PUBLIC_* env so it
 * can be inlined into the client bundle at build time.
 *
 * Returns null when not configured, so the login page can show a clear
 * "analytics isn't set up yet" message instead of crashing.
 */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function isFirebaseClientConfigured(): boolean {
  return Boolean(config.apiKey && config.authDomain && config.projectId);
}

let cachedAuth: Auth | null | undefined;

export function getClientAuth(): Auth | null {
  if (cachedAuth !== undefined) return cachedAuth;
  if (!isFirebaseClientConfigured()) {
    cachedAuth = null;
    return cachedAuth;
  }
  const app: FirebaseApp = getApps()[0] ?? initializeApp(config);
  cachedAuth = getAuth(app);
  return cachedAuth;
}
