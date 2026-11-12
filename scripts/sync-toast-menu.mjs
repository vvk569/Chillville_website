// @ts-nocheck
/**
 * Toast → Firestore menu sync.
 *
 * Reads the live menu embedded in the restaurant's public Toast online-ordering
 * page (window.__OO_STATE__) and upserts it into the same Firestore collections
 * the website reads (`categories{SUFFIX}` / `menuItems{SUFFIX}` — see
 * lib/menu-firestore.ts). Runs on a schedule from GitHub Actions.
 *
 * Design goals:
 *  - Non-destructive: merges writes, never deletes. Items that disappear from
 *    Toast are marked isAvailable:false (so curated images/descriptions survive).
 *  - Curated-safe: the website resolves product photos by name from the bundled
 *    images on read, so this sync only needs names/prices/availability. It only
 *    writes a `description` when Toast actually has one (never blanks a curated
 *    ingredients line).
 *  - Price is authoritative from Toast; availability mirrors Toast's outOfStock.
 *
 * Env:
 *   TOAST_ORDER_URL            (required) the public order.toasttab.com/online/... URL
 *   FIREBASE_SERVICE_ACCOUNT   service-account JSON (or _B64 for base64). When
 *                              absent the script runs as a DRY RUN: it prints a
 *                              summary and writes the computed docs to
 *                              ./toast-sync-dryrun.json, and touches no database.
 *   MENU_COLLECTION_SUFFIX     optional, e.g. "_v2" to target a staging copy.
 *   CHROMIUM_PATH              optional explicit Chromium executable path.
 */
import fs from "node:fs";
import { chromium } from "playwright";

const TOAST_URL =
  process.env.TOAST_ORDER_URL ||
  "https://order.toasttab.com/online/urban-indulge-llc-1243-rossview-road-suite-102";
const SUFFIX = process.env.MENU_COLLECTION_SUFFIX ?? "";

// Toast top-level menu name  →  website category slug. Toast categories not
// listed here have no page on the site yet and are skipped (and reported).
const CATEGORY_MAP = {
  Boba: "boba",
  Cookies: "cookies",
  Donuts: "donuts",
  "Ice Cream": "ice-cream",
  Shakes: "ice-cream-shakes",
  Muffins: "muffins",
  "Cheese Cakes": "cheesecakes",
  Chocolates: "chocolates",
  Brownies: "brownies",
  Indian: "indian",
  Croissant: "croissant",
  Breads: "breads",
  Bakery: "bakery",
};

// Accent + display name + order per slug, mirroring lib/menu.ts.
const CATEGORY_META = {
  boba: { name: "Boba", accent: "#c9a26b", order: 1 },
  cookies: { name: "Cookies", accent: "#a4713f", order: 2 },
  donuts: { name: "Donuts", accent: "#d9b486", order: 3 },
  "ice-cream-shakes": { name: "Milkshakes", accent: "#c58f6a", order: 4 },
  "ice-cream": { name: "Ice Cream", accent: "#d9b486", order: 5 },
  muffins: { name: "Muffins", accent: "#c7a978", order: 6 },
  cheesecakes: { name: "Cheesecakes", accent: "#c9a26b", order: 7 },
  chocolates: { name: "Chocolates", accent: "#8fae7b", order: 8 },
  brownies: { name: "Brownies", accent: "#7a4a2b", order: 9 },
  indian: { name: "Indian", accent: "#b5793f", order: 10 },
  croissant: { name: "Croissant", accent: "#d9b486", order: 11 },
  breads: { name: "Breads", accent: "#c7a978", order: 12 },
  bakery: { name: "Bakery", accent: "#cf9f66", order: 13 },
};

async function scrapeToast() {
  const launchOpts = { args: ["--no-sandbox"] };
  if (process.env.CHROMIUM_PATH) launchOpts.executablePath = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(launchOpts);
  try {
    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36",
      locale: "en-US",
      viewport: { width: 1366, height: 900 },
      extraHTTPHeaders: {
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      },
    });
    // The menu lives in an inline script in the initial HTML, so we only need
    // the document — not "networkidle", which never settles on CI because Toast
    // keeps background connections open (that was the CI timeout).
    await page.goto(TOAST_URL, { waitUntil: "domcontentloaded", timeout: 90000 });
    // Wait until the embedded menu state is actually populated with Menu groups.
    await page
      .waitForFunction(
        () => {
          const s = window.__OO_STATE__;
          return (
            s &&
            Object.values(s).some(
              (v) => v && v.__typename === "Menu" && Array.isArray(v.groups)
            )
          );
        },
        { timeout: 30000 }
      )
      .catch(() => {});
    const state = await page.evaluate(() => window.__OO_STATE__ || null);
    if (!state) {
      // Diagnostic: show what we actually got (likely a bot-challenge page).
      const info = await page.evaluate(() => ({
        title: document.title,
        text: (document.body ? document.body.innerText : "").slice(0, 300),
      }));
      console.log("DIAGNOSTIC title:", JSON.stringify(info.title));
      console.log("DIAGNOSTIC body:", JSON.stringify(info.text.replace(/\s+/g, " ")));
      throw new Error("window.__OO_STATE__ not found on the Toast page");
    }
    return state;
  } finally {
    await browser.close();
  }
}

