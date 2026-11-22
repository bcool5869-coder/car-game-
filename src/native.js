// Android app glue (Capacitor). In a normal browser every function here does nothing.
import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { AdMob, BannerAdSize, BannerAdPosition, BannerAdPluginEvents } from '@capacitor-community/admob';

export const isNative = Capacitor.isNativePlatform();

// ---- ads --------------------------------------------------------------------
// These are Google's public TEST ids: test ads only, no earnings.
// Before publishing, put your own AdMob banner id here (and the app id in
// android/app/src/main/AndroidManifest.xml), and set testing to false.
const AD = { enabled: true, testing: true, bannerId: 'ca-app-pub-3940256099942544/6300978111' };
let adReady = false, adShown = false, adWanted = false;

export async function initNative({ onBack, onPauseApp }) {
  if (!isNative) return;
  App.addListener('backButton', () => onBack());
  App.addListener('appStateChange', ({ isActive }) => { if (!isActive) onPauseApp(); });
  if (AD.enabled) {
    try {
      await AdMob.initialize({ initializeForTesting: AD.testing });
      // the banner sits on top of the game: move the HUD down by its height
      AdMob.addListener(BannerAdPluginEvents.SizeChanged, (s) => {
        document.documentElement.style.setProperty('--ad', (s && s.height ? Math.round(s.height) : 0) + 'px');
      });
      adReady = true;
      if (adWanted) showAd(true);
    } catch (e) { /* no ads if the ad service is unavailable */ }
  }
}

// banner only while driving
export async function showAd(on) {
  adWanted = on;
  if (!adReady) return;
  try {
    if (on && !adShown) {
      adShown = true;
      await AdMob.showBanner({ adId: AD.bannerId, adSize: BannerAdSize.ADAPTIVE_BANNER, position: BannerAdPosition.TOP_CENTER, margin: 0, isTesting: AD.testing });
    } else if (!on && adShown) {
      adShown = false;
      await AdMob.removeBanner();
      document.documentElement.style.setProperty('--ad', '0px');
    }
  } catch (e) { adShown = false; }
}

// ---- screen rotation --------------------------------------------------------
export async function lockOrientation(landscape) {
  if (!isNative) return false;
  try { await ScreenOrientation.lock({ orientation: landscape ? 'landscape' : 'portrait' }); return true; } catch (e) { return false; }
}

export function exitApp() { if (isNative) App.exitApp(); }
