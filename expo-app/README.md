# Puffy & Citrus — Expo Go app 🐡🍊

A tiny wrapper that runs the web game inside a native shell so you can play it on your
phone via **Expo Go** — no hosting needed yet. Progress is saved on the device with
AsyncStorage (swap in a backend later whenever you want).

## One-time setup (on your computer)

1. Install Node.js (LTS) if you don't have it: https://nodejs.org
2. Install the **Expo Go** app on your phone (App Store / Google Play).
3. In a terminal:

   This project targets **Expo SDK 55** (the latest *stable* SDK), which the
   public Expo Go from the app stores supports. (SDK 56 is still a beta and
   isn't in the store version of Expo Go yet — targeting it causes the
   "requires a newer version of Expo Go" error.)

   ```bash
   cd expo-app
   npm install
   ```

   > A `.npmrc` with `legacy-peer-deps=true` is included so `npm install`
   > won't choke on peer-dependency warnings.

   Then align every package to the exact versions your Expo Go expects:

   ```bash
   npx expo install --fix
   ```

   **If you already ran `npm install` for the old SDK**, clear it first:

   ```bash
   # Windows PowerShell:
   Remove-Item -Recurse -Force node_modules, package-lock.json
   # then:
   npm install
   npx expo install --fix
   ```

   Note: `npm start` automatically rebuilds `gameHtml.js` from `../index.html`
   first (via the `prestart` script), so the app always ships the latest game.

## Run it

```bash
npx expo start
```

A QR code appears in the terminal. Open **Expo Go** on your phone and scan it
(iPhone: scan with the Camera app; Android: scan from inside Expo Go).
Your phone and computer must be on the **same Wi-Fi**. If scanning fails on a
restricted network, run `npx expo start --tunnel`.

The game loads full-screen. Feed, play, clean, and care for both pets — progress
saves automatically and survives closing the app.

## How saving works

- The web game posts its full state to the native shell on every change.
- `App.js` writes that to AsyncStorage under the key `puffyCitrus_v1`.
- On launch, the saved state is injected back into the game before it boots.
- The same game file (`../index.html`) also runs standalone in any browser, where
  it saves to `localStorage` instead.

## Editing the game

The game itself lives in **`../index.html`** (single source of truth). After editing it,
regenerate the bundled copy used by the app:

```bash
# from the Tamaguchi folder
node -e "const fs=require('fs');fs.writeFileSync('expo-app/gameHtml.js','export default '+JSON.stringify(fs.readFileSync('index.html','utf8'))+';\n')"
```

## When you're ready to host online

Host `index.html` anywhere static (GitHub Pages, Netlify, Vercel). Then you can either
share the URL directly, or change `App.js` to `source={{ uri: 'https://your-url' }}`
and add a backend for cloud saves.
