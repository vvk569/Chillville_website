"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getClientAuth, isFirebaseClientConfigured } from "@/lib/firebase-client";

export default function AdminLogin() {
  const router = useRouter();
  const configured = isFirebaseClientConfigured();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const auth = getClientAuth();
    if (!auth) {
      setError("Sign-in isn't configured yet.");
      return;
    }
    setBusy(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const idToken = await cred.user.getIdToken();
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      // We only needed the token for the server exchange; drop the client session.
      await signOut(auth).catch(() => {});
      if (res.ok) {
        router.replace("/admin/analytics");
        router.refresh();
        return;
      }
      if (res.status === 403) setError("This account isn't allowed into the dashboard.");
      else if (res.status === 503) setError("Sign-in isn't configured yet.");
      else setError("Couldn't start your session. Please try again.");
    } catch (err) {
      const code = (err as { code?: string })?.code ?? "";
      if (
        code === "auth/invalid-credential" ||
        code === "auth/wrong-password" ||
        code === "auth/user-not-found" ||
        code === "auth/invalid-email"
      ) {
        setError("Incorrect email or password.");
      } else if (code === "auth/too-many-requests") {
        setError("Too many attempts. Please wait a moment and try again.");
      } else {
        setError("Something went wrong signing in.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-[100svh] items-center justify-center px-6 py-20">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <span className="text-[11px] uppercase tracking-luxe text-caramel">Chillville</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-cream">Admin</h1>
          <p className="mt-2 text-sm text-cream/50">Sign in to view site analytics.</p>
        </div>

        {!configured ? (
          <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] px-5 py-6 text-center text-sm text-cream/60">
            Analytics isn&rsquo;t set up yet. Add the Firebase keys on the host, then reload this
            page to sign in.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[11px] uppercase tracking-wide2 text-cream/50">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-cream/15 bg-cream/[0.03] px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-caramel/60"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1.5 block text-[11px] uppercase tracking-wide2 text-cream/50">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-cream/15 bg-cream/[0.03] px-4 py-3 text-cream outline-none transition-colors placeholder:text-cream/30 focus:border-caramel/60"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-coral">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-xl bg-caramel px-4 py-3 font-display text-sm font-semibold text-charcoal transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
