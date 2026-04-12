#!/usr/bin/env bash
# watch-and-push.sh — Watch for file changes and auto-commit/push to GitHub
# Usage: ./scripts/watch-and-push.sh
# Stop:  kill "$(cat scripts/watch-and-push.pid)"  (or ctrl-c if running in foreground)

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
INOTIFY_BIN="${INOTIFY_BIN:-/tmp/inotify-extract/usr/bin/inotifywait}"
PID_FILE="$REPO_DIR/scripts/watch-and-push.pid"
LOG_FILE="$REPO_DIR/scripts/watch-and-push.log"

# Check for inotifywait
if [ ! -x "$INOTIFY_BIN" ]; then
  echo "ERROR: inotifywait not found at $INOTIFY_BIN" >&2
  echo "Install with: sudo apt-get install inotify-tools" >&2
  exit 1
fi

# Check we're in a git repo
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "ERROR: $REPO_DIR is not a git repository" >&2
  exit 1
fi

cd "$REPO_DIR"

# Check for uncommitted submodules or sparse-checkout issues
echo "[$(date)] Watcher started — watching $REPO_DIR" >> "$LOG_FILE"

# Track the PID so we can kill it later
echo $$ > "$PID_FILE"

# shellcheck disable=SC2016
"$INOTIFY_BIN" -m -r \
  --exclude '\.git/' \
  --exclude '\.git$' \
  --exclude 'watch-and-push\.log' \
  --exclude 'watch-and-push\.pid' \
  -e modify,create,delete,move "$REPO_DIR" \
  | while read -r _; do
      sleep 2  # debounce rapid changes
      echo "[$(date)] Change detected — committing and pushing" >> "$LOG_FILE"
      git -C "$REPO_DIR" add .
      if git -C "$REPO_DIR" diff --staged --quiet; then
        echo "[$(date)] No changes to commit" >> "$LOG_FILE"
      else
        git -C "$REPO_DIR" commit -m "Auto-push: $(date)"
        if git -C "$REPO_DIR" push; then
          echo "[$(date)] Pushed successfully" >> "$LOG_FILE"
        else
          echo "[$(date)] PUSH FAILED — check git auth and try manually" >> "$LOG_FILE" >&2
        fi
      fi
    done
