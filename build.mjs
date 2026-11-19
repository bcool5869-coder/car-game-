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
  ['rajdhani', 700, '700'],
];
let fontCss = '';
for (const [fam, w, range] of FONTS) {
  const file = `${fam}-latin-${w}-normal.woff2`;
  fs.copyFileSync(`node_modules/@fontsource/${fam}/files/${file}`, path.join(out, 'fonts', file));
  const name = fam[0].toUpperCase() + fam.slice(1);
  fontCss += `@font-face{font-family:'${name}';font-style:normal;font-weight:${range};font-display:swap;src:url(fonts/${file}) format('woff2')}\n`;
}

const js = await esbuild.build({
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

const i = process.argv.indexOf('--single');
if (i > 0) {
  // one file with everything inline; fonts come from Google Fonts instead
  const gf = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;600;700&display=swap">';
  const cssNoFonts = (await esbuild.transform(fs.readFileSync('src/style.css', 'utf8'), { loader: 'css', minify: true })).code;
  const single = html
    .replace('<link rel="stylesheet" href="style.css">', () => `${gf}\n<style>${cssNoFonts}</style>`)
    .replace('<script src="game.js"></script>', () => `<script>${jsCode.replace(/<\/script/gi, '<\\/script')}</script>`);
  fs.writeFileSync(process.argv[i + 1], single);
  console.log('single file', (single.length / 1024).toFixed(0) + ' KB');
}
