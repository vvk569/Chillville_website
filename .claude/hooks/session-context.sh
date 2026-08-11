#!/usr/bin/env bash
# SessionStart hook — inject live git state so each new/resumed/post-compaction
# session is oriented without re-deriving it. Output is JSON additionalContext.
cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
command -v jq >/dev/null 2>&1 || exit 0

branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
head=$(git log -1 --pretty='%h %s' 2>/dev/null)
sync=$(git rev-list --left-right --count origin/main...HEAD 2>/dev/null | awk '{print $2" ahead, "$1" behind origin/main"}')
status=$(git status --short 2>/dev/null | grep -v 'DS_Store' | head -20)
recent=$(git log -8 --pretty='  %h %an  %s' 2>/dev/null)

ctx=$(printf 'Chillville — live git state at session start (read CLAUDE.md for conventions):\nBranch: %s\nHEAD: %s\nSync: %s\n\nUncommitted (excl. DS_Store):\n%s\n\nRecent commits:\n%s' \
  "${branch:-?}" "${head:-?}" "${sync:-n/a}" "${status:-  (clean)}" "${recent:-  (none)}")

jq -n --arg ctx "$ctx" '{hookSpecificOutput:{hookEventName:"SessionStart",additionalContext:$ctx}}'
