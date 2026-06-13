# Puffy & Citrus 🐡🍊 — a Tamaguchi game

A cute, full-featured virtual-pet game made with 💚 for Belle Pepper.
Raise two pets — Puffy the pufferfish and Citrus the orange — feed them, play
mini-games, keep them happy, and watch them evolve into very different grown-up
forms depending on how well you care for them.

The whole game is a single file: **`index.html`** (no build step, runs anywhere).

## Features

- Two pets with independent stats: hunger, happiness, energy, hygiene, health.
- Branching evolution: egg → baby → child → teen → one of **four** adult forms
  per pet, decided by your care grade (S/A/C/D). Great care → a Star Puffer or a
  Blossom Tree; neglect → a Blobfish or a Sour Lemon.
- Name each pet on hatch, and celebrate a birthday every in-game day.
- Levels & XP, daily quests, and daily login bonuses.
- Three mini-games: Bubble Snack, Memory Match, and Whack-a-Snack.
- A shop with foods, medicine, soap, buyable **scenes** (backgrounds) and **hats**.
- Seasons (auto from the real date), changing weather, and random events.
- Sweet notes from Belle, a Bell Pepper favorite food, a Pepper Hat, and a
  "Belle's Kitchen" scene. 💌
- Sound effects, sickness & medicine, poop to clean, and a day/night cycle.
- Saves automatically (browser `localStorage`; device storage in the phone app)
  and catches up your pets' stats for the time you were away.

## Play in a browser

Double-click `index.html`. That's it.

## Play on your phone (Expo Go, before hosting)

See [`expo-app/README.md`](expo-app/README.md). Short version:

```bash
cd expo-app
npm install
npx expo install react-native-webview @react-native-async-storage/async-storage
npx expo start    # scan the QR code with the Expo Go app
```

## Host on GitHub Pages

A workflow is already included at `.github/workflows/deploy.yml`. It publishes
the repo automatically on every push to `main`, serving `index.html` at your
Pages URL.

### First-time repo setup

```bash
cd <this Tamaguchi folder>
git init
git add .
git commit -m "Puffy & Citrus tamaguchi game"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

Then, on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The next push (or re-run the action) deploys it. Your game will be live at
`https://<your-username>.github.io/<your-repo>/`.

> The `expo-app/` folder is harmless to host but isn't needed for the website —
> GitHub Pages just serves `index.html`.
