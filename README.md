# Sunset Drive

An endless 3D driving game that runs in the browser. The road is generated as you drive, so it never ends: winding curves, rolling hills, forests and street lamps, with traffic to weave through at sunset.

Built with [three.js](https://threejs.org/). No image, model or sound files: everything is generated in code.

**Play online:** https://bcool5869-coder.github.io/car-game-/

## Build

```sh
npm install
npm run build        # writes dist/: index.html, game.js (~540 KB), style.css, fonts/
```

Open `dist/index.html` in a browser, or serve the folder. The build includes the 3D library and fonts, so the game works without an internet connection. Source lives in `src/`. The `gh-pages` branch holds the published `dist/`.

Add `?debug` to the address to expose a test hook (`window.__game`).

## Controls

| Key | Action |
| --- | --- |
| `W` / `↑` | Throttle |
| `S` / `↓` | Brake / reverse |
| `A` `D` / `←` `→` | Steer |
| `Shift` | Nitro |
| `Space` | Handbrake (drift) |
| `C` | Switch camera (chase / far / bumper) |
| `M` | Mute |
| `P` / `Esc` | Pause |
| `Enter` | Start / restart |

On phones and tablets, on-screen buttons appear instead: NOS and TILT on the left with steering, BRAKE and GAS on the right. NOS also accelerates, so you can boost with one thumb. For two-handed play, tap **PLAY SIDEWAYS** on the start screen or the **⟳** button during a game to switch to landscape. If your browser can't rotate the screen by itself (for example on iPhone), turn the phone sideways with rotation lock off. Tap **TILT** to steer by tilting the phone like a steering wheel (iPhones ask for motion access first). Tilt only works when the game is served over https, for example on GitHub Pages. Pages that block motion sensors, such as a claude.ai artifact, show "not available here".

## Scoring

- Distance earns points, multiplied by speed: ×2 above 100 km/h, ×3 above 200 km/h.
- Driving in the **oncoming lanes** doubles the multiplier.
- **Near misses** give bonus points and nitro. Chain them for a combo.
- Drifts score when you finish them.
- Crashing costs a heart. You get one back every 2.5 km. Lose all three and you're wrecked.

## Performance and battery

- Each car is merged into a few meshes, and the clouds into one. A typical frame needs about 180 draw calls, down from about 450.
- Nothing is drawn while the game is paused. The menus run at 30 fps.
- **Graphics: Battery saver** (start and pause screens) caps play at 30 fps, renders fewer pixels and turns off the glow effect.
- If a phone can't hold about 45 fps, the game lowers its resolution automatically.
- Physics runs in fixed 1/60 s steps, so handling feels the same at any frame rate and fast cars can't pass through each other.

## What's in it

- An endless road built from smooth curves, generated and recycled in chunks as you drive
- Low-poly terrain with hills and ditches, trees, rocks, street lamps and reflector posts
- Slow day and night cycle (about 10 minutes per day): the sun crosses the sky, sets, stars and a moon come out, headlights and street lamps switch on, then morning returns
- Layered mountains, clouds, fog and bloom that change color with the time of day
- Arcade car handling with weight transfer, drifting, skid marks and tyre smoke
- Traffic in both directions (sedans, SUVs, trucks) that keeps its distance and spins out when hit
- Synthesised engine sound that shifts through gears, plus tyre squeal, wind and crash sounds
- Speed-based camera field of view and camera shake, and a nitro flame effect
- Your best score is saved in the browser
