// Builds the game into dist/: one minified script, one stylesheet, local fonts.
//   node build.mjs                 -> dist/ (GitHub Pages + Android app)
//   node build.mjs --single <file> -> also a single self-contained HTML file
import * as esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const out = 'dist';
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, 'fonts'), { recursive: true });

const FONTS = [
  // [family, file weight, css weight range]
  ['orbitron', 700, '700'],
  ['orbitron', 900, '800 900'],
  ['rajdhani', 500, '400 500'],
  ['rajdhani', 600, '600'],
  ['rajdhani', 700, '700 900'],
];
let fontCss = '';
for (const [fam, w, range] of FONTS) {
  const file = `${fam}-latin-${w}-normal.woff2`;
  fs.copyFileSync(`node_modules/@fontsource/${fam}/files/${file}`, path.join(out, 'fonts', file));
  const name = fam[0].toUpperCase() + fam.slice(1);
  // Orbitron's digits are built from overlapping shapes that iPhones fill in solid
  // (a 0 turns into a white box), so digits come from Rajdhani instead.
  const range2 = fam === 'orbitron' ? ';unicode-range:U+0000-002F,U+003A-FFFF' : '';
  fontCss += `@font-face{font-family:'${name}';font-style:normal;font-weight:${range};font-display:swap;src:url(fonts/${file}) format('woff2')${range2}}\n`;
}

// version of this build of the game files (also used by the app's self-update)
const WEB_VERSION = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);
const js = await esbuild.build({
  define: { __WEB_VERSION__: JSON.stringify(WEB_VERSION) },
  entryPoints: ['src/game.js'],
  bundle: true,
  minify: true,
  format: 'iife',
  target: ['es2020', 'chrome90', 'safari15'],
  legalComments: 'none',
  write: false,
});
const jsCode = js.outputFiles[0].text;
fs.writeFileSync(path.join(out, 'game.js'), jsCode);

const css = await esbuild.transform(fontCss + fs.readFileSync('src/style.css', 'utf8'), { loader: 'css', minify: true });
fs.writeFileSync(path.join(out, 'style.css'), css.code);

const html = fs.readFileSync('src/index.html', 'utf8');
fs.writeFileSync(path.join(out, 'index.html'), html);
fs.writeFileSync(path.join(out, '.nojekyll'), '');

const kb = (f) => (fs.statSync(path.join(out, f)).size / 1024).toFixed(0) + ' KB';
console.log('game.js', kb('game.js'), '| style.css', kb('style.css'));

// self-update package for the Android app: update/sunset-drive-<version>.zip and update/sunset-drive.json
{
  const { execFileSync } = await import('node:child_process');
  fs.rmSync('update', { recursive: true, force: true });
  fs.mkdirSync('update');
  const zip = `sunset-drive-${WEB_VERSION}.zip`;
  execFileSync('zip', ['-qr', path.join('..', 'update', zip), '.'], { cwd: out });
  // SHA-256 fingerprint of the zip: the app refuses a download that doesn't match
  const { createHash } = await import('node:crypto');
  const checksum = createHash('sha256').update(fs.readFileSync(path.join('update', zip))).digest('hex');
  fs.writeFileSync('update/sunset-drive.json', JSON.stringify({ version: WEB_VERSION, url: `https://bcool5869-coder.github.io/car-game-/updates/${zip}`, checksum }) + '\n');
  console.log('update package', zip);
}

const i = process.argv.indexOf('--single');
if (i > 0) {
  // one file with everything inline
  // fonts embedded as data URIs so the single file needs nothing else
  const inlined = css.code.replace(/url\(fonts\/([^)]+)\)/g, (_, f) =>
    `url(data:font/woff2;base64,${fs.readFileSync(path.join(out, 'fonts', f)).toString('base64')})`);
  const single = html
    .replace('<link rel="stylesheet" href="style.css">', () => `<style>${inlined}</style>`)
    .replace('<script src="game.js"></script>', () => `<script>${jsCode.replace(/<\/script/gi, '<\\/script')}</script>`);
  fs.writeFileSync(process.argv[i + 1], single);
  console.log('single file', (single.length / 1024).toFixed(0) + ' KB');
}
