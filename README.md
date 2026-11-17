# Sunset Drive

An endless 3D driving game that runs in the browser. The road is generated as you drive, so it never ends: winding curves, rolling hills, forests and street lamps, with traffic to weave through at sunset.

Built with [three.js](https://threejs.org/). All of it is in `index.html`, with no build step and no asset files.

## Play

- Open `index.html` in a modern browser (Chrome, Edge, Firefox, Safari), or
- Serve the folder (`python3 -m http.server`, then open http://localhost:8000), or
- Turn on **GitHub Pages** for this repo (Settings → Pages → deploy from branch) and play it online.

three.js and the fonts load from public CDNs, so you need an internet connection.

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

On phones and tablets, on-screen buttons appear instead.

## Scoring

- Distance earns points, multiplied by speed: ×2 above 100 km/h, ×3 above 200 km/h.
- Driving in the **oncoming lanes** doubles the multiplier.
- **Near misses** give bonus points and nitro. Chain them for a combo.
- Drifts score when you finish them.
- Crashing costs a heart. You get one back every 2.5 km. Lose all three and you're wrecked.

## What's in it

- An endless road built from smooth curves, generated and recycled in chunks as you drive
- Low-poly terrain with hills and ditches, trees, rocks, street lamps and reflector posts
- Sunset sky with a sun, layered mountains, clouds, fog and bloom
- Arcade car handling with weight transfer, drifting, skid marks and tyre smoke
- Traffic in both directions (sedans, SUVs, trucks) that keeps its distance and spins out when hit
- Synthesised engine sound that shifts through gears, plus tyre squeal, wind and crash sounds
- Speed-based camera field of view and camera shake, and a nitro flame effect
- Your best score is saved in the browser
