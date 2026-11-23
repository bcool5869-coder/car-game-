// Android app glue (Capacitor). In a normal browser every function here does nothing.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';
import { CapacitorUpdater } from '@capgo/capacitor-updater';

export const isNative = Capacitor.isNativePlatform();
// set by the build (build.mjs); also written into the update note on the website
export const WEB_VERSION = typeof __WEB_VERSION__ === 'string' ? __WEB_VERSION__ : 'dev';

// ---- self-update ------------------------------------------------------------
// The game files (HTML/JS/CSS) update themselves: on launch the app reads a small
// version note on the website; if there is a newer build it downloads it quietly
// and uses it the next time the app is opened. Native parts (icon, ads setup)
// still need a new app version.
const UPDATES = 'https://bcool5869-coder.github.io/car-game-/updates/';
async function checkForUpdate(app) {
  try {
    // this build started fine: keep it (otherwise the updater rolls back by itself)
    await CapacitorUpdater.notifyAppReady();
    const res = await fetch(`${UPDATES}${app}.json?t=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) return;
    const note = await res.json();                    // { version, url }
    if (!note.version || !note.url || note.version === WEB_VERSION) return;
    const { bundles } = await CapacitorUpdater.list();
    let bundle = bundles.find((b) => b.version === note.version && b.status === 'success');
    if (!bundle) bundle = await CapacitorUpdater.download({ url: note.url, version: note.version });
    await CapacitorUpdater.next({ id: bundle.id });   // switch on the next launch, never mid-game
  } catch (e) { /* offline or failed: keep the current version */ }
}

// ---- ads --------------------------------------------------------------------
// These are Google's public TEST ids: test ads only, no earnings.
// Before publishing, put your own AdMob banner id here (and the app id in
// android/app/src/main/AndroidManifest.xml), and set testing to false.
const AD = { enabled: true, testing: true, bannerId: 'ca-app-pub-3940256099942544/6300978111' };
let adReady = false, adCreated = false, adShown = false, adWanted = false, adH = 0;
const adOptions = (margin) => ({ adId: AD.bannerId, adSize: BannerAdSize.BANNER, position: BannerAdPosition.TOP_CENTER, margin, isTesting: AD.testing });

// narrow screens (phone upright): the whole HUD moves below the banner.
// wide screens (sideways): only the messages in the middle move; corners stay put.
function layoutForAd() {
  const h = adShown ? adH : 0, narrow = innerWidth < 640;
  document.documentElement.style.setProperty('--ad', (narrow ? h : 0) + 'px');
  document.documentElement.style.setProperty('--ad-mid', (narrow ? 0 : h) + 'px');
}

export async function initNative({ app, onBack, onPauseApp }) {
  if (!isNative) return;
  App.addListener('backButton', () => onBack());
  App.addListener('appStateChange', ({ isActive }) => { if (!isActive) onPauseApp(); });
  checkForUpdate(app);
  if (AD.enabled) {
    try {
      await AdMob.initialize({ initializeForTesting: AD.testing });
      // the banner floats over the top centre of the game; move only what it would cover
      AdMob.addListener(BannerAdPluginEvents.SizeChanged, (s) => { if (s && s.height) adH = Math.round(s.height); layoutForAd(); });
      addEventListener('resize', layoutForAd);
      adReady = true;
      if (adWanted) showAd(true);
    } catch (e) { /* no ads if the ad service is unavailable */ }
  }
}

// banner only while driving
export async function showAd(on) {
  adWanted = on;
  if (!adReady || on === adShown) return;
  adShown = on;
  layoutForAd();
  try {
    if (on && !adCreated) {
      adCreated = true;
      await AdMob.showBanner(adOptions(0));
      // Showing again with a different margin re-lays the existing banner with
      // true horizontal centring, so it stays centred when the phone rotates.
      await AdMob.showBanner(adOptions(1));
    } else if (on) await AdMob.resumeBanner();
    else await AdMob.hideBanner();
  } catch (e) { /* ignore: the game works without the ad */ }
}

// ---- screen rotation --------------------------------------------------------
export async function lockOrientation(landscape) {
  if (!isNative) return false;
  try { await ScreenOrientation.lock({ orientation: landscape ? 'landscape' : 'portrait' }); return true; } catch (e) { return false; }
}

export function exitApp() { if (isNative) App.exitApp(); }
