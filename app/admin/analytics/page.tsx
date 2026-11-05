import Link from "next/link";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { requireAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/firebase-admin";
import {
  ANALYTICS_COLLECTION,
  daysInRange,
  labelForPath,
  menuSlugForPath,
  resolveRange,
  STORE_TZ,
} from "@/lib/analytics";

// Always render fresh — analytics reflect live data, never a cached snapshot.
export const dynamic = "force-dynamic";

type Search = { from?: string; to?: string };

type Row = { path: string; sid: string; day: string; hour: number };

const MAX_ROWS = 50000;

async function loadRows(from: string, to: string): Promise<Row[]> {
  const db = getDb();
  if (!db) return [];
  const snap = await db
    .collection(ANALYTICS_COLLECTION)
    .where("day", ">=", from)
    .where("day", "<=", to)
    .limit(MAX_ROWS)
    .get();
  return snap.docs.map((d) => {
    const x = d.data() as Partial<Row>;
    return {
      path: typeof x.path === "string" ? x.path : "/",
      sid: typeof x.sid === "string" ? x.sid : "anon",
      day: typeof x.day === "string" ? x.day : from,
      hour: typeof x.hour === "number" ? x.hour : 0,
    };
  });
}

function hourLabel(h: number): string {
  const am = h < 12;
  const base = h % 12 === 0 ? 12 : h % 12;
  return `${base} ${am ? "AM" : "PM"}`;
}

function prettyDay(ymd: string): string {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const email = await requireAdmin();
  const sp = await searchParams;
  const { from, to } = resolveRange(sp.from, sp.to);

  const rows = await loadRows(from, to);

  // --- Aggregate -----------------------------------------------------------
  const total = rows.length;
  const sessions = new Set(rows.map((r) => r.sid)).size;

  const days = daysInRange(from, to);
  const perDay = new Map<string, number>(days.map((d) => [d, 0]));
  const perHour = Array.from({ length: 24 }, () => 0);
  const perPath = new Map<string, number>();
  const perCategory = new Map<string, number>();

  for (const r of rows) {
    perDay.set(r.day, (perDay.get(r.day) ?? 0) + 1);
    if (r.hour >= 0 && r.hour < 24) perHour[r.hour] += 1;
    perPath.set(r.path, (perPath.get(r.path) ?? 0) + 1);
    const slug = menuSlugForPath(r.path);
    if (slug) perCategory.set(slug, (perCategory.get(slug) ?? 0) + 1);
  }

  const dayEntries = days.map((d) => ({ day: d, count: perDay.get(d) ?? 0 }));
  const maxDay = Math.max(1, ...dayEntries.map((d) => d.count));
  const busiestDay = dayEntries.reduce((a, b) => (b.count > a.count ? b : a), dayEntries[0]);

  const maxHour = Math.max(1, ...perHour);
  const busiestHourIdx = perHour.indexOf(Math.max(...perHour));

  const topPaths = [...perPath.entries()]
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const maxPath = Math.max(1, ...topPaths.map((p) => p.count));

  const topCategories = [...perCategory.entries()]
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
  const maxCat = Math.max(1, ...topCategories.map((c) => c.count));

  const avgPerDay = days.length ? Math.round(total / days.length) : 0;

  return (
    <main className="mx-auto max-w-content px-6 py-10 sm:px-10 sm:py-14">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-luxe text-caramel">Chillville</span>
          <h1 className="mt-2 font-display text-3xl font-extrabold text-cream sm:text-4xl">
            Site Analytics
          </h1>
          <p className="mt-1 text-sm text-cream/45">
            Signed in as {email} · times shown in store time (Central)
          </p>
        </div>
        <LogoutButton />
      </div>

      {/* Date range */}
      <form
        method="get"
        className="mt-8 flex flex-wrap items-end gap-3 rounded-2xl border border-cream/10 bg-cream/[0.02] px-4 py-4"
      >
        <div>
          <label htmlFor="from" className="mb-1 block text-[10px] uppercase tracking-wide2 text-cream/40">
            From
          </label>
          <input
            id="from"
            type="date"
            name="from"
            defaultValue={from}
            max={to}
            className="rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2 text-sm text-cream outline-none [color-scheme:dark] focus:border-caramel/60"
          />
        </div>
        <div>
          <label htmlFor="to" className="mb-1 block text-[10px] uppercase tracking-wide2 text-cream/40">
            To
          </label>
          <input
            id="to"
            type="date"
            name="to"
            defaultValue={to}
            min={from}
            className="rounded-lg border border-cream/15 bg-cream/[0.03] px-3 py-2 text-sm text-cream outline-none [color-scheme:dark] focus:border-caramel/60"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-caramel px-4 py-2 font-display text-sm font-semibold text-charcoal transition-opacity hover:opacity-90"
        >
          Apply
        </button>
        <div className="ml-auto flex gap-2 text-[11px]">
          <RangeChip label="7d" days={7} to={to} active={days.length === 7} />
          <RangeChip label="14d" days={14} to={to} active={days.length === 14} />
          <RangeChip label="30d" days={30} to={to} active={days.length === 30} />
        </div>
      </form>

      {total === 0 ? (
        <EmptyState configured={getDb() !== null} from={from} to={to} />
      ) : (
        <>
          {/* KPIs */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <Kpi label="Total visits" value={total.toLocaleString()} />
            <Kpi label="Unique sessions" value={sessions.toLocaleString()} />
            <Kpi label="Avg / day" value={avgPerDay.toLocaleString()} />
            <Kpi
              label="Busiest hour"
              value={perHour[busiestHourIdx] > 0 ? hourLabel(busiestHourIdx) : "—"}
              sub={busiestDay ? `Peak day ${prettyDay(busiestDay.day)}` : undefined}
            />
          </div>

          {/* Visits over time */}
          <Panel title="Visits over time" hint={`${prettyDay(from)} – ${prettyDay(to)}`}>
            <div className="flex items-end gap-1 overflow-x-auto pb-1">
              {dayEntries.map((d) => (
                <div
                  key={d.day}
                  className="group flex min-w-[10px] flex-1 flex-col items-center gap-2"
                  title={`${prettyDay(d.day)}: ${d.count} visit${d.count === 1 ? "" : "s"}`}
                >
                  <div className="flex h-40 w-full items-end">
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-caramel/40 to-caramel transition-opacity group-hover:opacity-80"
                      style={{ height: `${Math.max(2, (d.count / maxDay) * 100)}%` }}
                    />
                  </div>
                  {days.length <= 31 && (
                    <span className="whitespace-nowrap text-[9px] tabular-nums text-cream/35">
                      {prettyDay(d.day)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Busiest hours */}
            <Panel title="Busiest times of day">
              <div className="flex items-end gap-[3px]">
                {perHour.map((c, h) => (
                  <div
                    key={h}
                    className="group flex flex-1 flex-col items-center gap-1.5"
                    title={`${hourLabel(h)}: ${c} visit${c === 1 ? "" : "s"}`}
                  >
                    <div className="flex h-32 w-full items-end">
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-matcha/30 to-matcha transition-opacity group-hover:opacity-80"
                        style={{ height: `${Math.max(2, (c / maxHour) * 100)}%` }}
                      />
                    </div>
                    {h % 6 === 0 && (
                      <span className="text-[9px] tabular-nums text-cream/35">{hourLabel(h)}</span>
                    )}
                  </div>
                ))}
              </div>
            </Panel>

            {/* Most-viewed menu categories */}
            <Panel title="Most-viewed products" hint="menu category pages">
              {topCategories.length === 0 ? (
                <p className="py-6 text-sm text-cream/40">
                  No menu pages viewed in this range yet.
                </p>
              ) : (
                <ul className="space-y-3">
                  {topCategories.map((c) => (
                    <BarRow
                      key={c.slug}
                      label={labelForPath(`/menu/${c.slug}`).replace(/^Menu · /, "")}
                      count={c.count}
                      pct={(c.count / maxCat) * 100}
                      accent="coral"
                    />
                  ))}
                </ul>
              )}
            </Panel>
          </div>

          {/* Top pages overall */}
          <Panel title="Top pages">
            <ul className="space-y-3">
              {topPaths.map((p) => (
                <BarRow
                  key={p.path}
                  label={labelForPath(p.path)}
                  count={p.count}
                  pct={(p.count / maxPath) * 100}
                  accent="caramel"
                />
              ))}
            </ul>
          </Panel>
        </>
      )}

      {/* Order metrics — live in Toast */}
      <OrderMetricsCard />

      <p className="mt-8 text-center text-[11px] text-cream/25">
        Visitor data is anonymous — no cookies, no personal information. Hours are {STORE_TZ}.
      </p>
    </main>
  );
}

/* --------------------------------- UI bits -------------------------------- */

function Kpi({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border border-cream/10 bg-cream/[0.02] px-5 py-5">
      <div className="text-[10px] uppercase tracking-wide2 text-cream/40">{label}</div>
      <div className="mt-2 font-display text-3xl font-extrabold text-cream">{value}</div>
      {sub && <div className="mt-1 text-[11px] text-cream/35">{sub}</div>}
    </div>
  );
}

function Panel({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-2xl border border-cream/10 bg-cream/[0.02] px-5 py-5">
      <div className="mb-5 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-sm font-semibold uppercase tracking-wide2 text-caramel">
          {title}
        </h2>
        {hint && <span className="text-[11px] text-cream/30">{hint}</span>}
      </div>
      {children}
    </section>
  );
}

function BarRow({
  label,
  count,
  pct,
  accent,
}: {
  label: string;
  count: number;
  pct: number;
  accent: "caramel" | "coral";
}) {
  const bar = accent === "coral" ? "from-coral/40 to-coral" : "from-caramel/40 to-caramel";
  return (
    <li>
      <div className="mb-1 flex items-baseline justify-between gap-3 text-sm">
        <span className="truncate text-cream/75">{label}</span>
        <span className="shrink-0 tabular-nums text-cream/45">{count.toLocaleString()}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-cream/5">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${bar}`}
          style={{ width: `${Math.max(3, pct)}%` }}
        />
      </div>
    </li>
  );
}

function RangeChip({
  label,
  days,
  to,
  active,
}: {
  label: string;
  days: number;
  to: string;
  active: boolean;
}) {
  // Link back to this page with a preset range ending on the current "to".
  const from = (() => {
    const [y, m, d] = to.split("-").map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d));
    dt.setUTCDate(dt.getUTCDate() - (days - 1));
    return dt.toISOString().slice(0, 10);
  })();
  return (
    <Link
      href={`/admin/analytics?from=${from}&to=${to}`}
      className={`rounded-full border px-3 py-1 uppercase tracking-wide2 transition-colors ${
        active
          ? "border-caramel/50 bg-caramel/10 text-caramel"
          : "border-cream/15 text-cream/50 hover:border-caramel/40 hover:text-caramel"
      }`}
    >
      {label}
    </Link>
  );
}

function EmptyState({
  configured,
  from,
  to,
}: {
  configured: boolean;
  from: string;
  to: string;
}) {
  return (
    <div className="mt-10 rounded-2xl border border-cream/10 bg-cream/[0.02] px-6 py-16 text-center">
      {configured ? (
        <>
          <p className="font-display text-xl text-cream/70">No visits recorded yet</p>
          <p className="mt-2 text-sm text-cream/40">
            Nothing tracked between {prettyDay(from)} and {prettyDay(to)}. Data appears here as
            visitors browse the site.
          </p>
        </>
      ) : (
        <>
          <p className="font-display text-xl text-cream/70">Analytics isn&rsquo;t connected yet</p>
          <p className="mt-2 text-sm text-cream/40">
            Add the Firebase service-account key on the host to start recording visits.
          </p>
        </>
      )}
    </div>
  );
}

function OrderMetricsCard() {
  return (
    <section className="mt-6 rounded-2xl border border-cream/10 bg-gradient-to-br from-cream/[0.03] to-transparent px-5 py-6">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide2 text-caramel">
        Orders &amp; transactions
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream/55">
        Orders are placed and paid through Toast, so the most-ordered items, weekly transaction
        counts and sales totals live in Toast&rsquo;s own reporting — the authoritative record,
        including anything that comes through DoorDash. Open the Sales Summary and Product Mix
        reports there and set any date range you need.
      </p>
      <a
        href="https://www.toasttab.com/login"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-caramel/40 px-4 py-2.5 font-display text-sm font-semibold text-caramel transition-colors hover:bg-caramel/10"
      >
        Open Toast reporting ↗
      </a>
      <p className="mt-4 text-[11px] text-cream/30">
        Want these numbers mirrored inside this dashboard instead? That needs read-only Toast API
        access — say the word and I&rsquo;ll wire it in.
      </p>
    </section>
  );
}
