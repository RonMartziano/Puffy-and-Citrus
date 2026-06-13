// Bundles ../index.html (the single source of truth) into gameHtml.js
// so the Expo app always ships the latest version of the game.
// Runs automatically before `npm start` (see package.json "prestart").
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'index.html');
const outPath = path.join(__dirname, 'gameHtml.js');

const html = fs.readFileSync(srcPath, 'utf8');
const out =
  '// AUTO-GENERATED from ../index.html by build-gamehtml.js — do not edit by hand.\n' +
  'export default ' + JSON.stringify(html) + ';\n';

fs.writeFileSync(outPath, out);
console.log('gameHtml.js rebuilt from index.html (' + html.length + ' bytes)');
