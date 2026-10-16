"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { orderCategories, orderItemsById, type OrderItem } from "@/lib/order";
import { store } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BackToChillvilleLink } from "@/components/BackToChillvilleLink";

/** Relative pickup-time choices. Kept simple; the store confirms by text. */
const PICKUP_TIMES = [
  "ASAP — about 20 min",
  "In 30 minutes",
  "In 45 minutes",
  "In 1 hour",
  "Later today — I'll call",
];

type View = "browse" | "checkout" | "done";
type Selections = Record<string, string>; // modifier groupId -> chosen option
type CartLine = {
  lineId: string; // unique per item + chosen options, so variants stack separately
  itemId: string;
  qty: number;
  selections?: Selections;
};

/** A stable key for an item + its chosen options (same choices = same line). */
function makeLineId(itemId: string, selections?: Selections): string {
  const keys = selections ? Object.keys(selections) : [];
  if (keys.length === 0) return itemId;
  return `${itemId}#${keys.map((k) => `${k}:${selections![k]}`).join("|")}`;
}

/** One-line recap of the chosen options, in the item's own group order. */
function selectionSummary(item: OrderItem, selections?: Selections): string {
  if (!selections || !item.modifiers) return "";
  return item.modifiers
    .map((g) => selections[g.id])
    .filter(Boolean)
    .join(" · ");
}

