// Renders the app icon, launch screens and store graphics from the SVGs in art/.
//   node scripts/make-icons.cjs           (needs Playwright with Chromium)
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'art', 'icons.json'), 'utf8'));
const svg = (f) => fs.readFileSync(path.join(root, 'art', f), 'utf8').replace(/<svg /, '<svg width="100%" height="100%" ');
const BG = svg('icon-bg.svg'), FG = svg('icon-fg.svg');
const RES = path.join(root, 'android/app/src/main/res');
const DENS = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 };
const font = fs.existsSync(path.join(root, cfg.font))
  ? `@font-face{font-family:T;src:url(data:font/woff2;base64,${fs.readFileSync(path.join(root, cfg.font)).toString('base64')}) format('woff2')}` : '';

async function render(page, w, h, body, out, transparent = false) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<!doctype html><style>${font}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;${transparent ? '' : `background:${cfg.splashBg};`}}
    .abs{position:absolute;inset:0}</style>${body}`);
  await page.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  await page.screenshot({ path: out, omitBackground: transparent });
}
// full icon: background + artwork, scaled up a little so it fills the square
const fullIcon = (s, round) => `<div style="position:absolute;inset:0;overflow:hidden;border-radius:${round ? '50%' : '22%'}">
  <div class="abs">${BG}</div><div class="abs" style="transform:scale(1.32)">${FG}</div></div>`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const [d, k] of Object.entries(DENS)) {
    const s = Math.round(48 * k), a = Math.round(108 * k);
    await render(page, s, s, fullIcon(s, false), `${RES}/mipmap-${d}/ic_launcher.png`, true);
    await render(page, s, s, fullIcon(s, true), `${RES}/mipmap-${d}/ic_launcher_round.png`, true);
    await render(page, a, a, `<div class="abs">${FG}</div>`, `${RES}/mipmap-${d}/ic_launcher_foreground.png`, true);
    await render(page, a, a, `<div class="abs">${BG}</div>`, `${RES}/mipmap-${d}/ic_launcher_background.png`, true);
  }
  // launch screens: icon and title on the game's colour
  const splash = (w, h) => {
    const s = Math.round(Math.min(w, h) * 0.3);
    return `<div style="position:absolute;left:50%;top:46%;width:${s}px;height:${s}px;transform:translate(-50%,-50%)">${fullIcon(s, false)}</div>
      <div style="position:absolute;left:0;right:0;top:calc(46% + ${s * 0.62}px);text-align:center;font-family:T,sans-serif;font-weight:900;
        font-size:${Math.round(s * 0.2)}px;letter-spacing:.08em;color:${cfg.splashText}">${cfg.title}</div>`;
  };
  const SPL = { mdpi: [320, 480], hdpi: [480, 800], xhdpi: [720, 1280], xxhdpi: [960, 1600], xxxhdpi: [1280, 1920] };
  for (const [d, [w, h]] of Object.entries(SPL)) {
    await render(page, w, h, splash(w, h), `${RES}/drawable-port-${d}/splash.png`);
    await render(page, h, w, splash(h, w), `${RES}/drawable-land-${d}/splash.png`);
  }
  await render(page, 480, 320, splash(480, 320), `${RES}/drawable/splash.png`);
  // Play Store graphics
  await render(page, 512, 512, `<div class="abs">${BG}</div><div class="abs" style="transform:scale(1.32)">${FG}</div>`, `${root}/store/icon-512.png`);
  await render(page, 1024, 500, `<div class="abs" style="background:${cfg.featureBg}"></div>
    <div style="position:absolute;left:70px;top:70px;width:360px;height:360px">${fullIcon(360, false)}</div>
    <div style="position:absolute;left:480px;right:40px;top:150px;font-family:T,sans-serif;font-weight:900;font-size:92px;line-height:.95;color:${cfg.splashText}">${cfg.title.replace(' ', '<br>')}</div>
    <div style="position:absolute;left:484px;top:350px;font-family:T,sans-serif;font-weight:700;font-size:26px;letter-spacing:.18em;color:${cfg.splashText};opacity:.8">${cfg.tagline}</div>`,
    `${root}/store/feature-graphic.png`);
  await browser.close();
  console.log('icons, launch screens and store graphics written');
})();
