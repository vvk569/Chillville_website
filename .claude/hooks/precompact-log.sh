#!/usr/bin/env bash
# PreCompact hook — drop a breadcrumb before compaction so the exact state at
# each compaction is recoverable from .claude/session-log.md (untracked).
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
log=".claude/session-log.md"

{
  printf '\n## %s — pre-compact\n' "$(date '+%Y-%m-%d %H:%M:%S')"
  printf -- '- HEAD: %s\n' "$(git log -1 --pretty='%h %s' 2>/dev/null)"
  printf -- '- Branch: %s | Sync: %s\n' \
    "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" \
    "$(git rev-list --left-right --count origin/main...HEAD 2>/dev/null | awk '{print $2" ahead, "$1" behind"}')"
  changed=$(git status --short 2>/dev/null | grep -v 'DS_Store')
  if [ -n "$changed" ]; then
    printf -- '- Uncommitted:\n'
    printf '%s\n' "$changed" | sed 's/^/    /'
  else
    printf -- '- Uncommitted: (clean)\n'
  fi
} >> "$log" 2>/dev/null || true

exit 0
