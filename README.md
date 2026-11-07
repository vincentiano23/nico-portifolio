# Nicholas Mwangi — Plumbing Portfolio

A modern, responsive portfolio website for **Nicholas Mwangi**, a licensed plumber.
Built with plain **HTML, CSS, and JavaScript** — no frameworks, no build step —
ready to deploy on **Vercel** (free tier) in under 5 minutes.

---

## ✨ Features

- **Fully responsive** — looks great on phone, tablet, and desktop
- **Dark navy + copper accent** design — premium and on-brand for plumbing
- **Hero section** with animated stat counters (years, jobs, satisfaction, 24/7)
- **About** section with portrait, license number, and trust badges
- **Services** grid with 8 service cards (leaks, bathroom, heaters, drainage, etc.)
- **Filterable photo gallery** with lightbox (keyboard arrows, ESC to close)
- **Video portfolio** — featured video + 4 thumbnails that open in a modal
- **Testimonials** carousel from happy clients
- **Contact form** that opens WhatsApp with all details pre-filled (no backend needed)
- **Floating WhatsApp button** + scroll-to-top
- **SEO-ready**: meta description, Open Graph tags, semantic HTML
- **Accessibility**: ARIA labels, keyboard nav, reduced-motion support

---

## 📁 Project Structure

```
nicholas-portfolio/
├── index.html              ← main page (all sections)
├── vercel.json             ← Vercel config (caching, headers)
├── README.md               ← this file
├── css/
│   └── styles.css          ← all styles
├── js/
│   └── main.js             ← all interactivity
├── images/                 ← placeholder images (replace with Nicholas's real photos)
│   ├── hero-plumber.jpg
│   ├── about-portrait.jpg
│   ├── work-1.jpg ... work-6.jpg
│   └── gallery-1.jpg ... gallery-3.jpg
└── videos/                 ← put Nicholas's video clips here (currently empty)
    ├── showreel.mp4         ← (create this)
    ├── leak-fix.mp4
    ├── heater-install.mp4
    ├── drain-unblock.mp4
    └── bathroom-pipe.mp4
```

---

## 🚀 Deploy to Vercel (3 ways)

### Option A — Drag & Drop (fastest, no GitHub needed)

1. Go to **https://vercel.com/new** and sign in (free with GitHub/email).
2. Click **"Browse all templates"** → scroll to **"Other"** → choose **Deploy without code**,
   OR simply drag the entire `nicholas-portfolio` folder onto the Vercel dashboard.
3. Wait ~30 seconds. Vercel gives you a URL like `nicholas-plumbing.vercel.app`.

### Option B — GitHub (recommended, auto re-deploys on every commit)

1. Create a free GitHub account if you don't have one.
2. Create a new repository, e.g. `nicholas-plumbing`.
3. Upload all files in this folder to the repo (or use `git push`):
   ```bash
   cd nicholas-portfolio
   git init
   git add .
   git commit -m "Initial plumbing portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/nicholas-plumbing.git
   git push -u origin main
   ```
4. Go to **https://vercel.com/new** → **Import Git Repository** → select your repo.
5. **Framework Preset:** *Other* (auto-detected). **Build Command:** leave empty. **Output Directory:** leave empty.
6. Click **Deploy**. Done — Vercel will rebuild automatically every time you push.

### Option C — Vercel CLI

```bash
npm install -g vercel
cd nicholas-portfolio
vercel          # follow prompts (link to a Vercel project)
vercel --prod   # deploy to production
```

---

## 🖼️ Replace Placeholder Images with Nicholas's Photos

The site currently uses stock plumbing images so it looks complete out of the box.
Swap them for Nicholas's real photos:

1. Open the `images/` folder.
2. Replace each file **with the same name** (so you don't need to edit any code):
   - `hero-plumber.jpg` — wide hero shot at the top of the page (recommended 1600×900 px)
   - `about-portrait.jpg` — portrait of Nicholas (recommended 800×1100 px, vertical)
   - `work-1.jpg` to `work-6.jpg` — gallery photos (recommended 800×600 px, landscape)
   - `gallery-1.jpg`, `gallery-2.jpg`, `gallery-3.jpg` — extra gallery photos
3. **Keep the JPG format** and the same filenames — that's it.

**Tip for images:** Keep each image under ~300 KB. Use https://tinypng.com to compress if needed.

---

## 🎥 Add Nicholas's Videos

Videos aren't included (so the file size stays small for Vercel). Here's how to add them:

1. Create the `videos/` folder if it doesn't exist (it already exists in this template).
2. Drop your video files in **MP4 format** with these exact names:
   - `showreel.mp4` — the featured video at the top of the video section
   - `leak-fix.mp4`, `heater-install.mp4`, `drain-unblock.mp4`, `bathroom-pipe.mp4` — thumbnails
3. Done. The code in `index.html` already points to those paths.

**Tip for videos:** Keep each clip under 50 MB. For longer clips, host them on YouTube
and replace the `<video>` tag in `index.html` with a YouTube `<iframe>` embed.

### To use a YouTube video instead

In `index.html`, find the `<video id="videoMain">` block and replace it with:

```html
<iframe
  width="100%" height="420"
  src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
  frameborder="0" allowfullscreen>
</iframe>
```

---

## ✏️ Easy Customisation Cheat-Sheet

| What you want to change | Where to edit |
|---|---|
| Nicholas's name, tagline, hero text | `index.html` → `<section class="hero">` |
| Phone number / WhatsApp / email | `index.html` (search for `+254 712 345 678`) AND `js/main.js` line ~155 (`waNumber`) |
| Service area, working hours | `index.html` → contact list |
| License number | `index.html` → search for `PL-0427` |
| Years of experience stat | `index.html` → `data-target="12"` |
| Number of jobs completed | `index.html` → `data-target="850"` |
| Testimonials (names, quotes) | `index.html` → `<section class="testimonials">` |
| Services list | `index.html` → `<section class="services">` |
| Brand colours | `css/styles.css` → `:root` variables at the top (e.g. `--copper-500`) |
| Social media links | `index.html` → search for `social-row` |

---

## 🛠️ Local Preview

You can open `index.html` directly in a browser, but for videos to load correctly,
run a tiny local server:

```bash
# Python (any version):
python3 -m http.server 8000

# Then open: http://localhost:8000
```

---

## 📞 Need a custom domain?

Vercel free tier lets you add a custom domain (e.g. `nicholas-plumbing.co.ke`) for free.

1. Buy the domain from any registrar (e.g. Namecheap, GoDaddy).
2. In Vercel dashboard → **Settings → Domains → Add** → enter your domain.
3. Follow Vercel's DNS instructions to point the domain to Vercel.
4. SSL is automatically provisioned — free.

---

## 📝 Tech Notes

- No build step — Vercel serves the files as-is.
- Fonts loaded from Google Fonts CDN (no need to host them).
- Form submissions are routed to WhatsApp — no backend or database required.
  Swap to Formspree / Vercel Serverless Function later if you want email delivery.
- All images lazy-loaded for fast first paint.
- Caching headers set in `vercel.json` for CSS / JS / images.

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript.
