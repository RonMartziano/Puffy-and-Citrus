// Bundles ../index.html (the single source of truth) into gameHtml.js
// so the Expo app always ships the latest version of the game.
// Runs automatically before `npm start` (see package.json "prestart").
//
// For a RELEASE build, run `npm run build:release` (sets OBFUSCATE=1) to
// obfuscate the game's JavaScript so it's hard to read or reuse.
// Requires the dev dependency: npm i -D javascript-obfuscator
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'index.html');
const outPath = path.join(__dirname, 'gameHtml.js');

let html = fs.readFileSync(srcPath, 'utf8');

if (process.env.OBFUSCATE === '1') {
  try {
    const ob = require('javascript-obfuscator');
    const i = html.lastIndexOf('<script>');
    const j = html.indexOf('</script>', i);
    if (i >= 0 && j > i) {
      const js = html.slice(i + '<script>'.length, j);
      const res = ob.obfuscate(js, {
        compact: true,
        controlFlowFlattening: false,
        deadCodeInjection: false,
        selfDefending: false,
        stringArray: true,
        stringArrayEncoding: ['base64'],
        stringArrayThreshold: 0.75,
        splitStrings: true,
        splitStringsChunkLength: 10,
        numbersToExpressions: true,
        transformObjectKeys: false,
        disableConsoleOutput: false
      }).getObfuscatedCode();
      html = html.slice(0, i + '<script>'.length) + res + html.slice(j);
      console.log('Obfuscated game script (' + js.length + ' -> ' + res.length + ' chars)');
    } else {
      console.warn('Could not locate game <script> block to obfuscate.');
    }
  } catch (e) {
    console.warn('javascript-obfuscator not installed — shipping readable code.\n' +
      'Install it for release builds:  npm i -D javascript-obfuscator');
  }
}

const out =
  '// AUTO-GENERATED from ../index.html by build-gamehtml.js — do not edit by hand.\n' +
  'export default ' + JSON.stringify(html) + ';\n';

fs.writeFileSync(outPath, out);
console.log('gameHtml.js rebuilt from index.html (' + html.length + ' bytes)');
