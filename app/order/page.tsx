import { redirect } from "next/navigation";
import { orderUrl } from "@/lib/data";

/**
 * Ordering now lives on Toast Online Ordering (the source of truth for menu,
 * prices, modifiers and payment). The site links out to it, so any visit to
 * /order — old links, bookmarks, the sitemap — is sent straight there.
 */
export default function OrderPage() {
  redirect(orderUrl);
}
