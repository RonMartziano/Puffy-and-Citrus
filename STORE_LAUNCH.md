# Puffy & Citrus — Launch Runbook (iOS App Store + Google Play)

This is the full path from "code on disk" to "live in both stores." It uses **Expo EAS**, which
builds your iOS and Android apps in the cloud (no Mac required) and submits them for you.

Things only **you** can do (they need your identity, money, or login): enrolling in the developer
programs, paying fees, approving credentials, and pressing the final "Submit for review" button.
Everything else is prepared for you in this repo.

Legend: 🧑 = you do it · 💻 = a terminal command · ⏱️ = typical wait.

---

## 0. One-time prerequisites

1. 🧑 Install **Node.js 20+** and confirm: 💻 `node -v`
2. 🧑 Create a free **Expo account** at https://expo.dev (this runs your builds).
3. 💻 Install the EAS CLI: `npm install -g eas-cli` then `eas login`.
4. 💻 From `expo-app/`, install deps once: `npm install`.

---

## 1. Enroll in the developer programs 🧑💳

You can do these in parallel; approval can take a day or two, so start now.

### Apple — Apple Developer Program ($99/year)
1. Go to https://developer.apple.com/programs/enroll/
2. Sign in with an Apple ID (turn on two-factor auth first).
3. Enroll as an **Individual** (simplest) or **Organization** (needs a D-U-N-S number, ~1–2 weeks).
4. Pay $99. ⏱️ Approval is usually minutes–48h.
5. Then open **App Store Connect** (https://appstoreconnect.apple.com) — this is where the listing lives.

### Google — Play Console ($25 one-time)
1. Go to https://play.google.com/console/signup
2. Choose a **Personal** developer account, complete identity verification (ID + address; Google now
   requires this — ⏱️ can take a few days).
3. Pay $25 once. Done forever.

> While you wait for approvals, do sections 2–4 — they don't need the accounts.

---

## 2. Link the project to EAS 💻

From `expo-app/`:

```bash
eas init            # creates the project on expo.dev and writes extra.eas.projectId into app.json
eas build:configure # confirms eas.json (already set up in this repo)
```

`eas init` is what fills in your unique project ID. Commit the change.

---

## 3. Build the apps (cloud, no Mac needed) 💻 ⏱️ ~15–25 min each

Always rebuild the game bundle first (the `prestart`/build scripts already do this, but to be safe):

```bash
npm run build:html         # regenerates gameHtml.js from ../index.html
```

Then:

```bash
eas build --platform android --profile production   # produces an .aab for Play
eas build --platform ios     --profile production   # produces an .ipa for the App Store
```

- The **first iOS build** will ask to create signing credentials — say **yes**, let EAS manage them
  (it creates your distribution certificate & provisioning profile for you).
- The **first Android build** will offer to generate an upload keystore — say **yes**, let EAS manage it.
  ⚠️ Don't lose it; EAS keeps it, but you can back it up with `eas credentials`.

When each build finishes, EAS gives you a download link and stores the artifact.

---

## 4. Create the store records & fill the listing 🧑

Use **`STORE_LISTING.md`** in this repo for every field, and **`privacy.html`** (host it at
`https://bellepepper.org/privacy.html`).

### App Store Connect (Apple)
1. **My Apps → + → New App.** Platform iOS, name `Puffy & Citrus`, primary language English,
   bundle ID `com.puffycitrus.app` (pick it from the dropdown — it appears after your first iOS build),
   SKU `puffycitrus001`.
2. Fill **App Information** (category, privacy policy URL), **Pricing** (Free), **App Privacy**
   (use STORE_LISTING §5), and the **version page** (description, keywords, promo text, screenshots,
   support URL).
3. Upload **iPhone 6.7"** screenshots (and iPad if `supportsTablet` stays true).

### Play Console (Google)
1. **Create app** → name, language, **App** (not game-without-account... pick *App or Game → Game*),
   Free.
2. Complete the left-nav checklist: **Store listing** (STORE_LISTING §1–3 + graphics),
   **Content rating** (§4 questionnaire), **Data safety** (§6), **Privacy policy URL**,
   **Target audience** (13+; not "designed for children"), **Ads** = *No ads*.
3. Upload the **feature graphic** (`store-assets/play-feature-1024x500.png`) and **512 icon**
   (`store-assets/play-icon-512.png`) and phone screenshots.

---

## 5. Test before the public sees it 🧑 (strongly recommended)

- **iOS / TestFlight:** `eas submit -p ios` (see §7) pushes the build to TestFlight automatically;
  install **TestFlight** on your iPhone and play your real build.
- **Android / Internal testing:** in Play Console create an **Internal testing** release, upload the
  `.aab` (or `eas submit`), add your email as a tester, install via the opt-in link.

Play through: hatch → care → grow up → ascension energy fills → a chapter completes. Confirm sound,
haptics, and that progress survives a force-close.

---

## 6. Screenshots (capture from the real build) 🧑

The stores want real in-app screenshots at exact sizes:

| Device | Size (px) | Required? |
|---|---|---|
| iPhone 6.7" | 1290 × 2796 | Yes (Apple) |
| iPad 12.9" | 2048 × 2732 | Only if `supportsTablet:true` |
| Android phone | 1080 × 1920 | Yes (Google), 2–8 images |

Easiest: run the app on a simulator/device and screenshot the **Home**, **a chapter of Belle's
Story**, the **Collection/pet-dex**, **Garden/cooking**, and the **Ascension** screen. (I can also
auto-capture these from the deployed web build at exact device sizes once you redeploy the new
version — just ask.)

---

## 7. Submit for review 🧑💻

First, open `expo-app/eas.json` and replace the placeholders under `submit.production`:
`appleId`, `ascAppId` (the numeric Apple ID of the app record), `appleTeamId`, and for Android the
`serviceAccountKeyPath` (download a service-account JSON from Play Console → API access).

```bash
eas submit --platform ios     --profile production
eas submit --platform android --profile production
```

- **Apple:** the build appears in App Store Connect → attach it to your version → **Submit for Review.**
  ⏱️ Review is typically 24–48h.
- **Google note:** the **very first** Android release must be uploaded **manually** in the Play
  Console (Google requires the first AAB through the UI); after that, `eas submit` works for updates.
  ⏱️ First review can take a few days.

---

## 8. ⚠️ The one real risk: Apple Guideline 4.2 ("minimum functionality")

Apple sometimes rejects apps that are "just a website in a wrapper." Puffy & Citrus is in good shape
because it **works fully offline**, stores data natively, has sounds/haptics, and isn't a repackaged
site. To stay safe:

- In the review notes, state: *"Fully offline single-player game; the web layer is the game engine
  bundled in the app, not a remote website."*
- Keep the app working with no network (it does).
- If they push back, the cleanest hardening is to add one or two native touches (e.g. native push
  reminders, native share) — ask me and I'll wire it in. Google has no equivalent concern.

---

## 9. Shipping updates later 💻

1. Edit the game (`index.html`), then `npm run build:html`.
2. Bump `version` in `app.json` (e.g. `1.0.1`). `autoIncrement` handles the build number.
3. `eas build -p android -p ios --profile production` then `eas submit` for each.
4. Add a "What's New" note. (For pure JS/HTML tweaks you can later adopt **EAS Update** for instant
   over-the-air updates without a store review — ask me to set it up.)

---

## 10. Foundation for ads later (when you're ready) 💰

You chose free-now, ads-later. Here's the clean path — **don't add these until you actually want ads**,
because they add review and privacy obligations:

1. **SDK:** `npx expo install react-native-google-mobile-ads` (AdMob). Add your AdMob app IDs to
   `app.json` under its config plugin.
2. **Where ads fit the cozy tone:** a single *optional, rewarded* ad (e.g. "watch for a bonus coin
   chest") and/or a tasteful interstitial only between sessions — **never** mid-care or timer-gated.
   This keeps the Royal-Match-style "respectful monetization" we discussed.
3. **iOS:** add an **App Tracking Transparency** prompt + `NSUserTrackingUsageDescription`, or run
   non-personalized ads to skip it.
4. **Compliance to update when ads go live:**
   - Privacy policy: flip the "Advertising" section (text already drafted for this).
   - Apple App Privacy: declare the ad SDK's data + "Used to Track You" if personalized.
   - Play Data safety + the **Ads** declaration (set to "Contains ads").
   - Host an **`app-ads.txt`** at `bellepepper.org/app-ads.txt`.
5. Ping me and I'll implement the SDK, the rewarded-ad hook, the consent flow, and the doc updates.

---

## Quick reference — file map

| File | What it's for |
|---|---|
| `expo-app/app.json` | App identity, icons, permissions (already store-tuned) |
| `expo-app/eas.json` | Build + submit profiles (fill submit placeholders before §7) |
| `expo-app/App.js` | Native WebView wrapper (offline save, audio enabled) |
| `expo-app/gameHtml.js` | The bundled game (regenerate with `npm run build:html`) |
| `privacy.html` | Host at bellepepper.org/privacy.html — required by both stores |
| `STORE_LISTING.md` | Every text field, rating answer, and privacy/data-safety answer |
| `store-assets/` | Play 512 icon + feature graphic |
