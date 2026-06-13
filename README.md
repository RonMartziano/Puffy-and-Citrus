# Puffy & Citrus 🐡🍊

A cute browser-based virtual pet game. Raise two pets — Puffy the pufferfish and
Citrus the orange — feed them, play, and watch them grow into one of six adult
forms each, depending on how well you care for them.

The whole game is a single file, `index.html` — no build step, runs anywhere.
Made with 💚 for Belle Pepper.

## Features

- Two pets with their own stats: hunger, happiness, energy, hygiene, health.
- Branching evolution (egg → baby → child → teen → adult) with **six** adult
  forms per pet based on your care grade — from Cosmic Puffer / Golden Orchard
  down to Blobfish / Sour Lemon.
- Story cutscenes: an intro and an animated reveal on every evolution.
- Three mini-games, fishing, a garden, a daily prize wheel, and tricks.
- Friendship bond between the pets, daily quests, levels, achievements, a
  sticker album, and a collection log of every form you've discovered.
- Shop with foods, scenes, and hats. Seasons, weather, and day/night.
- Optional cloud saves + login (Supabase) so progress follows you anywhere.

## Play

Open `index.html` in any browser. Progress saves automatically.

On a phone: host it (below) and "Add to Home Screen", or run it through Expo Go —
see [`expo-app/`](expo-app/README.md).

## Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "Puffy & Citrus"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Source: GitHub Actions**. The included
workflow deploys on every push to `main`; your game goes live at
`https://<you>.github.io/<repo>/`.

## Cloud saves (optional)

Skip this and the game still works — it just saves locally. To sync across
devices with a username/password login:

1. **Database** — in Supabase: SQL Editor → run [`supabase_setup.sql`](supabase_setup.sql).
2. **Auth** — Authentication → Email: turn **off** "Confirm email".
3. **Keys** — add two repo secrets (Settings → Secrets and variables → Actions):

   | Secret | Where to find it |
   |---|---|
   | `SUPABASE_URL` | Project Settings → API → Project URL |
   | `SUPABASE_ANON_KEY` | Project Settings → API → `anon` `public` key |

The anon key is safe to expose in a browser — Row Level Security protects each
player's data. For local testing, copy `config.example.js` to `config.js`.

## Project structure

```
index.html            the game
config.example.js     template for local Supabase keys
supabase_setup.sql    database + security setup
expo-app/             optional Expo Go wrapper for phones
.github/workflows/    GitHub Pages deploy
```
