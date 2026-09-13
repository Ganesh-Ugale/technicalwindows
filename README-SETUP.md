# Technical Windows — Setup Guide

Everything below is a one-time setup. After this, publishing a new video is just: open `admin/admin.html` on your PC → fill in the card → click Publish.

---

## 1. Put the site on GitHub

1. Create a free account at github.com if you don't have one.
2. Create a **new repository** — name it `technicalwindows` (any name works, just remember it). Keep it **Public** (required for free GitHub Pages on a custom domain).
3. Upload every file **except the `admin` folder** to this repo:
   - `index.html`, `videos.html`, `about.html`, `contact.html`, `privacy.html`
   - `css/`, `js/`, `robots.txt`, `sitemap.xml`, `ads.txt`
   - Easiest way: on the repo page, click **Add file → Upload files**, drag everything in, commit.
4. Keep the `admin/` folder **only on your PC** — do not upload it to this repo (or to any public place).

## 2. Turn on GitHub Pages

1. In your repo, go to **Settings → Pages**.
2. Under "Build and deployment", set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. Within a minute or two your site is live at `https://YOUR-USERNAME.github.io/technicalwindows/`.

## 3. Buy the domain

1. Buy `technicalwindows.com` from a registrar — Namecheap or Hostinger are both easy for beginners.
2. In your registrar's **DNS settings** for the domain, add:
   - Four **A records** for the root domain (`@`) pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - One **CNAME record** for `www` pointing to `YOUR-USERNAME.github.io`
3. Back in GitHub: **Settings → Pages → Custom domain** → enter `technicalwindows.com` → Save. Wait for the DNS check to pass, then tick **Enforce HTTPS**.
4. DNS can take a few hours (sometimes up to 48h) to fully propagate worldwide — this is normal.

## 4. Verify the domain with Google (for ranking + AdSense)

1. Go to [Google Search Console](https://search.google.com/search-console) → Add property → **Domain** → enter `technicalwindows.com`.
2. Google gives you a TXT record — add it in your registrar's DNS settings (same place as step 3).
3. Once verified, submit your sitemap: `https://technicalwindows.com/sitemap.xml`.

## 5. Set up the Admin Page (no login screen, GitHub-secured)

1. On GitHub, go to **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Give it a name like "Technical Windows Admin", set expiration (90 days or 1 year — you'll just regenerate when it expires), and under **Repository access** choose **Only select repositories** → pick your `technicalwindows` repo.
3. Under **Permissions → Repository permissions**, set **Contents** to **Read and write**. Leave everything else as "No access".
4. Generate the token and copy it immediately (GitHub only shows it once).
5. Open `admin/admin.html` on your PC (just double-click the file).
6. Open **Connection settings**, paste in the token, your GitHub username, repo name (`technicalwindows`), branch (`main`), and data file path (`js/data.js`). Click **Save settings**, then **Test connection**.

You're set. From now on: fill the card in the admin page → **Publish to live site** → it's live in about a minute.

**Keep `admin.html` private** — anyone with it and your token could edit your site. Don't upload it anywhere, don't screen-share it, don't email it to anyone.

## 6. Google AdSense

1. Apply at [google.com/adsense](https://www.google.com/adsense) once your site has some real traffic and all pages (including Privacy Policy) are live.
2. When approved, AdSense gives you a **publisher ID** (`pub-XXXXXXXXXXXXXXXX`) and an ad snippet.
3. Open `ads.txt` in your repo and replace the placeholder ID with your real one.
4. Add the AdSense script snippet Google gives you into each page's `<head>` (I can do this for you once you have the code — just share it).

## Notes on "running it offline on your PC"

The main website itself needs to be hosted somewhere reachable (GitHub Pages) for other people to see it — that part can't be fully offline. What **can** stay entirely on your PC is the Admin Page: you never host it, you just open the file locally whenever you want to publish something, and it pushes straight to your live site using your private token.
