// LOCAL DEV ONLY. Copy this file to "config.js" and fill in your values.
// config.js is gitignored. On GitHub Pages the workflow generates config.js
// from the SUPABASE_URL / SUPABASE_ANON_KEY repo secrets instead.
//
// The anon (public) key is safe to expose in a browser app — Row Level
// Security on the "saves" table is what actually protects each player's data.
window.__SUPABASE__ = {
  url: "https://YOUR-PROJECT-REF.supabase.co",
  anonKey: "YOUR-PUBLIC-ANON-KEY"
};
