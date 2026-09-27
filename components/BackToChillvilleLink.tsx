"use client";

import { useRouter } from "next/navigation";
import { canGoBackInApp } from "@/lib/nav-history";

/**
 * "Back to Chillville" control. A detail page (About, a menu category, …) is
 * opened from a homepage section and always starts at the top; clicking Back
 * should return the user to the exact section and scroll position they came
 * from — i.e. a real history back, which restores the previous scroll.
 *
 * Renders a real anchor to "/" so keyboard, middle-click and no-JS still work;
 * a plain left-click instead steps back in history. When there is no in-app
 * history to return to (a direct/deep link), it falls back to the homepage.
 */
export function BackToChillvilleLink({
  className,
  children,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Let modified clicks (open in new tab, etc.) use the real href.
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (canGoBackInApp()) router.back();
    else router.push("/");
  };

  return (
    // Real anchor to "/" for keyboard / middle-click / no-JS; a plain click
    // instead steps back in history to restore the previous scroll position.
    // eslint-disable-next-line @next/next/no-html-link-for-pages
    <a href="/" onClick={onClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
