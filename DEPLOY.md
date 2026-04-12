# Deploying adamreue.com

This repo has a two-part pipeline:

1. **Local watcher** — auto-commits + pushes on every file change
2. **GitHub Actions** — runs on every push to `main`, confirms the site is valid

---

## Quick Start

### 1. Start the file watcher (auto-push)

```bash
cd ~/claw/workspace/projects/adamreue-com
./scripts/watch-and-push.sh
```

This runs in the foreground. Leave it running while you edit.

> **Note:** If you see `inotifywait not found`, run:
> ```bash
> sudo apt-get install inotify-tools
> ```
> (If you don't have sudo password, ask Adam to install it once)

To stop the watcher: `Ctrl+C` or kill the process:
```bash
kill "$(cat scripts/watch-and-push.pid)"
```

### 2. Edit your files

Edit anything in `projects/adamreue-com/` — the watcher detects changes, waits 2 seconds for batching, then auto-commits and pushes. No manual action needed.

### 3. Wait for GitHub Pages

GitHub usually publishes within 30–60 seconds of a push. Check the **Actions** tab on the repo for status.

---

## Manual Publish (no file changes needed)

If you want to force a deployment refresh (e.g., to test that GitHub Pages picks up correctly):

```bash
cd ~/claw/workspace/projects/adamreue-com
./scripts/publish.sh
```

This creates a small timestamp file, commits it, pushes, then cleans up after itself.

---

## Checking Deploy Status

### GitHub Actions
1. Go to: https://github.com/mylegitches/adamreue-com/actions
2. You should see a green ✅ run for the latest commit

### GitHub Pages
1. Go to: https://github.com/mylegitches/adamreue-com/settings/pages
2. Confirm **Source** is set to **Deploy from a branch → main (root)**
3. Your live site: https://mylegitches.github.io/adamreue-com/

---

## Troubleshooting

### Push fails with "Permission denied"
```bash
ssh -T git@github.com
```
You should see `Hi mylegitches!`. If not, your SSH key may not be added to GitHub. Check: https://github.com/settings/keys

### Watcher not triggering
Check the log:
```bash
tail -f scripts/watch-and-push.log
```

### GitHub Pages not updating
Go to the repo **Actions** tab → click the latest run → check for errors. GitHub Pages sometimes takes 2–3 minutes on a fresh push.

---

## Workflow Summary

```
You edit a file
  → inotifywait detects change
    → 2-second debounce
      → git add . && git commit -m "Auto-push: <date>"
        → git push (SSH)
          → GitHub Actions fires
            → GitHub Pages deploys
              → Site is live at mylegitches.github.io/adamreue-com/
```
