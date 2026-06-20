# Puffy & Citrus — Store Listing Pack

Everything you paste into App Store Connect (Apple) and Google Play Console.
Replace anything in **CAPS_PLACEHOLDER** form before submitting.

---

## 1. Names & short text

| Field | Value | Limit |
|---|---|---|
| App name (Apple) | `Puffy & Citrus` | 30 |
| App name (Google) | `Puffy & Citrus: Cozy Pet` | 30 |
| Subtitle (Apple) | `Raise a cozy little pet` | 30 |
| Short description (Google) | `Raise a cozy pufferfish & orange — feed, play, and unfold a gentle story.` | 80 |
| Promotional text (Apple, editable anytime) | `Two tiny friends are waiting. Care for them a little each day and watch a warm story bloom. 💛` | 170 |

> **Heads-up:** the bare name "Puffy & Citrus" may collide with another app. If Apple/Google
> rejects it as taken, fall back to `Puffy & Citrus: Cozy Pet`.

---

## 2. Keywords (Apple — one 100-char comma string, no spaces)

```
virtual pet,tamagotchi,cozy,cute,animal,care,raise,collect,relax,idle,fish,creature,island,kawaii
```

Google Play has no keyword field — it indexes the description, so the full description below
naturally works in those terms.

---

## 3. Full description (both stores)

```
Meet Puffy, a jittery little pufferfish, and Citrus, an aggressively cheerful orange. They
arrived in a box from a friend with one simple note: please don't let them become breakfast.

Puffy & Citrus is a cozy, slow-paced virtual pet you look after a little each day. Feed them,
clean up after them, tuck them in, and play together — and as you care, a gentle story unfolds
about two small lives and the islands of Tuvalu that inspired them.

🐡 RAISE & BOND
Care for two pets with their own moods, traits, and needs. Keep them happy and healthy and
they'll grow into rare, beautiful forms — over 70 to discover.

🍊 A STORY YOU UNFOLD BY CARING
Every chapter of Belle's Story opens as you look after your pets — warm, hand-written letters
and quiet moments, not a to-do list.

🌱 GENTLE THINGS TO DO
Grow a garden, cook little dishes, go fishing, play relaxing mini-games, decorate a home, and
collect forms in your pet-dex — all at your own pace.

🏝️ A REAL LITTLE HEART
Inspired by Tuvalu, one of the smallest, lowest-lying nations on Earth, and everyone who cares
for a fragile, beloved home.

💛 MADE TO BE KIND
No timers nagging you, no pressure, no ads. Just a soft, cozy place to come back to.

Play offline anytime, or create a free account to sync across devices and send little gifts to
friends.
```

---

## 4. Category & rating

| Field | Apple | Google |
|---|---|---|
| Primary category | Games → Simulation | Games → Simulation |
| Secondary category | Games → Casual | (n/a) |
| Age rating target | 4+ | Everyone |

### Apple age-rating questionnaire — answer **None / No** to everything
Cartoon/fantasy violence: None · Realistic violence: None · Sexual content: None · Profanity: None ·
Alcohol/drugs: None · Gambling: **None** (the in-game "Lucky Capsule" uses only in-game currency
with no real-money purchase, so it is **not** simulated gambling) · Horror: None ·
Unrestricted web access: **No** · Made for Kids: **No** (leave the Kids Category off — it keeps the
optional accounts simple).

### Google content rating (IARC questionnaire)
Category: Game. Violence: No. Sexuality: No. Language: No. Controlled substances: No.
Gambling: No (in-game currency only). Users interact / share content: **Yes** (optional Friends &
gifting) → results in **Everyone** with a "Users Interact" notice. Shares location: No.
Digital purchases: No.

---

## 5. Apple "App Privacy" labels (App Store Connect → App Privacy)

Set this up as: **Data is collected only if the player creates an optional account.**

- **Data used to track you:** None.
- **Data linked to you** (only when an account is created):
  - **Identifiers → User ID** — purpose: App Functionality. Linked: Yes.
  - **User Content → Other User Content** (game save / progress) — purpose: App Functionality. Linked: Yes.
- **Data not linked to you:** None.
- Everything else: **Not Collected** (no location, contacts, browsing, health, financial, ads).

If you ship the offline-only build with cloud sync disabled, you may instead select
**"Data Not Collected"** for the whole app.

---

## 6. Google Play "Data safety" form

- Does your app collect or share any required user data? **Yes** (because of the optional account).
- **Data collected** (mark each: collected = yes, shared = no, optional = yes, encrypted in transit = yes):
  - **User IDs** (the username) — purpose: Account management, App functionality.
  - **App activity / Other** (game progress save) — purpose: App functionality.
- **Data shared with third parties:** None. (Supabase is a processor/host, not a data sale or share.)
- Is all data encrypted in transit? **Yes.**
- Can users request data deletion? **Yes** — provide your support email (the deletion route in the
  privacy policy).
- Committed to Play Families policy / target children? **No** (general audience).

---

## 7. Required graphics

| Asset | Size | Status |
|---|---|---|
| App icon (Apple) | 1024×1024 PNG, no alpha | ✅ `expo-app/assets/icon.png` (EAS strips alpha) |
| App icon (Google Play listing) | 512×512 PNG | ✅ generated → `store-assets/play-icon-512.png` |
| Feature graphic (Google, **required**) | 1024×500 PNG | ✅ draft → `store-assets/play-feature-1024x500.png` (upgrade later if you like) |
| iPhone 6.7" screenshots (**required**) | 1290×2796 px, 2–10 images | ⏳ capture after redeploy (see runbook §6) |
| iPad 12.9" screenshots (**required because supportsTablet=true**) | 2048×2732 px | ⏳ or set `supportsTablet:false` to skip |
| Android phone screenshots (**required**) | 1080×1920 px, 2–8 images | ⏳ capture after redeploy |

> **Tip to cut work:** set `"supportsTablet": false` in `app.json` and you no longer owe Apple
> iPad screenshots. Recommended unless you specifically want iPad users.

---

## 8. Support & marketing URLs (both stores ask)

- Privacy Policy URL: `https://bellepepper.org/privacy.html` (host the `privacy.html` we created)
- Support URL: `https://bellepepper.org` (or a simple contact page)
- Marketing URL (optional): `https://bellepepper.org`

## 9. "What's New" (version 1.0.0)

```
The very first release of Puffy & Citrus. Two tiny friends, a cozy little world, and a story that
unfolds as you care. Thanks for being here. 💛
```
