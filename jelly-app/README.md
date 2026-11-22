# Jelly Drive: Android build

The Jelly Drive source lives in a private repo. This folder holds only the **finished game** (`www/`, the same files as https://bcool5869-coder.github.io/car-game-/jelly/) and its Android wrapper (`android/`), so the public build server can make the app.

The `.github/workflows/android.yml` workflow builds it and publishes `jelly-drive-test.apk` on the Releases page under *Jelly Drive Android app (latest build)*.
