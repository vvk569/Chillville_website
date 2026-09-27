/**
 * Tracks whether the user has navigated within the app during this page-load
 * session. "Back to Chillville" uses this to decide between a true history
 * back (which restores the exact section/scroll they came from) and a plain
 * push to the homepage (when the detail page was opened directly / deep-linked
 * and there is no in-app entry to return to).
 */
let internalNavCount = 0;

export function markInternalNav(): void {
  internalNavCount += 1;
}

export function canGoBackInApp(): boolean {
  return internalNavCount > 0;
}