/** Walk the Toast cache into flat category + item records. */
function transform(state) {
  const menus = Object.values(state).filter(
    (v) => v && v.__typename === "Menu" && Array.isArray(v.groups)
  );

  const items = [];
  const usedSlugs = new Set();
  const skipped = new Set();
  let sortOrder = 0;

  for (const menu of menus) {
    const slug = CATEGORY_MAP[menu.name];
    if (!slug) {
      skipped.add(menu.name);
      continue;
    }
    usedSlugs.add(slug);
    for (const group of menu.groups) {
      for (const it of group.items || []) {
        if (!it || !it.name) continue;
        const priceNum = Array.isArray(it.prices) ? it.prices[0] : undefined;
        items.push({
          id: it.guid,
          categorySlug: slug,
          name: it.name,
          subcategory: group.name || null,
          description: (it.description || "").trim(), // only written when non-empty
          priceInCents:
            typeof priceNum === "number" ? Math.round(priceNum * 100) : null,
          isAvailable: it.outOfStock !== true,
          sortOrder: sortOrder++,
        });
      }
    }
  }

  const categories = [...usedSlugs]
    .map((slug) => ({ id: slug, slug, ...CATEGORY_META[slug], active: true }))
    .sort((a, b) => a.order - b.order);

  return { categories, items, skipped: [...skipped] };
}

function getDb() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  let svc = null;
  if (raw && raw.trim()) svc = JSON.parse(raw);
  else if (b64 && b64.trim()) svc = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
  if (!svc) return null;
  // Imported lazily so a dry run never needs firebase-admin installed.
  return import("firebase-admin/app").then(async ({ cert, getApps, initializeApp }) => {
    const { getFirestore } = await import("firebase-admin/firestore");
    const app = getApps()[0] ?? initializeApp({ credential: cert(svc) });
    return getFirestore(app);
  });
}

async function writeFirestore(db, { categories, items }) {
  const catCol = `categories${SUFFIX}`;
  const itemCol = `menuItems${SUFFIX}`;

  // Upsert categories.
  let batch = db.batch();
  for (const c of categories) {
    const { id, ...data } = c;
    batch.set(db.collection(catCol).doc(id), data, { merge: true });
  }
  await batch.commit();

  // Upsert items (merge; omit empty description so curated text survives).
  const liveIds = new Set(items.map((i) => i.id));
  const CHUNK = 400;
  for (let i = 0; i < items.length; i += CHUNK) {
    batch = db.batch();
    for (const it of items.slice(i, i + CHUNK)) {
      const { id, description, ...rest } = it;
      const data = { ...rest, syncedFrom: "toast", syncedAt: Date.now() };
      if (description) data.description = description;
      batch.set(db.collection(itemCol).doc(id), data, { merge: true });
    }
    await batch.commit();
  }

  // Reconcile: anything in Firestore not in this Toast pull → mark unavailable.
  const existing = await db.collection(itemCol).get();
  const stale = existing.docs.filter(
    (d) => (d.data().syncedFrom === "toast") && !liveIds.has(d.id)
  );
  for (let i = 0; i < stale.length; i += CHUNK) {
    batch = db.batch();
    for (const d of stale.slice(i, i + CHUNK)) {
      batch.set(d.ref, { isAvailable: false }, { merge: true });
    }
    await batch.commit();
  }
  return { catCol, itemCol, staleDisabled: stale.length };
}

async function main() {
  console.log(`Scraping Toast menu: ${TOAST_URL}`);
  const state = await scrapeToast();
  const result = transform(state);
  console.log(
    `Parsed ${result.items.length} items across ${result.categories.length} categories.`
  );
  if (result.skipped.length)
    console.log(`Skipped (no site page): ${result.skipped.join(", ")}`);

  const dbPromise = getDb();
  if (!dbPromise) {
    fs.writeFileSync("toast-sync-dryrun.json", JSON.stringify(result, null, 2));
    console.log(
      "DRY RUN (no FIREBASE_SERVICE_ACCOUNT). Wrote toast-sync-dryrun.json; no database touched."
    );
    return;
  }
  const db = await dbPromise;
  const info = await writeFirestore(db, result);
  console.log(
    `Wrote ${result.items.length} items to ${info.itemCol} and ${result.categories.length} categories to ${info.catCol}. Disabled ${info.staleDisabled} stale items.`
  );
}

main().catch((e) => {
  console.error("Sync failed:", e);
  process.exit(1);
});
