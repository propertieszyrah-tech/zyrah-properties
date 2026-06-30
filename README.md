# Zyrah Properties — Land Listing Website

A fast, mobile-first real-estate website for selling plots/land, built with **React + Vite + Tailwind CSS** and **Framer Motion** animations. Designed to be edited and deployed by non-developers.

---

## ✨ Features

- Mobile-first, responsive, premium design (calm green/earth palette + gold accent)
- Home page: hero, search + filters, animated land-card grid, About, Contact (with form)
- Per-listing detail pages: image gallery, full specs, embedded Google Map, WhatsApp/Call CTAs, share
- All listings live in **one editable file** — no coding required to add/edit/remove plots
- Polished animations (entrance, scroll reveals, hover, page transitions, counters, skeletons) that **respect "reduce motion"**
- Floating WhatsApp button + click-to-call on every page
- Basic SEO (titles, meta descriptions, alt text) and a Share button on each plot

---

## 🚀 Getting started (run locally)

You need **Node.js 18+** installed. Then, in this folder:

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the dev server — open the printed http://localhost:5173
```

To create the production build:

```bash
npm run build    # outputs the static site into the /dist folder
npm run preview  # preview that production build locally
```

---

## 📝 How to add / edit / remove a land listing

**Everything lives in [`src/data/lands.js`](src/data/lands.js).** Open it in any text editor.

### Add a new plot
1. Copy one existing `{ ... }` block (from the opening `{` to the closing `},`).
2. Paste it as a new item in the `lands` array.
3. Edit the values. **Give it a unique `id`** (e.g. `'zp-005'`).
4. Save. The new card appears automatically.

### Mark a plot as Sold / Under Offer
Change its `status` field:
```js
status: 'Available',   // options: 'Available' | 'Under Offer' | 'Sold'
```

### Remove a plot
Delete its entire `{ ... }` block (including the trailing comma).

### 📸 Adding photos to a plot (step-by-step)

Every plot has an `images: [ ... ]` list. The **first** photo is the cover shown on
the card; the rest appear in the gallery on the detail page. You can add as many as
you like. There are **two ways** to add photos — pick whichever is easier for you.

#### Way 1 — Use your own photo files (recommended)
1. Open the project folder and find the **`public`** folder
   (`/Users/msayednasooha/Desktop/car website/public`).
2. Create a folder inside it called **`plots`** (do this once).
3. **Drag your photos** into `public/plots`. Rename them simply — no spaces, all
   lowercase, e.g. `plot1-cover.jpg`, `plot1-2.jpg`, `plot1-3.jpg`.
4. In [`src/data/lands.js`](src/data/lands.js), reference them with a leading slash
   (the word `public` is **not** included in the path):
   ```js
   images: [
     '/plots/plot1-cover.jpg',  // first = cover photo on the card
     '/plots/plot1-2.jpg',
     '/plots/plot1-3.jpg',
   ],
   ```
5. Save. Done — the photos appear immediately.

> ✅ Tips: use **JPG** files, keep each photo under ~500 KB if you can (resize large
> phone photos so the site stays fast), and aim for a landscape (wide) shape.

#### Way 2 — Use a photo link from the internet
If your photo is already online (e.g. you uploaded it to a free image host like
[imgbb.com](https://imgbb.com) or [postimages.org](https://postimages.org)), just
paste its **direct image URL** (it should end in `.jpg`/`.png`):
```js
images: [
  'https://i.ibb.co/abc123/plot1.jpg',
  'https://i.ibb.co/def456/plot1-2.jpg',
],
```

#### Example — 3 plots, each with photos
```js
export const lands = [
  { id: 'zp-001', title: 'Plot near OMR', /* …other fields… */
    images: ['/plots/omr-cover.jpg', '/plots/omr-2.jpg', '/plots/omr-3.jpg'] },

  { id: 'zp-002', title: 'Farm land Tiruvallur', /* …other fields… */
    images: ['/plots/farm-cover.jpg', '/plots/farm-2.jpg'] },

  { id: 'zp-003', title: 'Commercial plot Coimbatore', /* …other fields… */
    images: ['/plots/comm-cover.jpg'] },   // even one photo is fine
]
```

Each listing supports these fields (all explained with comments at the top of the file):

```
id, title, type, status, location{area,city,district,state}, price, priceLabel,
size{cents,acres,sqft}, dimensions, facing, roadAccess, surveyNumber, patta,
approval, latitude, longitude, nearby[], description, images[]
```

> The **Google Map** on each detail page is generated automatically from the
> `latitude` and `longitude` you provide — no API key needed.

---

## ☎️ How to change your contact numbers & details

Open [`src/data/site.js`](src/data/site.js) and edit the values near the top:

```js
phoneDisplay: '+91 90477 12786',   // how the number is shown
phoneDial:    '919047712786',      // digits + country code (for the Call button)

whatsappDisplay: '+91 90477 12786',
whatsappNumber:  '919047712786',   // main WhatsApp button → Mohamed Gani