export function OrderClient() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [view, setView] = useState<View>("browse");
  const [activeCat, setActiveCat] = useState(orderCategories[0]?.slug ?? "");

  // Customization sheet state.
  const [customizing, setCustomizing] = useState<OrderItem | null>(null);
  const [draft, setDraft] = useState<Selections>({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pickup, setPickup] = useState(PICKUP_TIMES[0]);
  const [notes, setNotes] = useState("");
  const [company, setCompany] = useState(""); // honeypot

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<null | "missing" | "unconfigured" | "send_failed">(null);
  const [orderNo, setOrderNo] = useState<string | null>(null);

  const category = orderCategories.find((c) => c.slug === activeCat) ?? orderCategories[0];

  const totalCount = useMemo(() => cart.reduce((n, l) => n + l.qty, 0), [cart]);
  const cartLines = useMemo(
    () =>
      cart
        .map((line) => ({ line, item: orderItemsById[line.itemId] as OrderItem | undefined }))
        .filter((x): x is { line: CartLine; item: OrderItem } => Boolean(x.item)),
    [cart],
  );

  const qtyForItem = (itemId: string) =>
    cart.reduce((n, l) => (l.itemId === itemId ? n + l.qty : n), 0);

  function addToCart(item: OrderItem, selections?: Selections) {
    const lineId = makeLineId(item.id, selections);
    setCart((c) => {
      const i = c.findIndex((l) => l.lineId === lineId);
      if (i >= 0) {
        const next = [...c];
        next[i] = { ...next[i], qty: next[i].qty + 1 };
        return next;
      }
      return [...c, { lineId, itemId: item.id, qty: 1, selections }];
    });
  }
  const incLine = (lineId: string) =>
    setCart((c) => c.map((l) => (l.lineId === lineId ? { ...l, qty: l.qty + 1 } : l)));
  const decLine = (lineId: string) =>
    setCart((c) =>
      c.flatMap((l) => {
        if (l.lineId !== lineId) return [l];
        const q = l.qty - 1;
        return q <= 0 ? [] : [{ ...l, qty: q }];
      }),
    );

  // ---- customization sheet ----
  function openCustomizer(item: OrderItem) {
    const init: Selections = {};
    for (const g of item.modifiers ?? []) init[g.id] = g.default ?? g.options[0];
    setDraft(init);
    setCustomizing(item);
  }
  function confirmCustomizer() {
    if (customizing) addToCart(customizing, draft);
    setCustomizing(null);
  }

  // When the +/- control is used on a customizable item we tap it for a drink
  // with its default choices; different combos are made via the sheet.
  function quickAdd(item: OrderItem) {
    if (item.modifiers?.length) openCustomizer(item);
    else addToCart(item);
  }

  async function placeOrder() {
    if (!name.trim() || !phone.trim() || totalCount === 0) {
      setError("missing");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          email,
          pickup,
          notes,
          company,
          items: cart.map((l) => ({ id: l.itemId, qty: l.qty, options: l.selections })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        orderNo?: string;
        error?: string;
      };
      if (res.ok && data.ok) {
        setOrderNo(data.orderNo ?? null);
        setView("done");
      } else if (data.error === "unconfigured") {
        setError("unconfigured");
      } else if (data.error === "missing_fields") {
        setError("missing");
      } else {
        setError("send_failed");
      }
    } catch {
      setError("send_failed");
    } finally {
      setSubmitting(false);
    }
  }

  function reset() {
    setCart([]);
    setCustomizing(null);
    setName("");
    setPhone("");
    setEmail("");
    setPickup(PICKUP_TIMES[0]);
    setNotes("");
    setError(null);
    setOrderNo(null);
    setActiveCat(orderCategories[0]?.slug ?? "");
    setView("browse");
  }

  // ---------- DONE ----------
  if (view === "done") {
    return (
      <Shell>
        <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-matcha/40 bg-matcha/10">
            <svg viewBox="0 0 24 24" fill="none" stroke="#8fce74" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <h1 className="mt-6 font-display text-3xl text-cream">Order received!</h1>
          <p className="mt-2 text-cream/60">
            We&rsquo;re getting it ready. Pay when you pick up — we&rsquo;ll text {name.split(" ")[0] || "you"} if anything&rsquo;s unclear.
          </p>
          <p className="mt-1 text-caramel">Pickup: {pickup}</p>
          {orderNo && (
            <p className="mt-5 font-display text-lg tracking-wide2 text-caramel tabular-nums">
              Order #{orderNo}
            </p>
          )}
          <button
            onClick={reset}
            className="mt-10 rounded-full border border-cream/20 px-6 py-3 text-xs uppercase tracking-wide2 text-cream transition-colors hover:border-caramel hover:text-caramel"
          >
            Start a new order
          </button>
        </div>
      </Shell>
    );
  }

  // ---------- CHECKOUT ----------
  if (view === "checkout") {
    return (
      <Shell>
        <button
          onClick={() => setView("browse")}
          className="text-[11px] uppercase tracking-wide2 text-cream/50 transition-colors hover:text-caramel"
        >
          ‹ Add more items
        </button>
        <h1 className="mt-5 font-display text-4xl font-extrabold text-cream sm:text-5xl">
          Review &amp; pickup
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1fr]">
          {/* Order summary */}
          <div>
            <h2 className="text-[11px] uppercase tracking-luxe text-caramel">Your order</h2>
            <ul className="mt-4 divide-y divide-cream/10 rounded-2xl border border-cream/10 bg-cream/[0.02] px-4">
              {cartLines.map(({ line, item }) => {
                const sel = selectionSummary(item, line.selections);
                return (
                  <li key={line.lineId} className="flex items-center gap-3 py-3">
                    <div className="flex flex-1 flex-col">
                      <span className="text-cream">{item.name}</span>
                      <span className="text-[11px] uppercase tracking-wide2 text-cream/35">{item.category}</span>
                      {sel && <span className="mt-1 text-[11px] text-caramel/85">{sel}</span>}
                    </div>
                    <Stepper qty={line.qty} onDec={() => decLine(line.lineId)} onInc={() => incLine(line.lineId)} />
                  </li>
                );
              })}
            </ul>
            <div className="mt-4 flex items-center justify-between rounded-xl border border-matcha/25 bg-matcha/[0.08] px-4 py-3 text-sm text-matcha">
              <span>{totalCount} item{totalCount !== 1 ? "s" : ""}</span>
              <span className="font-medium">Pay in store at pickup</span>
            </div>
          </div>

          {/* Details form */}
          <div>
            <h2 className="text-[11px] uppercase tracking-luxe text-caramel">Pickup details</h2>
            <div className="mt-4 flex flex-col gap-4">
              <Field id="ord-name" label="Name">
                <input id="ord-name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="e.g. Priya S." className={inputCls} />
              </Field>
              <Field id="ord-phone" label="Mobile number" hint="So we can text you when it's ready.">
                <input id="ord-phone" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" placeholder="(931) 555-0100" className={inputCls} />
              </Field>
              <Field id="ord-email" label="Email (optional)">
                <input id="ord-email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@email.com" className={inputCls} />
              </Field>
              <Field id="ord-pickup" label="Pickup time">
                <select id="ord-pickup" value={pickup} onChange={(e) => setPickup(e.target.value)} className={inputCls}>
                  {PICKUP_TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field id="ord-notes" label="Notes (optional)">
                <textarea id="ord-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Allergies, less sweet, extra napkins…" className={`${inputCls} resize-none`} />
              </Field>

              {/* Honeypot — visually hidden, off the tab order */}
              <input
                aria-hidden
                tabIndex={-1}
                autoComplete="off"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="absolute h-0 w-0 overflow-hidden opacity-0"
                name="company"
              />

              {error === "missing" && (
                <p className="text-sm text-coral">Please add your name, mobile number, and at least one item.</p>
              )}
              {(error === "unconfigured" || error === "send_failed") && (
                <div className="rounded-xl border border-coral/30 bg-coral/[0.08] px-4 py-3 text-sm text-cream/80">
                  We couldn&rsquo;t submit your order online right now. Please call us and we&rsquo;ll take it over the phone:{" "}
                  <a href={`tel:${store.phone.replace(/[^\d+]/g, "")}`} className="font-medium text-caramel underline underline-offset-2">
                    {store.phone}
                  </a>
                  .
                </div>
              )}

              <button
                onClick={placeOrder}
                disabled={submitting}
                className="mt-1 rounded-full bg-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-wide2 text-charcoal transition-[filter,transform] hover:brightness-105 active:translate-y-px disabled:opacity-50"
              >
                {submitting ? "Placing order…" : "Place pickup order"}
              </button>
              <p className="text-center text-[11px] text-cream/35">No payment now — pay in store at pickup.</p>
            </div>
          </div>
        </div>
      </Shell>
    );
  }

  // ---------- BROWSE ----------
  return (
    <Shell wide>
      <BackToChillvilleLink className="text-[11px] uppercase tracking-wide2 text-cream/50 transition-colors hover:text-caramel">
        ‹ Back to Chillville
      </BackToChillvilleLink>
      <header className="mt-6 max-w-2xl">
        <span className="text-[11px] uppercase tracking-luxe text-caramel">Order for pickup</span>
        <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-cream sm:text-6xl">
          Build your order
        </h1>
        <p className="mt-4 text-cream/55">
          Pick your treats and a pickup time — no payment now, you pay in store when you collect. We&rsquo;ll have it ready.
        </p>
      </header>

      {/* Category tabs */}
      <div className="no-scrollbar sticky top-[68px] z-30 -mx-6 mt-10 overflow-x-auto overscroll-x-contain bg-charcoal/70 px-6 py-3 backdrop-blur-md sm:-mx-10 sm:px-10">
        <div className="flex w-max gap-2">
          {orderCategories.map((c) => {
            const active = c.slug === activeCat;
            const inCat = c.items.reduce((n, i) => n + qtyForItem(i.id), 0);
            return (
              <button
                key={c.slug}
                onClick={() => setActiveCat(c.slug)}
                className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-wide2 transition-colors ${
                  active
                    ? "border-caramel/60 bg-caramel/10 text-cream"
                    : "border-cream/12 text-cream/60 hover:border-cream/30 hover:text-cream"
                }`}
              >
                {c.name}
                {inCat > 0 && (
                  <span className="ml-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-semibold text-charcoal">
                    {inCat}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items */}
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category?.items.map((item) => {
          const qty = qtyForItem(item.id);
          const customizable = (item.modifiers?.length ?? 0) > 0;
          return (
            <li key={item.id}>
              <div className="flex h-full items-center gap-3 rounded-2xl border border-cream/10 bg-cream/[0.02] p-3 transition-colors hover:border-caramel/30">
                <div
                  className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-cream/10"
                  style={{ backgroundImage: `linear-gradient(135deg, ${category.accent}22, transparent 60%)` }}
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt=""
                      width={56}
                      height={56}
                      sizes="56px"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <span className="text-sm text-cream">{item.name}</span>
                  {customizable && (
                    <span className="mt-0.5 text-[10px] uppercase tracking-wide2 text-cream/35">Customizable</span>
                  )}
                </div>
                {customizable ? (
                  <button
                    onClick={() => openCustomizer(item)}
                    aria-label={`Customize ${item.name}`}
                    className="relative flex h-9 min-w-9 shrink-0 items-center justify-center rounded-lg border border-cream/15 bg-cream/[0.03] px-2 text-lg text-cream transition-colors hover:border-caramel hover:bg-cream/[0.06]"
                  >
                    +
                    {qty > 0 && (
                      <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-caramel px-1 text-[10px] font-semibold text-charcoal">
                        {qty}
                      </span>
                    )}
                  </button>
                ) : qty > 0 ? (
                  <Stepper qty={qty} onDec={() => decLine(item.id)} onInc={() => quickAdd(item)} />
                ) : (
                  <button
                    onClick={() => quickAdd(item)}
                    aria-label={`Add ${item.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cream/15 bg-cream/[0.03] text-lg text-cream transition-colors hover:border-caramel hover:bg-cream/[0.06]"
                  >
                    +
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Sticky cart bar */}
      <div className="pointer-events-none sticky bottom-4 z-40 mt-10 flex justify-center">
        <button
          onClick={() => totalCount > 0 && setView("checkout")}
          disabled={totalCount === 0}
          className="pointer-events-auto flex items-center gap-3 rounded-full bg-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-wide2 text-charcoal shadow-card transition-[filter,transform] hover:brightness-105 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-40"
        >
          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-charcoal/20 px-1.5 text-charcoal tabular-nums">
            {totalCount}
          </span>
          Review order
        </button>
      </div>

      {/* Customization sheet */}
      {customizing && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-charcoal/70 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => setCustomizing(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Customize ${customizing.name}`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[88vh] w-full max-w-md overflow-y-auto rounded-t-3xl border border-cream/12 bg-charcoal-800 p-6 sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl text-cream">{customizing.name}</h2>
                <p className="mt-1 text-[11px] uppercase tracking-wide2 text-caramel">Make it yours</p>
              </div>
              <button
                onClick={() => setCustomizing(null)}
                aria-label="Close"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 flex flex-col gap-6">
              {customizing.modifiers?.map((g) => (
                <div key={g.id}>
                  <h3 className="mb-2.5 text-xs uppercase tracking-wide2 text-cream/60">{g.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {g.options.map((opt) => {
                      const active = draft[g.id] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => setDraft((s) => ({ ...s, [g.id]: opt }))}
                          className={cn(
                            "rounded-full border px-4 py-2 text-sm transition-colors",
                            active
                              ? "border-caramel bg-caramel/15 text-cream"
                              : "border-cream/15 text-cream/70 hover:border-cream/35 hover:text-cream",
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={confirmCustomizer}
              className="mt-7 w-full rounded-full bg-caramel px-6 py-3.5 text-sm font-semibold uppercase tracking-wide2 text-charcoal transition-[filter,transform] hover:brightness-105 active:translate-y-px"
            >
              Add to order
            </button>
          </div>
        </div>
      )}
    </Shell>
  );
}

/* ---------- small building blocks ---------- */

const inputCls =
  "w-full rounded-xl border border-cream/15 bg-cream/[0.03] px-3.5 py-3 text-cream placeholder:text-cream/30 focus:border-transparent focus:outline focus:outline-2 focus:outline-caramel";

function Shell({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={`mx-auto ${wide ? "max-w-content" : "max-w-3xl"} px-6 pb-32 pt-28 sm:px-10 sm:pt-36`}>
      {children}
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs tracking-wide2 text-cream/60">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-cream/35">{hint}</p>}
    </div>
  );
}

function Stepper({ qty, onDec, onInc }: { qty: number; onDec: () => void; onInc: () => void }) {
  return (
    <div className="flex shrink-0 items-center gap-2 rounded-lg border border-cream/15 bg-cream/[0.03] p-1">
      <button onClick={onDec} aria-label="Remove one" className="flex h-7 w-7 items-center justify-center rounded-md text-cream hover:bg-cream/10">
        −
      </button>
      <span className="min-w-4 text-center text-sm font-semibold text-cream tabular-nums">{qty}</span>
      <button onClick={onInc} aria-label="Add one" className="flex h-7 w-7 items-center justify-center rounded-md text-cream hover:bg-cream/10">
        +
      </button>
    </div>
  );
}
