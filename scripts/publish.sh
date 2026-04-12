#!/usr/bin/env bash
# publish.sh — One-shot manual publish to GitHub
# Use this to force a publish even if no files have changed
# (or to refresh the GitHub Pages deployment timestamp)

set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="origin"
BRANCH="main"

cd "$REPO_DIR"

if [ ! -d ".git" ]; then
  echo "ERROR: $REPO_DIR is not a git repository" >&2
  exit 1
fi

echo "Fetching latest..."
git fetch "$REMOTE"

STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Local changes detected — stashing..."
  git stash push -m "pre-publish-stash $(date)"
  STASHED=true
fi

# Touch a timestamp file to guarantee a diff
echo "Publishing at $(date)" > "$REPO_DIR/.publish-trigger"
git add .
git commit -m "Force-publish: $(date)" || {
  echo "Nothing to publish (no changes)"
  rm -f "$REPO_DIR/.publish-trigger"
  exit 0
}

if git push "$REMOTE" "$BRANCH"; then
  echo "Published successfully."
else
  echo "PUSH FAILED — check SSH auth and remote URL" >&2
  exit 1
fi

if $STASHED; then
  echo "Restashing local changes..."
  git stash pop
fi