email:   'propertieszyrah@gmail.com',
address: '33, 1st Floor, Ranganathan St, C. Pallavaram, Chennai - 600043',
instagram: 'https://www.instagram.com/zyrah_properties...',
```

> **WhatsApp number format matters:** use only digits with the country code,
> e.g. India `919047712786`. No `+`, spaces, or dashes.

**Both team members** are in the `agents: [ ... ]` list lower in the same file —
edit a name, role, phone, or WhatsApp number there, or copy a block to add a person.

You can also edit the business **tagline**, the **About Us** text, and the homepage
**stats** (e.g. "120+ Plots Sold", "20+ Years Experience") in this same file.

---

## 🌐 How to launch the site — all the FREE ways

This is a static site: `npm run build` creates a `/dist` folder, and that folder can
be hosted **free, forever** on any of the services below. They all give you a free
web address (e.g. `zyrah-properties.netlify.app`) and free HTTPS. You can connect
your own domain later if you buy one.

### ⭐ Easiest: Netlify Drag-and-Drop (no account signup hassle, no GitHub)
1. In Terminal, build the site:
   ```bash
   npm run build
   ```
2. Go to **https://app.netlify.com/drop**
3. **Drag the `dist` folder** from the project into the page.
4. That's it — Netlify gives you a live URL in seconds. ✅
   (To update later: run `npm run build` again and drag the new `dist` in, or claim
   the site to a free account to manage it.)

> A `netlify.toml` is already included so clicking a plot and refreshing works correctly.

### ⭐ Best long-term: Connect GitHub → auto-deploy on every edit
Once set up, every time you change `lands.js` (e.g. add a plot) and push it, the site
updates itself automatically. Pick **one** host:

**Netlify**
1. Put the project on GitHub (free) — see "Putting it on GitHub" below.
2. At **app.netlify.com** → *Add new site → Import from GitHub* → pick the repo.
3. It auto-detects: build command `npm run build`, publish directory `dist`. Click **Deploy**.

**Vercel**
1. Project on GitHub (same as above).
2. At **vercel.com** → *Add New → Project* → import the repo.
3. Framework preset **Vite** is auto-selected → **Deploy**. (A `vercel.json` is included.)

**Cloudflare Pages**
1. Project on GitHub.
2. At **pages.cloudflare.com** → *Create a project* → connect the repo.
3. Build command `npm run build`, output directory `dist` → **Save and Deploy**.

All three are free for a site like this.

### Putting it on GitHub (one-time, needed for auto-deploy)
1. Create a free account at **github.com** and click *New repository* (name it
   `zyrah-properties`, keep it Public or Private).
2. In Terminal, from the project folder:
   ```bash
   git init
   git add .
   git commit -m "Initial Zyrah Properties site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/zyrah-properties.git
   git push -u origin main
   ```
3. To publish a future change (e.g. after adding a plot):
   ```bash
   git add .
   git commit -m "Add new plots"
   git push
   ```
   The connected host (Netlify/Vercel/Cloudflare) rebuilds automatically.

### Comparison
| Service | Free address | Auto-deploy on edit | Setup effort |
|---|---|---|---|
| **Netlify drag-drop** | ✅ `*.netlify.app` | ❌ (re-drag to update) | Lowest |
| **Netlify + GitHub** | ✅ `*.netlify.app` | ✅ | Low |
| **Vercel + GitHub** | ✅ `*.vercel.app` | ✅ | Low |
| **Cloudflare Pages** | ✅ `*.pages.dev` | ✅ | Low |

> **Custom domain (optional):** if you buy a domain like `zyrahproperties.in`, all of
> the above let you connect it for free in their dashboard (you only pay the domain
> registrar, ~₹700–₹1000/year).

## 📬 Contact form — where submissions go

When a visitor fills the form and taps **"Send on WhatsApp"**, it **opens WhatsApp to
Mohamed Gani** with their name, phone, and message pre-filled — the lead lands in your
WhatsApp chat as soon as they tap send. This works with **zero setup**.

### Optional: also get an emailed copy (free, ~5 minutes)
Turn on an email backup so every enquiry is **also** emailed to
`propertieszyrah@gmail.com`:

1. Go to **https://web3forms.com** and enter `propertieszyrah@gmail.com`.
2. They email you a **free Access Key** (a long code). Copy it.
3. Open [`src/data/site.js`](src/data/site.js) and paste it here:
   ```js
   web3formsKey: 'paste-your-access-key-here',
   ```
4. Save. Done — from now on each form submission opens WhatsApp **and** sends you an
   email copy. (Free for ~250 submissions/month.)

If you leave `web3formsKey: ''` empty, the form simply stays WhatsApp-only.

---

## 🎨 Design system

Generated with the `ui-ux-pro-max` design intelligence:
- **Palette:** trust teal/green (`brand`) + earthy gold accent (`gold`) on a warm cream background — defined in [`tailwind.config.js`](tailwind.config.js).
- **Type:** *Cinzel* (luxury display headings) + *Plus Jakarta Sans* (UI/body).
- **Motion:** all animations honor the OS "Reduce Motion" setting via Framer Motion's `MotionConfig`.

To re-theme, edit the `colors` in `tailwind.config.js`.

---

## 📁 Project structure

```
src/
  data/
    site.js          ← your contact info, About text, stats   (EDIT THIS)
    lands.js         ← your land listings                      (EDIT THIS)
  lib/utils.js       ← formatting + WhatsApp/Call link helpers
  animations/        ← shared Framer Motion variants
  components/        ← Header, Footer, Hero, LandCard, ImageGallery, etc.
  pages/             ← HomePage, LandDetailPage, NotFound
  App.jsx            ← routes + page transitions
  main.jsx           ← app entry
```

---

© Zyrah Properties
