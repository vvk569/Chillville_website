/**
 * Pickup-order intake (Phase 1 — no online payment).
 *
 * Receives an order from the site, maps item ids to real names server-side,
 * and emails the store an itemised ticket to key into Toast as a phone order.
 * Delivery uses Resend's REST API (no npm dependency — plain fetch).
 *
 * Required env (set in Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY     — from resend.com
 *   ORDER_NOTIFY_TO    — inbox that receives orders (default info@chillvilletreats.com)
 *   ORDER_NOTIFY_FROM  — verified sender, e.g. "Chillville Orders <orders@chillvilletreats.com>"
 *
 * Until RESEND_API_KEY is set the route returns 503 and the page shows a
 * "call us" fallback, so no order is silently lost.
 */

import { NextResponse } from "next/server";
import { orderItemsById } from "@/lib/order";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type InLine = { id?: string; qty?: number };
type Body = {
  name?: string;
  phone?: string;
  email?: string;
  pickup?: string;
  notes?: string;
  items?: InLine[];
  company?: string; // honeypot — real users never fill this
};

function makeOrderNo(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  const stamp = `${p(d.getMonth() + 1)}${p(d.getDate())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `CV-${stamp}-${rand}`;
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot: pretend success, send nothing.
  if (typeof body.company === "string" && body.company.trim() !== "") {
    return NextResponse.json({ ok: true, orderNo: makeOrderNo() });
  }

  const name = (body.name || "").trim().slice(0, 120);
  const phone = (body.phone || "").trim().slice(0, 40);
  const email = (body.email || "").trim().slice(0, 160);
  const pickup = (body.pickup || "").trim().slice(0, 80);
  const notes = (body.notes || "").trim().slice(0, 500);

  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 100) : [];
  const lines = rawItems
    .map((l) => ({
      item: l && typeof l.id === "string" ? orderItemsById[l.id] : undefined,
      qty: Math.max(1, Math.min(50, Math.floor(Number(l?.qty) || 0))),
    }))
    .filter((l) => l.item);

  if (!name || !phone || lines.length === 0) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 422 });
  }

  const orderNo = makeOrderNo();
  const totalCount = lines.reduce((n, l) => n + l.qty, 0);
  const itemText = lines.map((l) => `  ${l.qty} × ${l.item!.name}  (${l.item!.category})`).join("\n");

  const text = [
    `NEW PICKUP ORDER   #${orderNo}`,
    `--------------------------------`,
    `Name:   ${name}`,
    `Phone:  ${phone}`,
    ...(email ? [`Email:  ${email}`] : []),
    `Pickup: ${pickup || "ASAP"}`,
    `Items:  ${totalCount}`,
    `--------------------------------`,
    itemText,
    `--------------------------------`,
    ...(notes ? [`Notes: ${notes}`] : []),
    `PAYMENT: Pay at pickup (no online payment).`,
    `→ Enter into Toast as a phone order.`,
  ].join("\n");

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_TO || "info@chillvilletreats.com";
  const from = process.env.ORDER_NOTIFY_FROM || "Chillville Orders <onboarding@resend.dev>";

  if (!key) {
    // Not configured yet — tell the client so it shows the call-us fallback.
    return NextResponse.json({ ok: false, error: "unconfigured" }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        ...(email ? { reply_to: email } : {}),
        subject: `New pickup order #${orderNo} — ${name} (${totalCount} item${totalCount > 1 ? "s" : ""})`,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("Resend send failed", res.status, detail);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (err) {
    console.error("Order send exception", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, orderNo });
}
