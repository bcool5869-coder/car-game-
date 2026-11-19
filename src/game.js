import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// =====================================================================
// Utilities
// =====================================================================
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (e0, e1, x) => { const t = clamp((x - e0) / (e1 - e0), 0, 1); return t * t * (3 - 2 * t); };
const damp = (rate, dt) => 1 - Math.exp(-rate * dt);
const rand = (a, b) => a + Math.random() * (b - a);
const angDiff = (a, b) => { let d = b - a; while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d; };
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

// =====================================================================
// The road: an infinite, smooth centre-line defined by sums of sines.
// "s" is the parameter along the road (world z), "u" the signed
// perpendicular offset from the centre (+u = right of travel).
// =====================================================================
const RH = 8;               // road half-width (4 lanes x 4m)
const LANES = [-6, -2, 2, 6];
function roadX(s) { return 60 * Math.sin(s * 0.003) + 25 * Math.sin(s * 0.0071 + 1.3) + 5 * Math.sin(s * 0.011 + 0.4); }
function roadDX(s) { return 0.18 * Math.cos(s * 0.003) + 0.1775 * Math.cos(s * 0.0071 + 1.3) + 0.055 * Math.cos(s * 0.011 + 0.4); }
function roadY(s) { return 18 * Math.sin(s * 0.0015) + 6 * Math.sin(s * 0.004 + 2) + 2 * Math.sin(s * 0.011); }
function roadDY(s) { return 0.027 * Math.cos(s * 0.0015) + 0.024 * Math.cos(s * 0.004 + 2) + 0.022 * Math.cos(s * 0.011); }
function roadHeading(s) { return Math.atan(roadDX(s)); } // heading of a car driving "forward" (towards -z)

const _w = { x: 0, z: 0 };
function toWorld(s, u, out = _w) {
  const dX = roadDX(s), len = Math.hypot(1, dX);
  out.x = roadX(s) + u / len; out.z = s - (u * dX) / len;
  return out;
}
const PJ = { s: 0, u: 0 };
function project(x, z) {
  let dX = roadDX(z), len = Math.hypot(1, dX);
  let u = (x - roadX(z)) / len;
  let s = z + (u * dX) / len;
  dX = roadDX(s); len = Math.hypot(1, dX);
  u = (x - roadX(s)) * len;
  PJ.s = z + (u * dX) / len; PJ.u = u;
  return PJ;
}
function terrainNoise(x, z) {
  return 0.5 + 0.22 * Math.sin(x * 0.021 + z * 0.013) + 0.15 * Math.sin(x * 0.047 - z * 0.031 + 1.7)
    + 0.08 * Math.sin(x * 0.11 + z * 0.09 + 4.1) + 0.05 * Math.sin(x * 0.23 - z * 0.19 + 2.2);
}
function sideHeight(u, x, z) {
  const a = Math.abs(u);
  if (a <= RH) return 0;
  if (a <= 10.5) return -0.06;
  const ditch = -0.7 * Math.sin(clamp((a - 10.5) / 6, 0, 1) * Math.PI);
  return -0.06 + ditch + smooth(12, 70, a) * (3 + 30 * terrainNoise(x, z));
}
function groundAt(x, z) { const p = project(x, z); return roadY(p.s) + sideHeight(p.u, x, z); }

// =====================================================================
// Renderer / scene
// =====================================================================
let renderer;
try {
  renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'default' });
} catch (e) {
  const el = document.getElementById('err');
  el.style.display = 'flex'; el.textContent = 'Your browser could not start WebGL, which this game needs.';
  throw e;
}
// ---- quality / battery settings ------------------------------------
const IS_TOUCH = matchMedia('(pointer: coarse)').matches;
const settings = { saver: store.get('sd-saver', false) };
const BASE_PR = Math.min(window.devicePixelRatio || 1, IS_TOUCH ? 1.35 : 1.5);
let prScale = 1;        // lowered automatically if the phone can't keep up
let bloomAllowed = true;
const currentPR = () => (settings.saver ? Math.min(window.devicePixelRatio || 1, 1) : Math.max(0.75, BASE_PR * prScale));
renderer.setPixelRatio(currentPR());
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('app').appendChild(renderer.domElement);

const scene = new THREE.Scene();
const FOG = new THREE.Color(0xf2a77c);
scene.fog = new THREE.Fog(FOG, 50, 330);
scene.background = FOG;

const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.1, 3500);

const SUN_DIR = new THREE.Vector3(-0.55, 0.14, -1).normalize();

// ---- Sky dome ------------------------------------------------------
const skyMat = new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: {
    uTop: { value: new THREE.Color(0x24407e) },
    uMid: { value: new THREE.Color(0xf7b98e) },
    uHorizon: { value: FOG.clone() },
    uSunColor: { value: new THREE.Color(0xffd29a) },
    uSunDir: { value: SUN_DIR },
    uSunScale: { value: 1 },
  },
  vertexShader: `
    varying vec3 vDir;
    void main(){
      vDir = position;
      vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      gl_Position = p.xyww;
    }`,
  fragmentShader: `
    uniform vec3 uTop, uMid, uHorizon, uSunColor, uSunDir;
    uniform float uSunScale;
    varying vec3 vDir;
    void main(){
      vec3 d = normalize(vDir);
      float h = d.y;
      float sd = max(dot(d, uSunDir), 0.0);
      vec3 col = mix(uHorizon, uMid, smoothstep(0.0, 0.14, h));
      col = mix(col, uTop, smoothstep(0.1, 0.7, h));
      // thin warm band of clouds near the horizon
      float band = smoothstep(0.05, 0.09, h) * (1.0 - smoothstep(0.09, 0.2, h));
      float wave = 0.5 + 0.5 * sin(atan(d.z, d.x) * 9.0 + h * 40.0) * sin(atan(d.z, d.x) * 23.0);
      col = mix(col, uMid * 1.12 + vec3(0.06, 0.02, 0.04), band * wave * 0.5);
      if (h < 0.0) col = uHorizon;
      col += uSunColor * (pow(sd, 8.0) * 0.22 + pow(sd, 64.0) * 0.35) * min(uSunScale, 1.0);
      col += uSunColor * smoothstep(0.99935, 0.9997, sd) * 5.0 * uSunScale;
      gl_FragColor = vec4(col, 1.0);
    }`,
});
const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 24), skyMat);
sky.scale.setScalar(3000);
sky.renderOrder = -10;
sky.frustumCulled = false;
scene.add(sky);

// Environment map (sunset reflections on the paint)
const pmrem = new THREE.PMREMGenerator(renderer);
const envScene = new THREE.Scene();
const envSkyMat = skyMat.clone();
envSkyMat.uniforms.uSunScale.value = 0.06;
const envSky = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), envSkyMat);
envSky.scale.setScalar(50);
envScene.add(envSky);
const ground = new THREE.Mesh(new THREE.CircleGeometry(40, 24).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x4a4038 }));
ground.position.y = -2; envScene.add(ground);
const envMap = pmrem.fromScene(envScene, 0.02, 0.1, 200).texture;

// ---- Lights --------------------------------------------------------
const hemi = new THREE.HemisphereLight(0xb4c4ff, 0x6b5038, 1.15);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffc48a, 3.3);
sun.castShadow = true;
sun.shadow.mapSize.set(IS_TOUCH ? 1024 : 2048, IS_TOUCH ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -45, right: 45, top: 45, bottom: -45, near: 1, far: 400 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.04;
scene.add(sun, sun.target);

// ---- Distant mountains & clouds (follow the camera) ------------------
const backdrop = new THREE.Group();
scene.add(backdrop);
function makeMountains(R, topColor, seed, hMin, hMax) {
  const N = 220, pos = [], col = [], idx = [];
  const ct = new THREE.Color(topColor), cb = FOG.clone();
  const rng = mulberry32(seed);
  for (let i = 0; i <= N; i++) {
    const a = (i / N) * Math.PI * 2;
    const n = 0.5 + 0.28 * Math.sin(a * 3 + seed) + 0.14 * Math.sin(a * 7.3 + seed * 2) + 0.08 * Math.sin(a * 17 + seed);
    const h = hMin + (hMax - hMin) * n + (rng() - 0.5) * 22;
    const x = Math.cos(a) * R, z = Math.sin(a) * R;
    pos.push(x, h, z, x, -120, z);
    col.push(ct.r, ct.g, ct.b, cb.r, cb.g, cb.b);
    if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  g.setIndex(idx);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ vertexColors: true, fog: false, side: THREE.DoubleSide, depthWrite: false }));
  m.frustumCulled = false;
  return m;
}
const mFar = makeMountains(2200, 0xc98f9a, 7, 60, 330); mFar.renderOrder = -9;
const mNear = makeMountains(1700, 0x8e6688, 19, 20, 200); mNear.renderOrder = -8;
backdrop.add(mFar, mNear);
{
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0xffd6c0, fog: false, transparent: true, opacity: 0.85, depthWrite: false });
  const cg = new THREE.IcosahedronGeometry(1, 1);
  const rng = mulberry32(99);
  const puffs = [];
  for (let i = 0; i < 18; i++) {
    const cl = new THREE.Group();
    const a = rng() * Math.PI * 2, R = 1300 + rng() * 700;
    cl.position.set(Math.cos(a) * R, 260 + rng() * 260, Math.sin(a) * R);
    for (let k = 0; k < 5; k++) {
      const p = new THREE.Object3D();
      p.position.set((rng() - 0.5) * 220, (rng() - 0.5) * 16, (rng() - 0.5) * 80);
      p.scale.set(60 + rng() * 70, 14 + rng() * 12, 40 + rng() * 40);
      cl.add(p);
    }
    cl.lookAt(0, cl.position.y, 0);
    cl.updateMatrixWorld(true);
    for (const p of cl.children) puffs.push(cg.clone().applyMatrix4(p.matrixWorld));
  }
  const clouds = new THREE.Mesh(mergeGeometries(puffs), cloudMat);  // all clouds in one draw
  clouds.renderOrder = -7;
  clouds.frustumCulled = false;
  backdrop.add(clouds);
}

// =====================================================================
// Materials & shared geometry for the world
// =====================================================================
function makeRoadTexture() {
  const W = 512, H = 384, PX = W / 16;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#3b3c41'; g.fillRect(0, 0, W, H);
  const img = g.getImageData(0, 0, W, H), d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 26;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
  }
  g.putImageData(img, 0, 0);
  const px = (u) => ((u + 8) / 16) * W;
  // worn tyre tracks
  g.fillStyle = 'rgba(0,0,0,0.13)';
  for (const lane of LANES) for (const o of [-0.85, 0.85]) g.fillRect(px(lane + o - 0.35), 0, 0.7 * PX, H);
  // edge lines
  g.fillStyle = '#ebe7dd';
  g.fillRect(px(-7.78), 0, 0.2 * PX, H);
  g.fillRect(px(7.58), 0, 0.2 * PX, H);
  // double yellow
  g.fillStyle = '#efb52e';
  g.fillRect(px(-0.24), 0, 0.13 * PX, H);
  g.fillRect(px(0.11), 0, 0.13 * PX, H);
  // dashed lane dividers
  g.fillStyle = '#ebe7dd';
  for (const u of [-4, 4]) g.fillRect(px(u - 0.08), 0, 0.16 * PX, 4 * PX);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = THREE.ClampToEdgeWrapping; t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return t;
}
const roadMat = new THREE.MeshStandardMaterial({ map: makeRoadTexture(), roughness: 0.82, metalness: 0.0 });
const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 1 });
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3e2b, roughness: 1, flatShading: true });
const leafMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9, flatShading: true });
const rockMat = new THREE.MeshStandardMaterial({ color: 0x8d8178, roughness: 1, flatShading: true });
const poleMat = new THREE.MeshStandardMaterial({ color: 0x44464d, roughness: 0.5, metalness: 0.7 });
const bulbMat = new THREE.MeshStandardMaterial({ color: 0xffe6c0, emissive: 0xffc070, emissiveIntensity: 5 });
const postMat = new THREE.MeshStandardMaterial({ color: 0xeeeeee, roughness: 0.6 });
const reflMat = new THREE.MeshStandardMaterial({ color: 0xff8a2a, emissive: 0xff7a1a, emissiveIntensity: 2.4 });

const trunkGeo = new THREE.CylinderGeometry(0.18, 0.28, 2, 6).translate(0, 1, 0);
const pineGeo = mergeGeometries([
  new THREE.ConeGeometry(2.0, 4.2, 7).translate(0, 3.6, 0),
  new THREE.ConeGeometry(1.45, 3.2, 7).translate(0, 5.6, 0),
  new THREE.ConeGeometry(0.9, 2.2, 7).translate(0, 7.2, 0),
]);
const roundGeo = new THREE.IcosahedronGeometry(2.3, 0).translate(0, 3.9, 0);
const rockGeo = new THREE.DodecahedronGeometry(1, 0);
const poleGeo = mergeGeometries([
  new THREE.CylinderGeometry(0.1, 0.14, 7.6, 8).translate(0, 3.8, 0),
  new THREE.BoxGeometry(2.3, 0.12, 0.14).translate(-1.1, 7.5, 0),
  new THREE.BoxGeometry(0.7, 0.16, 0.36).translate(-2.0, 7.38, 0),
]);
const bulbGeo = new THREE.BoxGeometry(0.55, 0.06, 0.28).translate(-2.0, 7.28, 0);
const postGeo = new THREE.BoxGeometry(0.12, 1.0, 0.12).translate(0, 0.5, 0);
const reflGeo = new THREE.BoxGeometry(0.14, 0.14, 0.14).translate(0, 0.9, 0);

const C_GRAVEL = new THREE.Color(0x8d7d68), C_DITCH = new THREE.Color(0x52692c);
const C_GRASS1 = new THREE.Color(0x6a973b), C_GRASS2 = new THREE.Color(0xa7b456), C_DARK = new THREE.Color(0x3f6a2e);
const C_ROCK = new THREE.Color(0x938476);
function terrainColor(u, h, x, z, out) {
  const a = Math.abs(u);
  if (a <= 10.6) { out.copy(C_GRAVEL).offsetHSL(0, 0, Math.sin(x * 1.7 + z * 2.3) * 0.04); return out; }
  out.copy(C_GRASS1).lerp(C_GRASS2, smooth(0.3, 0.8, terrainNoise(x * 2.3, z * 2.3)));
  out.lerp(C_DARK, smooth(0.65, 0.25, terrainNoise(z * 1.3 + 50, x * 1.1)) * 0.55);
  if (h > 14) out.lerp(C_ROCK, smooth(14, 28, h) * 0.85);
  if (a < 16.5) out.lerp(C_DITCH, 0.45);
  return out;
}

// =====================================================================
// World chunks (generated on the fly, recycled behind the player)
// =====================================================================
const CHUNK = 120, ROW = 4, ROAD_ROW = 2;
const LAT = [8, 10, 11.5, 13, 15, 17.5, 20.5, 24, 28, 33, 39, 46, 55, 66, 80, 98, 120, 145, 175, 210, 250, 295, 340];
const LATS = [...LAT.map((v) => -v).reverse(), ...LAT];
const chunks = new Map();
const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _p = new THREE.Vector3(), _s = new THREE.Vector3(), _e = new THREE.Euler(), _c = new THREE.Color();

function instanced(geo, mat, list, cast = true) {
  if (!list.length) return null;
  const m = new THREE.InstancedMesh(geo, mat, list.length);
  list.forEach((it, k) => {
    m.setMatrixAt(k, it.m);
    if (it.c) m.setColorAt(k, it.c);
  });
  m.castShadow = cast; m.receiveShadow = true;
  if (m.computeBoundingSphere) m.computeBoundingSphere();
  return m;
}
function compose(x, y, z, ry, sx, sy = sx, sz = sx, rx = 0, rz = 0) {
  _e.set(rx, ry, rz); _q.setFromEuler(_e); _p.set(x, y, z); _s.set(sx, sy, sz);
  return new THREE.Matrix4().compose(_p, _q, _s);
}

function buildChunk(i) {
  const group = new THREE.Group();
  const z0 = -i * CHUNK;

  // ---- terrain ribbon
  {
    const rows = CHUNK / ROW + 1, cols = LATS.length;
    const pos = new Float32Array(rows * cols * 3), col = new Float32Array(rows * cols * 3);
    let k = 0;
    for (let r = 0; r < rows; r++) {
      const s = z0 - r * ROW, dX = roadDX(s), len = Math.hypot(1, dX), cx = roadX(s), cy = roadY(s);
      for (let c = 0; c < cols; c++) {
        const u = LATS[c], x = cx + u / len, z = s - (u * dX) / len;
        const h = sideHeight(u, x, z);
        pos[k] = x; pos[k + 1] = cy + h; pos[k + 2] = z;
        terrainColor(u, h, x, z, _c);
        col[k] = _c.r; col[k + 1] = _c.g; col[k + 2] = _c.b;
        k += 3;
      }
    }
    const idx = [];
    const gap = LAT.length - 1;
    for (let r = 0; r < rows - 1; r++) for (let c = 0; c < cols - 1; c++) {
      if (c === gap) continue;
      const a = r * cols + c, b = a + 1, d = a + cols, e = d + 1;
      idx.push(a, b, d, b, e, d);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, terrainMat);
    m.receiveShadow = true;
    group.add(m);
  }

  // ---- road surface
  {
    const rows = CHUNK / ROAD_ROW + 1;
    const pos = new Float32Array(rows * 2 * 3), uv = new Float32Array(rows * 2 * 2);
    for (let r = 0; r < rows; r++) {
      const s = z0 - r * ROAD_ROW, dX = roadDX(s), len = Math.hypot(1, dX), cx = roadX(s), cy = roadY(s);
      for (let c = 0; c < 2; c++) {
        const u = c === 0 ? -RH : RH, k = (r * 2 + c);
        pos[k * 3] = cx + u / len; pos[k * 3 + 1] = cy + 0.005; pos[k * 3 + 2] = s - (u * dX) / len;
        uv[k * 2] = c; uv[k * 2 + 1] = s / 12;
      }
    }
    const idx = [];
    for (let r = 0; r < rows - 1; r++) { const a = r * 2, b = a + 1, d = a + 2, e = a + 3; idx.push(a, b, d, b, e, d); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(idx);
    g.computeVertexNormals();
    const m = new THREE.Mesh(g, roadMat);
    m.receiveShadow = true;
    group.add(m);
  }

  // ---- scenery
  const rng = mulberry32(((i * 2654435761) ^ 0x9e3779b9) >>> 0);
  const trunks = [], pines = [], rounds = [], rocks = [], poles = [], bulbs = [], posts = [], refls = [];
  const obstacles = [];
  for (let k = 0; k < 80; k++) {
    const s = z0 - rng() * CHUNK, side = rng() < 0.5 ? -1 : 1;
    const u = side * (14.5 + Math.pow(rng(), 1.5) * 230);
    const w = toWorld(s, u), y = roadY(s) + sideHeight(u, w.x, w.z) - 0.15;
    const sc = 0.75 + rng() * 0.9, ry = rng() * Math.PI * 2;
    const pine = rng() < 0.62;
    if (Math.abs(u) < 70) obstacles.push({ x: w.x, z: w.z, r: 0.32 * sc });
    trunks.push({ m: compose(w.x, y, w.z, ry, sc, sc * (pine ? 1 : 1.25), sc) });
    if (pine) {
      _c.setHSL(0.27 + rng() * 0.08, 0.45 + rng() * 0.2, 0.2 + rng() * 0.1);
      pines.push({ m: compose(w.x, y, w.z, ry, sc), c: _c.clone() });
    } else {
      const autumn = rng() < 0.3;
      if (autumn) _c.setHSL(0.05 + rng() * 0.07, 0.75, 0.42 + rng() * 0.1);
      else _c.setHSL(0.2 + rng() * 0.08, 0.5 + rng() * 0.2, 0.3 + rng() * 0.1);
      rounds.push({ m: compose(w.x, y, w.z, ry, sc, sc * (0.85 + rng() * 0.4), sc), c: _c.clone() });
    }
  }
  for (let k = 0; k < 12; k++) {
    const s = z0 - rng() * CHUNK, side = rng() < 0.5 ? -1 : 1;
    const u = side * (12 + Math.pow(rng(), 1.3) * 150);
    const w = toWorld(s, u), y = roadY(s) + sideHeight(u, w.x, w.z);
    const sc = 0.5 + rng() * 2.2;
    if (Math.abs(u) < 70 && sc > 0.9) obstacles.push({ x: w.x, z: w.z, r: sc * 0.85 });
    rocks.push({ m: compose(w.x, y - sc * 0.3, w.z, rng() * 6, sc * (1 + rng() * 0.6), sc * (0.6 + rng() * 0.5), sc, rng(), rng()) });
  }
  // street lamps every 70m, alternating sides
  for (let n = Math.ceil(-z0 / 70); n * 70 < -z0 + CHUNK; n++) {
    const s = -n * 70, side = n % 2 === 0 ? 1 : -1, u = side * 10.3;
    const w = toWorld(s, u), y = roadY(s) + sideHeight(u, w.x, w.z);
    const ry = roadHeading(s) + (side < 0 ? Math.PI : 0);
    const m = compose(w.x, y, w.z, ry, 1);
    poles.push({ m }); bulbs.push({ m });
    obstacles.push({ x: w.x, z: w.z, r: 0.18 });
  }
  // reflector posts every 25m on both sides
  for (let n = Math.ceil(-z0 / 25); n * 25 < -z0 + CHUNK; n++) {
    const s = -n * 25;
    for (const side of [-1, 1]) {
      const u = side * 9.4, w = toWorld(s, u), y = roadY(s) + sideHeight(u, w.x, w.z);
      const m = compose(w.x, y, w.z, roadHeading(s), 1);
      posts.push({ m }); refls.push({ m });
    }
  }
  for (const m of [
    instanced(trunkGeo, trunkMat, trunks),
    instanced(pineGeo, leafMat, pines),
    instanced(roundGeo, leafMat, rounds),
    instanced(rockGeo, rockMat, rocks),
    instanced(poleGeo, poleMat, poles),
    instanced(bulbGeo, bulbMat, bulbs, false),
    instanced(postGeo, postMat, posts),
    instanced(reflGeo, reflMat, refls, false),
  ]) if (m) group.add(m);

  group.userData.obstacles = obstacles;
  scene.add(group);
  return group;
}
function disposeChunk(g) {
  scene.remove(g);
  g.children.forEach((m) => {
    if (m.isInstancedMesh) m.dispose();
    else m.geometry.dispose();
  });
}
function updateChunks(force = false) {
  const ci = Math.floor(-player.z / CHUNK);
  for (const [i, g] of chunks) if (i < ci - 2 || i > ci + 4) { disposeChunk(g); chunks.delete(i); }
  let built = 0;
  for (let i = ci - 1; i <= ci + 3; i++) {
    if (!chunks.has(i)) {
      chunks.set(i, buildChunk(i));
      if (!force && ++built >= 1) break;
    }
  }
}

// =====================================================================
// Cars
// =====================================================================
const glassMat = new THREE.MeshStandardMaterial({ color: 0x0e1520, metalness: 0.9, roughness: 0.18, envMap, envMapIntensity: 1.4 });
const wheelMat = new THREE.MeshStandardMaterial({ vertexColors: true, metalness: 0.5, roughness: 0.45, envMap });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x1b1c20, roughness: 0.6, metalness: 0.3 });
const chromeMat = new THREE.MeshStandardMaterial({ color: 0xdddddd, metalness: 1, roughness: 0.15, envMap });
const headMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfff2dc, emissiveIntensity: 3.2 });

const shadowTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 128;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(64, 64, 4, 64, 64, 64);
  gr.addColorStop(0, 'rgba(0,0,0,0.75)'); gr.addColorStop(0.6, 'rgba(0,0,0,0.4)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
})();
const blobMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 });

const wheelCache = {};
function wheelGeos(r, w) {
  const key = r + '_' + w;
  if (wheelCache[key]) return wheelCache[key];
  const paintGeo = (g, hex) => {
    if (g.index) g = g.toNonIndexed();
    g.deleteAttribute('uv');
    const c = new THREE.Color(hex), n = g.attributes.position.count, arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { arr[i * 3] = c.r; arr[i * 3 + 1] = c.g; arr[i * 3 + 2] = c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    return g;
  };
  const parts = [paintGeo(new THREE.CylinderGeometry(r, r, w, 20).rotateZ(Math.PI / 2), 0x19191b)];
  parts.push(paintGeo(new THREE.CylinderGeometry(r * 0.64, r * 0.64, w + 0.02, 14).rotateZ(Math.PI / 2), 0xb9bdc4));
  for (let k = 0; k < 5; k++) {
    parts.push(paintGeo(new THREE.BoxGeometry(w + 0.04, r * 1.15, r * 0.16).rotateX((k / 5) * Math.PI), 0xd5d8dd));
  }
  return (wheelCache[key] = mergeGeometries(parts));
}

// spec: { w, l, bodyH, bodyY, cabin:[w,h,l,z], wheelR, wheelZ:[..], type }
const CAR_TYPES = {
  sport: { w: 1.95, l: 4.5, bodyH: 0.56, bodyY: 0.6, cabin: [1.52, 0.5, 2.0, 0.35], roofY: 0, wheelR: 0.38, wheelZ: [-1.45, 1.45], mass: 1 },
  sedan: { w: 1.85, l: 4.5, bodyH: 0.62, bodyY: 0.64, cabin: [1.62, 0.56, 2.35, 0.15], wheelR: 0.36, wheelZ: [-1.4, 1.4], mass: 1.1 },
  suv: { w: 2.0, l: 4.8, bodyH: 0.85, bodyY: 0.82, cabin: [1.86, 0.62, 2.9, 0.35], wheelR: 0.44, wheelZ: [-1.55, 1.55], mass: 1.6 },
  truck: { w: 2.4, l: 8.2, truck: true, wheelR: 0.52, wheelZ: [-2.8, 1.2, 2.6], mass: 4 },
};

const CAST = { paint: true, cargo: true, dark: true, glass: true, head: false, tail: false, chrome: false };
const carGeoCache = {};
// Each car is drawn as one merged mesh per material (5-7 draws) instead of ~20 small meshes.
function carParts(T, player) {
  const groups = {};
  const add = (geo, role, x, y, z) => {
    const g = geo.clone().translate(x, y, z);
    (groups[role] ||= []).push(g.index ? g.toNonIndexed() : g);
  };
  const hl = T.l / 2;
  if (T.truck) {
    add(new RoundedBoxGeometry(2.3, 1.7, 2.1, 3, 0.18), 'paint', 0, 1.45, -hl + 1.15);
    add(new RoundedBoxGeometry(2.1, 0.75, 0.08, 2, 0.03), 'glass', 0, 1.75, -hl + 0.08);
    add(new THREE.BoxGeometry(2.3, 0.4, 0.15), 'dark', 0, 0.62, -hl + 0.05);
    add(new RoundedBoxGeometry(2.45, 2.9, 5.8, 2, 0.08), 'cargo', 0, 2.05, hl - 2.95);
    add(new THREE.BoxGeometry(2.0, 0.35, T.l - 0.6), 'dark', 0, 0.62, 0.2);
    add(new THREE.BoxGeometry(0.4, 0.14, 0.04), 'head', -0.85, 0.9, -hl - 0.01);
    add(new THREE.BoxGeometry(0.4, 0.14, 0.04), 'head', 0.85, 0.9, -hl - 0.01);
    add(new THREE.BoxGeometry(0.3, 0.2, 0.04), 'tail', -1.0, 0.75, hl + 0.06);
    add(new THREE.BoxGeometry(0.3, 0.2, 0.04), 'tail', 1.0, 0.75, hl + 0.06);
  } else {
    const [cw, ch, cl, cz] = T.cabin;
    add(new RoundedBoxGeometry(T.w, T.bodyH, T.l, 4, 0.2), 'paint', 0, T.bodyY, 0);
    add(new RoundedBoxGeometry(cw, ch, cl, 4, 0.2), 'glass', 0, T.bodyY + T.bodyH / 2 + ch / 2 - 0.06, cz);
    add(new RoundedBoxGeometry(cw - 0.08, 0.08, cl * 0.7, 2, 0.03), 'paint', 0, T.bodyY + T.bodyH / 2 + ch - 0.08, cz + 0.05);
    add(new THREE.BoxGeometry(cw + 0.02, ch * 0.7, 0.12), 'paint', 0, T.bodyY + T.bodyH / 2 + ch / 2 - 0.08, cz + cl / 2 - 0.25);
    const fz = -hl - 0.005, rz = hl + 0.005;
    add(new THREE.BoxGeometry(0.46, 0.12, 0.06), 'head', -T.w / 2 + 0.38, T.bodyY + 0.1, fz);
    add(new THREE.BoxGeometry(0.46, 0.12, 0.06), 'head', T.w / 2 - 0.38, T.bodyY + 0.1, fz);
    add(new THREE.BoxGeometry(T.w * 0.5, 0.18, 0.06), 'dark', 0, T.bodyY - 0.08, fz);
    if (player) {
      add(new THREE.BoxGeometry(T.w - 0.25, 0.1, 0.06), 'tail', 0, T.bodyY + 0.15, rz);
      add(new THREE.BoxGeometry(T.w - 0.2, 0.2, 0.06), 'dark', 0, T.bodyY - 0.12, rz);
      // spoiler
      add(new THREE.BoxGeometry(0.08, 0.26, 0.12), 'dark', -0.6, T.bodyY + T.bodyH / 2 + 0.12, hl - 0.3);
      add(new THREE.BoxGeometry(0.08, 0.26, 0.12), 'dark', 0.6, T.bodyY + T.bodyH / 2 + 0.12, hl - 0.3);
      add(new RoundedBoxGeometry(1.9, 0.06, 0.42, 2, 0.02), 'paint', 0, T.bodyY + T.bodyH / 2 + 0.27, hl - 0.25);
      // side skirts & exhausts
      add(new THREE.BoxGeometry(0.05, 0.12, T.l * 0.6), 'dark', -T.w / 2 - 0.01, T.bodyY - 0.2, 0);
      add(new THREE.BoxGeometry(0.05, 0.12, T.l * 0.6), 'dark', T.w / 2 + 0.01, T.bodyY - 0.2, 0);
      const ex = new THREE.CylinderGeometry(0.07, 0.07, 0.2, 10).rotateX(Math.PI / 2);
      add(ex, 'chrome', -0.45, T.bodyY - 0.18, rz + 0.05);
      add(ex, 'chrome', 0.45, T.bodyY - 0.18, rz + 0.05);
    } else {
      add(new THREE.BoxGeometry(0.4, 0.14, 0.06), 'tail', -T.w / 2 + 0.33, T.bodyY + 0.12, rz);
      add(new THREE.BoxGeometry(0.4, 0.14, 0.06), 'tail', T.w / 2 - 0.33, T.bodyY + 0.12, rz);
    }
  }
  return Object.entries(groups).map(([role, list]) => ({ role, geo: mergeGeometries(list) }));
}

function buildCar(type, color, player = false) {
  const T = CAR_TYPES[type];
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const paint = player
    ? new THREE.MeshPhysicalMaterial({ color, metalness: 0.55, roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.06, envMap, envMapIntensity: 1.3 })
    : new THREE.MeshStandardMaterial({ color, metalness: 0.45, roughness: 0.38, envMap, envMapIntensity: 1.0 });
  const tail = new THREE.MeshStandardMaterial({ color: 0x550000, emissive: 0xff1020, emissiveIntensity: 1.6 });
  const cargo = T.truck ? new THREE.MeshStandardMaterial({ color: [0xf2f2f2, 0xd9d4c7, 0x9fb4c7][Math.floor(Math.random() * 3)], roughness: 0.6 }) : null;
  const mats = { paint, glass: glassMat, dark: darkMat, head: headMat, tail, chrome: chromeMat, cargo };
  const key = type + (player ? ':player' : '');
  const parts = (carGeoCache[key] ||= carParts(T, player));
  for (const { role, geo } of parts) {
    const m = new THREE.Mesh(geo, mats[role]);
    m.castShadow = CAST[role];
    body.add(m);
  }
  const hl = T.l / 2;
  // wheels
  const wheelGeo = wheelGeos(T.wheelR, T.truck ? 0.4 : 0.3);
  const wheels = [];
  const wx = (T.truck ? 2.3 : T.w) / 2 - 0.12;
  T.wheelZ.forEach((z, zi) => {
    for (const side of [-1, 1]) {
      const pivot = new THREE.Group();
      pivot.position.set(side * wx, T.wheelR, z);
      const spin = new THREE.Group();
      const w = new THREE.Mesh(wheelGeo, wheelMat);
      w.castShadow = player;
      spin.add(w);
      pivot.add(spin);
      root.add(pivot);
      wheels.push({ pivot, spin, front: zi === 0 });
    }
  });
  // soft contact shadow
  const blob = new THREE.Mesh(new THREE.PlaneGeometry(T.w + 1.1, T.l + 1.4).rotateX(-Math.PI / 2), blobMat);
  blob.position.y = 0.04;
  root.add(blob);

  let flames = null;
  if (player) {
    const fm = new THREE.MeshBasicMaterial({ color: new THREE.Color(1.6, 2.6, 6), transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false });
    const fg = new THREE.ConeGeometry(0.09, 0.9, 10).rotateX(-Math.PI / 2).translate(0, 0, 0.45);
    flames = [-0.45, 0.45].map((x) => {
      const f = new THREE.Mesh(fg, fm); f.position.set(x, T.bodyY - 0.18, hl + 0.12); f.visible = false; body.add(f); return f;
    });
  }
  return { root, body, wheels, tail, paint, flames, T, hw: (T.truck ? 2.45 : T.w) / 2, hl: T.l / 2 + 0.05, wheelR: T.wheelR };
}

// =====================================================================
// Player
// =====================================================================
const playerCar = buildCar('sport', 0xd8202f, true);
scene.add(playerCar.root);
const player = {};
function resetPlayer() {
  const w = toWorld(0, 2);
  Object.assign(player, {
    x: w.x, z: w.z, y: roadY(0), heading: roadHeading(0), vx: 0, vz: 0, fwd: 0, lat: 0, steer: 0,
    yawRate: 0, accel: 0, nitro: 1, nitroOn: false, health: 3, invuln: 0, s: 0, u: 2, offroad: false,
    maxProg: 0, score: 0, topSpeed: 0, nearMisses: 0, combo: 0, comboTimer: 0, nextHeart: 2500,
    drift: 0, driftCool: 0, pitch: 0, roll: 0, bodyRoll: 0, bodyPitch: 0, mult: 1, rpm: 900, gear: 1, slip: 0,
  });
}

// =====================================================================
// Traffic
// =====================================================================
const TRAFFIC_COLORS = [0xe9e9ea, 0x1f2024, 0x274f96, 0xb72a22, 0xd8d8d8, 0x6d7279, 0x2f6d50, 0xd4a72c, 0x8c939c, 0x4b2f88, 0xf06a2a, 0x1e8fa8];
const traffic = [];
const MAX_TRAFFIC = 24;
function pickType() { const r = Math.random(); return r < 0.5 ? 'sedan' : r < 0.82 ? 'suv' : 'truck'; }
for (let i = 0; i < MAX_TRAFFIC; i++) {
  const type = pickType();
  const car = buildCar(type, TRAFFIC_COLORS[i % TRAFFIC_COLORS.length]);
  car.root.visible = false;
  scene.add(car.root);
  traffic.push({ car, type, active: false, s: 0, u: 0, dir: -1, speed: 0, x: 0, z: 0, y: 0, heading: 0, vx: 0, vz: 0, hit: false, yawRate: 0, prevLz: 0, near: false, mass: car.T.mass });
}
function spawnTraffic(t, minAhead, maxAhead) {
  for (let tries = 0; tries < 10; tries++) {
    const lane = LANES[Math.floor(Math.random() * 4)];
    const s = player.z - rand(minAhead, maxAhead);
    let ok = true;
    for (const o of traffic) if (o !== t && o.active && Math.abs(o.u - lane) < 1 && Math.abs(o.s - s) < 32) { ok = false; break; }
    if (!ok) continue;
    t.active = true; t.hit = false; t.near = false; t.yawRate = 0;
    t.s = s; t.u = lane; t.dir = lane > 0 ? -1 : 1;
    const truck = t.type === 'truck';
    t.baseSpeed = lane > 0 ? (lane > 4 ? rand(17, 23) : rand(25, 32)) : rand(22, 31);
    if (truck) t.baseSpeed *= 0.85;
    t.speed = t.baseSpeed;
    t.car.root.visible = true;
    placeTraffic(t);
    t.prevLz = null;
    return true;
  }
  t.active = false; t.car.root.visible = false;
  return false;
}
function placeTraffic(t) {
  const w = toWorld(t.s, t.u);
  t.x = w.x; t.z = w.z;
  t.heading = roadHeading(t.s) + (t.dir > 0 ? Math.PI : 0);
  const fx = -Math.sin(t.heading), fz = -Math.cos(t.heading);
  t.vx = fx * t.speed; t.vz = fz * t.speed;
}
function resetTraffic() {
  traffic.forEach((t) => { t.active = false; t.car.root.visible = false; });
  for (let i = 0; i < 12; i++) spawnTraffic(traffic[i], 90, 650);
}
function updateTraffic(dt) {
  const prog = Math.max(0, -player.z);
  const want = Math.min(MAX_TRAFFIC, 12 + Math.floor(prog / 700));
  let active = 0;
  for (const t of traffic) if (t.active) active++;
  for (const t of traffic) {
    if (!t.active) {
      if (active < want && spawnTraffic(t, 300, 620)) active++;
      continue;
    }
    if (!t.hit) {
      // keep distance to the car ahead in the same lane
      let target = t.baseSpeed;
      for (const o of traffic) {
        if (o === t || !o.active) continue;
        const ou = o.hit ? project(o.x, o.z).u : o.u;
        if (Math.abs(ou - t.u) > 2.2) continue;
        const gap = (o.hit ? PJ.s : o.s) - t.s;
        const ahead = t.dir < 0 ? -gap : gap;
        if (ahead > 0 && ahead < 22) {
          const os = o.hit ? 0 : o.speed;
          target = Math.min(target, ahead < 9 ? 0 : os);
        }
      }
      t.speed = lerp(t.speed, target, damp(2.5, dt));
      t.s += t.dir * t.speed * dt;
      placeTraffic(t);
      t.y = roadY(t.s);
      t.pitch = Math.atan(roadDY(t.s)) * -t.dir;
    } else {
      // free-body wreck
      const sp = Math.hypot(t.vx, t.vz);
      if (sp > 0.01) { const k = Math.max(0, sp - 7 * dt) / sp; t.vx *= k; t.vz *= k; }
      t.x += t.vx * dt; t.z += t.vz * dt;
      t.heading += t.yawRate * dt;
      t.yawRate *= Math.exp(-1.8 * dt);
      t.y = groundAt(t.x, t.z);
      t.pitch = 0;
      t.s = PJ.s;
    }
    const sp = t.hit ? Math.hypot(t.vx, t.vz) : t.speed;
    for (const w of t.car.wheels) w.spin.rotation.x -= (sp / t.car.wheelR) * dt;
    t.car.root.position.set(t.x, t.y, t.z);
    t.car.root.rotation.set(t.pitch, t.heading, 0, 'YXZ');
    const ddx = t.x - player.x, ddz = t.z - player.z;
    t.car.root.visible = ddx * ddx + ddz * ddz < 350 * 350;   // hidden by fog anyway
    // recycle
    if (t.z > player.z + 70 || t.z < player.z - 900) {
      t.active = false; t.car.root.visible = false; active--;
    }
  }
}

// =====================================================================
// Effects: skid marks & tyre smoke
// =====================================================================
const SKID_N = 900;
const skidMesh = new THREE.InstancedMesh(
  new THREE.PlaneGeometry(0.26, 1).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 0x0c0c0c, transparent: true, opacity: 0.5, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -4 }),
  SKID_N);
skidMesh.frustumCulled = false;
scene.add(skidMesh);
let skidIdx = 0;
const skidLast = [null, null];
function clearSkids() {
  _m.makeScale(0, 0, 0);
  for (let i = 0; i < SKID_N; i++) skidMesh.setMatrixAt(i, _m);
  skidMesh.instanceMatrix.needsUpdate = true;
  skidLast[0] = skidLast[1] = null;
}
function addSkid(k, x, z) {
  const last = skidLast[k];
  if (!last) { skidLast[k] = { x, z }; return; }
  const dx = x - last.x, dz = z - last.z, d = Math.hypot(dx, dz);
  if (d < 0.35) return;
  if (d > 4) { skidLast[k] = { x, z }; return; }
  const mx = (x + last.x) / 2, mz = (z + last.z) / 2;
  _e.set(0, Math.atan2(dx, dz), 0); _q.setFromEuler(_e);
  _p.set(mx, groundAt(mx, mz) + 0.03, mz); _s.set(1, 1, d + 0.05);
  _m.compose(_p, _q, _s);
  skidMesh.setMatrixAt(skidIdx, _m);
  skidIdx = (skidIdx + 1) % SKID_N;
  skidMesh.instanceMatrix.needsUpdate = true;
  last.x = x; last.z = z;
}

const SMOKE_N = 260;
const smokeGeo = new THREE.BufferGeometry();
const smokePos = new Float32Array(SMOKE_N * 3), smokeSize = new Float32Array(SMOKE_N), smokeAlpha = new Float32Array(SMOKE_N);
smokeGeo.setAttribute('position', new THREE.BufferAttribute(smokePos, 3));
smokeGeo.setAttribute('aSize', new THREE.BufferAttribute(smokeSize, 1));
smokeGeo.setAttribute('aAlpha', new THREE.BufferAttribute(smokeAlpha, 1));
const smokeTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 64;
  const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.5, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();
const smokeMat = new THREE.ShaderMaterial({
  transparent: true, depthWrite: false,
  uniforms: { map: { value: smokeTex }, uScale: { value: 400 }, uColor: { value: new THREE.Color(0xc9bdb3) } },
  vertexShader: `
    attribute float aSize; attribute float aAlpha; varying float vAlpha; uniform float uScale;
    void main(){ vAlpha = aAlpha; vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * uScale / max(-mv.z, 0.1); gl_Position = projectionMatrix * mv; }`,
  fragmentShader: `
    uniform sampler2D map; uniform vec3 uColor; varying float vAlpha;
    void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(uColor, t.a * vAlpha); }`,
});
const smoke = new THREE.Points(smokeGeo, smokeMat);
smoke.frustumCulled = false;
scene.add(smoke);
const parts = Array.from({ length: SMOKE_N }, () => ({ life: 0, max: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, size: 1 }));
let partIdx = 0, partsDirty = false;
function emitSmoke(x, y, z, vx, vz, strength) {
  const p = parts[partIdx]; partIdx = (partIdx + 1) % SMOKE_N;
  partsDirty = true;
  p.life = p.max = rand(0.7, 1.3);
  p.x = x + rand(-0.2, 0.2); p.y = y + 0.25; p.z = z + rand(-0.2, 0.2);
  p.vx = vx * 0.25 + rand(-1, 1); p.vy = rand(0.6, 1.6); p.vz = vz * 0.25 + rand(-1, 1);
  p.size = rand(0.5, 0.8) * (0.7 + strength * 0.5);
}
let smokeAlive = 0;
function updateSmoke(dt) {
  if (smokeAlive === 0 && partsDirty === false) return;
  partsDirty = false;
  smokeAlive = 0;
  for (let i = 0; i < SMOKE_N; i++) {
    const p = parts[i];
    if (p.life > 0) {
      p.life -= dt;
      smokeAlive++;
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
      p.vx *= 0.96; p.vz *= 0.96;
      const t = 1 - p.life / p.max;
      smokePos[i * 3] = p.x; smokePos[i * 3 + 1] = p.y; smokePos[i * 3 + 2] = p.z;
      smokeSize[i] = p.size * (1 + t * 3);
      smokeAlpha[i] = Math.sin(Math.min(1, t * 4) * Math.PI / 2) * (1 - t) * 0.32;
    } else smokeAlpha[i] = 0;
  }
  smokeGeo.attributes.position.needsUpdate = true;
  smokeGeo.attributes.aSize.needsUpdate = true;
  smokeGeo.attributes.aAlpha.needsUpdate = true;
}
function clearSmoke() { parts.forEach((p) => (p.life = 0)); partsDirty = true; }

// =====================================================================
// Audio (synthesised, no assets)
// =====================================================================
class Sound {
  constructor() { this.ctx = null; this.muted = store.get('sd-muted', false); }
  init() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    const ctx = (this.ctx = new AC());
    this.master = ctx.createGain(); this.master.gain.value = this.muted ? 0 : 0.55;
    const comp = ctx.createDynamicsCompressor();
    this.master.connect(comp).connect(ctx.destination);

    this.engF = ctx.createBiquadFilter(); this.engF.type = 'lowpass'; this.engF.frequency.value = 700; this.engF.Q.value = 3;
    this.engG = ctx.createGain(); this.engG.gain.value = 0;
    this.engF.connect(this.engG).connect(this.master);
    this.o1 = ctx.createOscillator(); this.o1.type = 'sawtooth';
    this.o2 = ctx.createOscillator(); this.o2.type = 'sawtooth'; this.o2.detune.value = 14;
    this.o3 = ctx.createOscillator(); this.o3.type = 'square';
    const g3 = ctx.createGain(); g3.gain.value = 0.4;
    this.o1.connect(this.engF); this.o2.connect(this.engF); this.o3.connect(g3).connect(this.engF);
    [this.o1, this.o2, this.o3].forEach((o) => { o.frequency.value = 30; o.start(); });

    const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this.noise = buf;
    const loop = (type, freq, q) => {
      const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
      const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
      const g = ctx.createGain(); g.gain.value = 0;
      src.connect(f).connect(g).connect(this.master); src.start();
      return g;
    };
    this.skidG = loop('bandpass', 1100, 1.8);
    this.windG = loop('lowpass', 420, 0.7);
    this.nosG = loop('highpass', 2500, 0.5);
  }
  update(rpm, load, slip, speed, nitro, active) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const f = (rpm / 60) * 2;
    this.o1.frequency.setTargetAtTime(f, t, 0.03);
    this.o2.frequency.setTargetAtTime(f * 1.003, t, 0.03);
    this.o3.frequency.setTargetAtTime(f * 0.5, t, 0.03);
    this.engF.frequency.setTargetAtTime(350 + rpm * 0.22 + load * 900, t, 0.05);
    this.engG.gain.setTargetAtTime(active ? 0.09 + load * 0.11 : 0.05, t, 0.06);
    this.skidG.gain.setTargetAtTime(active ? clamp((slip - 4) / 7, 0, 1) * 0.32 : 0, t, 0.05);
    this.windG.gain.setTargetAtTime(clamp(speed / 85, 0, 1) * 0.35, t, 0.1);
    this.nosG.gain.setTargetAtTime(nitro ? 0.08 : 0, t, 0.05);
  }
  crash(intensity) {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.setValueAtTime(2500, t); f.frequency.exponentialRampToValueAtTime(150, t + 0.6);
    const g = ctx.createGain(); g.gain.setValueAtTime(clamp(intensity / 25, 0.25, 1) * 0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
    src.connect(f).connect(g).connect(this.master); src.start(t); src.stop(t + 0.8);
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.setValueAtTime(90, t); o.frequency.exponentialRampToValueAtTime(35, t + 0.4);
    const og = ctx.createGain(); og.gain.setValueAtTime(0.6, t); og.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    o.connect(og).connect(this.master); o.start(t); o.stop(t + 0.5);
  }
  whoosh() {
    if (!this.ctx) return;
    const ctx = this.ctx, t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.noise;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 2; f.frequency.setValueAtTime(400, t); f.frequency.exponentialRampToValueAtTime(2400, t + 0.25); f.frequency.exponentialRampToValueAtTime(300, t + 0.5);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + 0.15); g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    src.connect(f).connect(g).connect(this.master); src.start(t); src.stop(t + 0.55);
    const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(660, t + 0.05); o.frequency.exponentialRampToValueAtTime(1320, t + 0.2);
    const og = ctx.createGain(); og.gain.setValueAtTime(0.0001, t); og.gain.exponentialRampToValueAtTime(0.12, t + 0.08); og.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    o.connect(og).connect(this.master); o.start(t); o.stop(t + 0.4);
  }
  setMuted(m) {
    this.muted = m; store.set('sd-muted', m);
    if (this.master) this.master.gain.setTargetAtTime(m ? 0 : 0.55, this.ctx.currentTime, 0.05);
  }
}
const sound = new Sound();

// =====================================================================
// Input
// =====================================================================
const input = { gas: false, brake: false, left: false, right: false, hand: false, nitro: false };
const KEYMAP = {
  ArrowUp: 'gas', KeyW: 'gas', ArrowDown: 'brake', KeyS: 'brake', ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right', Space: 'hand', ShiftLeft: 'nitro', ShiftRight: 'nitro', KeyN: 'nitro',
};
addEventListener('keydown', (e) => {
  const k = KEYMAP[e.code];
  if (k) { input[k] = true; e.preventDefault(); }
  if (e.repeat) return;
  if (e.code === 'Enter') { if (state === 'menu') startGame(); else if (state === 'over') restart(); }
  if (e.code === 'KeyC') camMode = (camMode + 1) % 3;
  if (e.code === 'KeyM') { sound.setMuted(!sound.muted); updateOptLabels(); }
  if (e.code === 'KeyR' && state === 'over') restart();
  if (e.code === 'KeyP' || e.code === 'Escape') togglePause();
});
addEventListener('keyup', (e) => { const k = KEYMAP[e.code]; if (k) input[k] = false; });
addEventListener('blur', () => { for (const k in input) input[k] = false; if (state === 'play') togglePause(); });

const touchMap = { left: 'left', right: 'right', gas: 'gas', brake: 'brake', nitro: 'nitro' };
document.querySelectorAll('#touch button').forEach((b) => {
  const k = touchMap[b.dataset.k];
  const on = (e) => { e.preventDefault(); input[k] = true; b.classList.add('on'); sound.init(); };
  const off = (e) => { e.preventDefault(); input[k] = false; b.classList.remove('on'); };
  b.addEventListener('pointerdown', on);
  b.addEventListener('pointerup', off);
  b.addEventListener('pointercancel', off);
  b.addEventListener('pointerleave', off);
});
document.getElementById('pausebtn').addEventListener('click', togglePause);

// ---- rotate to landscape ------------------------------------------------
let toastT = 0;
function toast(text, sub) {
  const el = document.getElementById('toast');
  el.innerHTML = text + (sub ? `<small>${sub}</small>` : '');
  el.classList.add('on');
  clearTimeout(toastT);
  toastT = setTimeout(() => el.classList.remove('on'), 2600);
}
const isLandscape = () => innerWidth > innerHeight;
async function rotateScreen() {
  const docEl = document.documentElement;
  const wantLandscape = !isLandscape();
  if (wantLandscape) {
    try {
      if (!document.fullscreenElement) {
        if (docEl.requestFullscreen) await docEl.requestFullscreen({ navigationUI: 'hide' });
        else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
      }
    } catch {}
    try {
      await screen.orientation.lock('landscape');
      return true;
    } catch {
      toast('TURN YOUR PHONE SIDEWAYS', 'If it stays upright, switch off rotation lock');
      return false;
    }
  } else {
    try { screen.orientation.unlock(); } catch {}
    try { if (document.fullscreenElement) await document.exitFullscreen(); } catch {}
    if (isLandscape()) toast('TURN YOUR PHONE UPRIGHT');
    return true;
  }
}
document.getElementById('rotbtn').addEventListener('click', () => { sound.init(); rotateScreen(); });
document.getElementById('sidewaysbtn').addEventListener('click', async () => {
  sound.init();
  if (!isLandscape()) await rotateScreen();
  startGame();
});

// ---- tilt (gyro) steering -------------------------------------------
// Hold the phone like a steering wheel. Works on normal https pages;
// browsers that block motion sensors simply never send events.
const tilt = { on: false, live: false, value: 0, timer: 0 };
const tiltBtn = document.getElementById('tiltbtn');
function screenAngle() {
  const a = (screen.orientation && screen.orientation.angle) ?? window.orientation ?? 0;
  return ((a % 360) + 360) % 360;
}
function onOrient(e) {
  if (e.beta === null || e.gamma === null) return;
  const ang = screenAngle();
  let raw;                                   // degrees, + = tilt left
  if (ang === 90) raw = -e.beta;
  else if (ang === 270) raw = e.beta;
  else if (ang === 180) raw = e.gamma;
  else raw = -e.gamma;
  const dead = 2.5, full = 24;
  const a = Math.abs(raw);
  tilt.value = a < dead ? 0 : Math.sign(raw) * clamp((a - dead) / (full - dead), 0, 1);
  if (!tilt.live) { tilt.live = true; clearTimeout(tilt.timer); }
}
function setTilt(on) {
  tilt.on = on; tilt.live = false; tilt.value = 0;
  tiltBtn.classList.toggle('on', on);
  tiltBtn.textContent = on ? 'TILT ON' : 'TILT';
  document.getElementById('touch').classList.toggle('tilt', on);
  store.set('sd-tilt', on);
  if (on) {
    addEventListener('deviceorientation', onOrient);
    clearTimeout(tilt.timer);
    tilt.timer = setTimeout(() => {
      if (!tilt.live) { setTilt(false); popup('NO TILT', 'not available here', 'bad'); }
    }, 1800);
  } else removeEventListener('deviceorientation', onOrient);
}
tiltBtn.addEventListener('pointerdown', (e) => e.preventDefault());
tiltBtn.addEventListener('click', async () => {
  sound.init();
  if (tilt.on) { setTilt(false); return; }
  const DOE = window.DeviceOrientationEvent;
  if (!DOE) { popup('NO TILT', 'not available here', 'bad'); return; }
  if (typeof DOE.requestPermission === 'function') {   // iPhone / iPad
    // ask, but still listen: if no tilt data arrives we switch off below
    try { await DOE.requestPermission(); } catch {}
  }
  setTilt(true);
  popup('TILT ON', 'hold it like a wheel', 'good');
});
// re-enable automatically where no permission prompt is needed
if (store.get('sd-tilt', false) && window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') setTilt(true);
document.getElementById('startbtn').addEventListener('click', startGame);
document.getElementById('restartbtn').addEventListener('click', restart);
document.getElementById('resumebtn').addEventListener('click', togglePause);

// =====================================================================
// HUD
// =====================================================================
const $ = (id) => document.getElementById(id);
const hud = {
  score: $('score'), dist: $('dist'), mult: $('mult'), speed: $('speed'), gear: $('gear'), arc: $('arc'), nitro: $('nitro'),
  hearts: $('hearts'), oncoming: $('oncoming'), drift: $('drift'), wrong: $('wrongway'), popups: $('popups'),
  vignette: $('vignette'), speedfx: $('speedfx'),
};
const HEART_SVG = '<svg class="heart" viewBox="0 0 24 24"><path fill="#ff4d6d" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.6 1.1 5.3 3 1.7-1.9 3.2-3 5.3-3 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>';
hud.hearts.innerHTML = HEART_SVG.repeat(3);
function renderHearts() {
  [...hud.hearts.children].forEach((h, i) => h.classList.toggle('lost', i >= player.health));
}
function popup(text, sub, cls = '') {
  const el = document.createElement('div');
  el.className = 'popup ' + cls;
  el.innerHTML = text + (sub ? `<small>${sub}</small>` : '');
  while (hud.popups.children.length >= 3) hud.popups.firstChild.remove();
  [...hud.popups.children].forEach((c) => { c.style.top = (parseFloat(c.style.top) || 0) - 56 + 'px'; });
  el.style.top = '0px';
  hud.popups.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}
const hudCache = {};
function setText(key, el, v) { if (hudCache[key] !== v) { hudCache[key] = v; el.textContent = v; } }
function setStyle(key, el, prop, v) { if (hudCache[key] !== v) { hudCache[key] = v; el.style[prop] = v; } }
function setClass(key, el, cls, on) { if (hudCache[key] !== on) { hudCache[key] = on; el.classList.toggle(cls, on); } }
let lastMult = 1;
function updateHUD() {
  const kmh = Math.abs(player.fwd) * 3.6;
  const kmhR = Math.round(kmh);
  setText('speed', hud.speed, String(kmhR));
  if (hudCache.arc !== kmhR) { hudCache.arc = kmhR; hud.arc.setAttribute('stroke-dasharray', `${(377 * clamp(kmh / 320, 0, 1)).toFixed(1)} 503`); }
  setText('gear', hud.gear, player.fwd < -0.5 ? 'R' : kmh < 1 ? 'N' : String(player.gear));
  setText('score', hud.score, Math.floor(player.score).toLocaleString('en-US'));
  setText('dist', hud.dist, (player.maxProg / 1000).toFixed(2) + ' km');
  setText('mult', hud.mult, 'x' + player.mult);
  if (player.mult !== lastMult) {
    hud.mult.classList.add('pop'); setTimeout(() => hud.mult.classList.remove('pop'), 200); lastMult = player.mult;
  }
  setStyle('nitro', hud.nitro, 'width', Math.round(player.nitro * 100) + '%');
  setClass('nitroOn', hud.nitro, 'active', player.nitroOn);
  setClass('onc', hud.oncoming, 'on', state === 'play' && player.oncoming);
  setClass('wrong', hud.wrong, 'on', state === 'play' && !!player.wrongWay);
  setClass('drift', hud.drift, 'on', state === 'play' && player.drift > 40);
  if (player.drift > 40) setText('driftT', hud.drift, 'DRIFT ' + Math.floor(player.drift));
  setStyle('sfx', hud.speedfx, 'opacity', (clamp((kmh - 180) / 140, 0, 1) * 0.8 + (player.nitroOn ? 0.5 : 0)).toFixed(2));
}

// =====================================================================
// Game state
// =====================================================================
let state = 'menu', camMode = 0, timeScale = 1, shake = 0, dyingT = 0;
let best = store.get('sd-best', 0);
function showBest() {
  const t = best > 0 ? 'BEST  ' + Math.floor(best).toLocaleString('en-US') : '';
  $('bestmenu').textContent = t; $('bestover').textContent = t;
}
showBest();

function releaseInputs() {
  for (const k in input) input[k] = false;
  document.querySelectorAll('#touch button.on').forEach((b) => b.classList.remove('on'));
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
}
function startGame() {
  if (state !== 'menu') return;
  releaseInputs();
  sound.init();
  state = 'play';
  $('menu').classList.add('hidden');
  $('hud').classList.remove('hidden');
  $('touch').classList.add('show');
  $('pausebtn').classList.add('show'); $('rotbtn').classList.add('show');
  camYaw = player.heading;
}
function restart() {
  if (state !== 'over') return;
  releaseInputs();
  resetWorld();
  hud.popups.textContent = '';
  shake = 0; vigT = 0;
  state = 'play'; timeScale = 1;
  $('over').classList.add('hidden');
  $('hud').classList.remove('hidden');
  $('touch').classList.add('show');
  $('pausebtn').classList.add('show'); $('rotbtn').classList.add('show');
  camYaw = player.heading;
  sound.init();
}
function togglePause() {
  if (state === 'play') { state = 'paused'; releaseInputs(); $('pause').classList.remove('hidden'); if (sound.ctx) sound.ctx.suspend(); }
  else if (state === 'paused') { state = 'play'; releaseInputs(); $('pause').classList.add('hidden'); if (sound.ctx) sound.ctx.resume(); last = performance.now(); }
}
function gameOver() {
  state = 'over';
  releaseInputs();
  const isBest = player.score > best;
  if (isBest) { best = player.score; store.set('sd-best', best); }
  $('o-score').textContent = Math.floor(player.score).toLocaleString('en-US');
  $('o-dist').textContent = (player.maxProg / 1000).toFixed(2) + ' km';
  $('o-top').textContent = Math.round(player.topSpeed * 3.6) + ' km/h';
  $('o-near').textContent = player.nearMisses;
  $('newbest').textContent = isBest ? '★ NEW BEST ★' : '';
  showBest();
  $('over').classList.remove('hidden');
  $('hud').classList.add('hidden');
  $('touch').classList.remove('show');
  $('pausebtn').classList.remove('show'); $('rotbtn').classList.remove('show');
}
function resetWorld() {
  resetPlayer();
  for (const [, g] of chunks) disposeChunk(g);
  chunks.clear();
  updateChunks(true);
  resetTraffic();
  clearSkids();
  clearSmoke();
  renderHearts();
}

// =====================================================================
// Player physics
// =====================================================================
const GEARS = [0, 17, 30, 43, 56, 70, 999];
function updatePlayer(dt) {
  const p = player;
  const ctl = state === 'play';
  const thr = ctl && input.gas ? 1 : 0, brk = ctl && input.brake ? 1 : 0, hb = ctl && input.hand;
  const digital = (input.left ? 1 : 0) - (input.right ? 1 : 0);
  const steerIn = !ctl ? 0 : digital !== 0 ? digital : tilt.on && tilt.live ? tilt.value : 0;
  p.steer += (steerIn - p.steer) * Math.min(1, (tilt.on && digital === 0 ? 10 : steerIn !== 0 ? 4.2 : 7) * dt);

  let h = p.heading;
  let fx = -Math.sin(h), fz = -Math.cos(h), rx = Math.cos(h), rz = -Math.sin(h);
  let fwd = p.vx * fx + p.vz * fz, lat = p.vx * rx + p.vz * rz;

  project(p.x, p.z);
  p.s = PJ.s; p.u = PJ.u;
  const off = Math.abs(p.u) > RH + 0.6;
  p.offroad = off;

  const nitroOn = ctl && input.nitro && p.nitro > 0.01 && fwd > 5 && !brk;
  p.nitroOn = nitroOn;
  p.nitro = nitroOn ? Math.max(0, p.nitro - dt * 0.3) : Math.min(1, p.nitro + dt * 0.03);

  const vmax = (nitroOn ? 115 : 88) * (off ? 0.55 : 1);
  let a = 0;
  if (thr) a += fwd >= -0.5 ? (15 + (nitroOn ? 14 : 0)) * Math.max(0, 1 - fwd / vmax) : 30;
  if (brk) a -= fwd > 0.5 ? 34 : 9 * Math.max(0, 1 + fwd / 14);
  if (!thr && !brk) a -= 1.4 * Math.sign(fwd);
  if (hb) a -= 5 * Math.sign(fwd);
  if (!ctl) a -= 6 * Math.sign(fwd);
  a -= 0.0009 * fwd * Math.abs(fwd) + 0.2 * Math.sign(fwd);
  if (off) a -= fwd * 0.35;
  const before = fwd;
  fwd += a * dt;
  if (!thr && !brk && Math.sign(fwd) !== Math.sign(before) && before !== 0) fwd = 0;
  p.accel = lerp(p.accel, (fwd - before) / Math.max(dt, 1e-4), damp(6, dt));

  const sp = Math.abs(fwd);
  let yaw = (p.steer * 2.1 * clamp(sp / 8, 0, 1)) / (1 + sp * 0.017);
  if (fwd < 0) yaw = -yaw;
  if (hb) yaw *= 1.55;
  p.heading += yaw * dt;
  p.yawRate = yaw;

  // carry momentum through the turn, then let the tyres bite back
  const vx = fx * fwd + rx * lat, vz = fz * fwd + rz * lat;
  h = p.heading;
  fx = -Math.sin(h); fz = -Math.cos(h); rx = Math.cos(h); rz = -Math.sin(h);
  fwd = vx * fx + vz * fz; lat = vx * rx + vz * rz;
  const grip = hb ? 1.2 : off ? 3.5 : 8.5;
  const latBefore = lat;
  lat *= Math.exp(-grip * dt);
  fwd -= Math.sign(fwd) * Math.min(Math.abs(fwd), Math.abs(latBefore - lat) * 0.18);
  p.vx = fx * fwd + rx * lat; p.vz = fz * fwd + rz * lat;
  p.fwd = fwd; p.lat = lat;
  p.slip = Math.abs(lat);
  p.x += p.vx * dt; p.z += p.vz * dt;

  // follow the ground
  const gy = groundAt(p.x, p.z);
  p.y = gy;
  const hF = groundAt(p.x + fx * 1.6, p.z + fz * 1.6), hB = groundAt(p.x - fx * 1.6, p.z - fz * 1.6);
  const hR = groundAt(p.x + rx * 0.9, p.z + rz * 0.9), hL = groundAt(p.x - rx * 0.9, p.z - rz * 0.9);
  p.pitch = lerp(p.pitch, Math.atan2(hF - hB, 3.2), damp(12, dt));
  p.roll = lerp(p.roll, Math.atan2(hR - hL, 1.8), damp(12, dt));
  const bump = off ? Math.sin(performance.now() * 0.05) * 0.02 * clamp(sp / 20, 0, 1) : 0;
  p.bodyRoll = lerp(p.bodyRoll, clamp(-yaw * fwd * 0.0045, -0.09, 0.09) + bump, damp(6, dt));
  p.bodyPitch = lerp(p.bodyPitch, clamp(p.accel * 0.0028, -0.06, 0.05), damp(5, dt));

  // engine / gears
  let g = 1; while (g < 6 && sp > GEARS[g]) g++;
  const lo = g === 1 ? 0 : GEARS[g - 1] * 0.55, hi = g === 6 ? 120 : GEARS[g];
  const targetRpm = 900 + 6400 * clamp((sp - lo) / (hi - lo), 0, 1) + (thr && sp < 3 ? 2200 : 0);
  p.gear = g;
  p.rpm = lerp(p.rpm, targetRpm, damp(12, dt));
  p.topSpeed = Math.max(p.topSpeed, sp);

  // direction checks
  const rh = roadHeading(p.s);
  const align = Math.cos(angDiff(h, rh));
  p.wrongWay = fwd > 8 && align < -0.3;
  p.oncoming = !off && p.u < -0.3 && fwd > 12 && align > 0.5;

  if (!ctl) return;
  // scoring
  const prog = -p.z;
  const kmh = sp * 3.6;
  p.mult = (1 + Math.floor(kmh / 100)) * (p.oncoming ? 2 : 1);
  if (prog > p.maxProg) { p.score += (prog - p.maxProg) * p.mult; p.maxProg = prog; }
  if (p.maxProg > p.nextHeart) {
    p.nextHeart += 2500;
    if (p.health < 3) { p.health++; renderHearts(); popup('+1 ♥', 'REPAIRED', 'good'); }
  }
  // drifting
  if (p.slip > 6 && sp > 14 && !off) { p.drift += p.slip * dt * 12; p.driftCool = 0.5; }
  else if (p.drift > 0) {
    p.driftCool -= dt;
    if (p.driftCool <= 0) {
      if (p.drift > 40) { const pts = Math.floor(p.drift) * 2; p.score += pts; popup('DRIFT', '+' + pts); }
      p.drift = 0;
    }
  }
  p.comboTimer -= dt;
  if (p.comboTimer <= 0) p.combo = 0;
  p.invuln -= dt;
}

function updatePlayerVisual(dt) {
  const p = player, c = playerCar;
  c.root.position.set(p.x, p.y, p.z);
  c.root.rotation.set(p.pitch, p.heading, p.roll, 'YXZ');
  c.body.rotation.set(p.bodyPitch, 0, p.bodyRoll);
  c.body.position.y = -Math.abs(p.bodyRoll) * 0.3;
  for (const w of c.wheels) {
    w.spin.rotation.x -= (p.fwd / c.wheelR) * dt;
    if (w.front) w.pivot.rotation.y = p.steer * 0.42;
  }
  const braking = state === 'play' && input.brake && p.fwd > 0.5;
  c.tail.emissiveIntensity = lerp(c.tail.emissiveIntensity, braking ? 6 : 1.6, damp(15, dt));
  c.flames.forEach((f) => {
    f.visible = p.nitroOn;
    if (p.nitroOn) f.scale.set(1, 1, 0.7 + Math.random() * 0.8);
  });
  c.root.visible = camMode !== 2 || state !== 'play';
  // invulnerability blink
  if (p.invuln > 0 && state === 'play') c.root.visible = c.root.visible && Math.floor(p.invuln * 12) % 2 === 0;

  // tyre effects
  const fx = -Math.sin(p.heading), fz = -Math.cos(p.heading), rx = Math.cos(p.heading), rz = -Math.sin(p.heading);
  const hardBrake = state === 'play' && input.brake && p.fwd > 18;
  const skidding = (p.slip > 6.5 || hardBrake || (state === 'play' && input.hand && Math.abs(p.fwd) > 8)) && !p.offroad;
  for (let k = 0; k < 2; k++) {
    const side = k === 0 ? -1 : 1;
    const wx = p.x + rx * side * 0.86 + fx * 1.45 * -1, wz = p.z + rz * side * 0.86 + fz * 1.45 * -1;
    if (skidding) addSkid(k, wx, wz); else skidLast[k] = null;
    const strength = clamp((p.slip - 5) / 8, 0, 1) + (hardBrake ? 0.3 : 0);
    if (skidding && Math.random() < strength * 0.6 + 0.05) emitSmoke(wx, p.y, wz, p.vx, p.vz, strength);
    if (p.offroad && Math.abs(p.fwd) > 10 && Math.random() < 0.15) {
      emitSmoke(wx, p.y, wz, p.vx, p.vz, 0.4);
    }
  }
}

// =====================================================================
// Collisions & near misses
// =====================================================================
function updateCollisions() {
  const p = player;
  const PW = playerCar.hw, PL = playerCar.hl;
  for (const t of traffic) {
    if (!t.active) continue;
    const dx = p.x - t.x, dz = p.z - t.z;
    if (dx * dx + dz * dz > 400) { t.prevLz = null; continue; }
    const tfx = -Math.sin(t.heading), tfz = -Math.cos(t.heading), trx = Math.cos(t.heading), trz = -Math.sin(t.heading);
    const lx = dx * trx + dz * trz, lz = dx * tfx + dz * tfz;
    // effective half extents of the player in the traffic car's frame
    const rel = Math.abs(angDiff(p.heading, t.heading));
    const c = Math.abs(Math.cos(rel)), s = Math.abs(Math.sin(rel));
    const ex = PW * c + PL * s, ez = PW * s + PL * c;
    const ox = t.car.hw + ex - Math.abs(lx), oz = t.car.hl + ez - Math.abs(lz);
    if (ox > 0 && oz > 0) {
      let nx, nz, push;
      if (ox < oz) { const sg = Math.sign(lx) || 1; nx = trx * sg; nz = trz * sg; push = ox; }
      else { const sg = Math.sign(lz) || 1; nx = tfx * sg; nz = tfz * sg; push = oz; }
      p.x += nx * push; p.z += nz * push;
      const rvx = p.vx - t.vx, rvz = p.vz - t.vz;
      const vn = rvx * nx + rvz * nz;
      if (vn < 0) {
        const j = (-(1.35) * vn) / (1 + 1 / t.mass);
        p.vx += nx * j; p.vz += nz * j;
        // scrub tangential velocity a little
        const tvx = rvx - vn * nx, tvz = rvz - vn * nz;
        p.vx -= tvx * 0.25; p.vz -= tvz * 0.25;
        if (!t.hit) { t.hit = true; }
        t.vx -= (nx * j) / t.mass; t.vz -= (nz * j) / t.mass;
        t.yawRate += (Math.random() < 0.5 ? -1 : 1) * clamp(-vn * 0.12, 0.3, 3) / t.mass;
        // re-sync player's frame velocities
        const fx = -Math.sin(p.heading), fz = -Math.cos(p.heading);
        p.fwd = p.vx * fx + p.vz * fz;
        p.heading += (Math.random() - 0.5) * clamp(-vn * 0.01, 0, 0.25);
        impactHit(-vn, p.x - nx * 1.5, p.z - nz * 1.5, t.vx, t.vz);
      }
      t.near = true; // touched — no near-miss credit
    } else if (state === 'play') {
      // near miss: passed alongside without touching
      if (t.prevLz !== null && Math.sign(lz) !== Math.sign(t.prevLz) && !t.near) {
        const gap = Math.abs(lx) - t.car.hw - ex;
        const relSp = Math.hypot(p.vx - t.vx, p.vz - t.vz);
        if (gap < 1.5 && relSp > 18 && Math.abs(p.fwd) > 20) {
          t.near = true;
          p.nearMisses++; p.combo++; p.comboTimer = 4;
          const onc = t.dir > 0;
          const pts = (onc ? 500 : 250) * p.combo;
          p.score += pts;
          p.nitro = Math.min(1, p.nitro + 0.2);
          popup(onc ? 'CLOSE CALL!' : 'NEAR MISS', `+${pts}${p.combo > 1 ? '  ×' + p.combo : ''}`, 'good');
          sound.whoosh();
        }
      }
    }
    t.prevLz = lz;
  }
  // static scenery: trees, rocks, lamp posts
  const ci = Math.floor(-p.z / CHUNK);
  const PR2 = 1.05;
  for (let i = ci - 1; i <= ci + 1; i++) {
    const g = chunks.get(i);
    if (!g) continue;
    for (const o of g.userData.obstacles) {
      const dx = p.x - o.x, dz = p.z - o.z, min = o.r + PR2;
      const d2 = dx * dx + dz * dz;
      if (d2 >= min * min) continue;
      const d = Math.sqrt(d2) || 0.001, nx = dx / d, nz = dz / d;
      p.x = o.x + nx * min; p.z = o.z + nz * min;
      const vn = p.vx * nx + p.vz * nz;
      if (vn < 0) {
        p.vx -= 1.3 * vn * nx; p.vz -= 1.3 * vn * nz;
        p.vx *= 0.7; p.vz *= 0.7;
        const fx = -Math.sin(p.heading), fz = -Math.cos(p.heading);
        p.fwd = p.vx * fx + p.vz * fz;
        p.heading += (Math.random() - 0.5) * clamp(-vn * 0.015, 0, 0.4);
        impactHit(-vn, o.x + nx * o.r, o.z + nz * o.r, 0, 0);
      }
    }
  }
}
function impactHit(impact, x, z, vx, vz) {
  const p = player;
  if (impact > 4) {
    shake = Math.max(shake, clamp(impact / 25, 0.25, 1));
    sound.crash(impact);
    for (let k = 0; k < 10; k++) emitSmoke(x, p.y, z, vx, vz, 0.8);
  }
  if (state === 'play' && impact > 9 && p.invuln <= 0) {
    p.health--; p.invuln = 1.2; p.combo = 0;
    renderHearts();
    flashVignette();
    if (p.health <= 0) { state = 'dying'; dyingT = 0; popup('WRECKED', '', 'bad'); }
    else popup('CRASH!', `${p.health} ♥ LEFT`, 'bad');
  }
}
let vigT = 0;
function flashVignette() { vigT = 1; }

// =====================================================================
// Camera
// =====================================================================
let camYaw = 0, camY = 0, orbit = 0;
const camTarget = new THREE.Vector3();
function updateCamera(dt, rdt) {
  const p = player;
  const sp = Math.abs(p.fwd);
  if (state === 'menu') {
    orbit += rdt * 0.12;
    const a = p.heading + Math.PI * 0.85 + Math.sin(orbit) * 0.9;
    const R = 8.5;
    camera.position.set(p.x - Math.sin(a) * R, p.y + 2.2 + Math.sin(orbit * 0.7) * 0.6, p.z - Math.cos(a) * R);
    camera.lookAt(p.x, p.y + 0.9, p.z);
    camera.fov = 52; camera.updateProjectionMatrix();
    camY = camera.position.y; camYaw = p.heading;
    return;
  }
  const follow = camMode === 2 ? 25 : 5.5;
  camYaw += angDiff(camYaw, p.heading + (p.fwd < -2 ? 0 : 0)) * damp(follow, dt);
  const fx = -Math.sin(camYaw), fz = -Math.cos(camYaw);
  let dist, hgt, look;
  if (camMode === 0) { dist = 6.8 + sp * 0.03; hgt = 2.3 + sp * 0.006; look = 6; }
  else if (camMode === 1) { dist = 12 + sp * 0.03; hgt = 4.8; look = 8; }
  else { dist = -1.0; hgt = 1.0; look = 30; }
  const cx = p.x - fx * dist, cz = p.z - fz * dist;
  let ty = p.y + hgt;
  camY = camMode === 2 ? ty : lerp(camY, ty, damp(7, dt));
  camY = Math.max(camY, groundAt(cx, cz) + 0.7);
  let sx = 0, sy = 0;
  const vib = clamp((sp - 40) / 60, 0, 1) * 0.025 + (p.offroad ? clamp(sp / 30, 0, 1) * 0.05 : 0);
  const sh = shake * shake * 0.5 + vib;
  if (sh > 0) { sx = (Math.random() - 0.5) * sh; sy = (Math.random() - 0.5) * sh; }
  shake = Math.max(0, shake - rdt * 1.8);
  camera.position.set(cx + sx, camY + sy, cz);
  camTarget.set(p.x + fx * look, p.y + (camMode === 2 ? 0.9 : 1.0), p.z + fz * look);
  camera.lookAt(camTarget);
  const portrait = camera.aspect < 1 ? (1 - camera.aspect) * 28 : 0;
  const fovT = (camMode === 2 ? 70 : 60) + portrait + sp * 0.2 + (p.nitroOn ? 9 : 0);
  camera.fov = lerp(camera.fov, fovT, damp(3, dt));
  camera.updateProjectionMatrix();
}

// =====================================================================
// Post-processing
// =====================================================================
const MSAA = IS_TOUCH ? 2 : 4;
const rt = new THREE.WebGLRenderTarget(innerWidth * currentPR(), innerHeight * currentPR(), { type: THREE.HalfFloatType, samples: MSAA });
const composer = new EffectComposer(renderer, rt);
composer.setPixelRatio(currentPR());
composer.setSize(innerWidth, innerHeight);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.45, 0.5, 1.0);
composer.addPass(bloom);
composer.addPass(new OutputPass());

function onResize() {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  const pr = currentPR();
  renderer.setPixelRatio(pr);
  composer.setPixelRatio(pr);
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  bloom.setSize(innerWidth, innerHeight);
}
function applyQuality() {
  bloom.enabled = !settings.saver && bloomAllowed;
  onResize();
  updateOptLabels();
}
function updateOptLabels() {
  document.querySelectorAll('[data-opt="saver"]').forEach((b) => { b.textContent = settings.saver ? 'GRAPHICS: BATTERY SAVER' : 'GRAPHICS: BEST'; });
  document.querySelectorAll('[data-opt="sound"]').forEach((b) => { b.textContent = sound.muted ? 'SOUND: OFF' : 'SOUND: ON'; });
}
document.querySelectorAll('[data-opt]').forEach((b) => b.addEventListener('click', () => {
  if (b.dataset.opt === 'saver') { settings.saver = !settings.saver; store.set('sd-saver', settings.saver); }
  else { sound.setMuted(!sound.muted); updateOptLabels(); return b.blur(); }
  applyQuality();
  b.blur();
}));
// Watches the frame rate while driving; if the phone struggles, render fewer pixels.
const perf = { t: 0, frames: 0, warm: 0 };
function watchPerformance(rdt) {
  if (state !== 'play' || settings.saver) { perf.t = 0; perf.frames = 0; perf.warm = 0; return; }
  perf.warm += rdt;
  if (perf.warm < 3) return;            // ignore start-up hiccups
  perf.t += rdt; perf.frames++;
  if (perf.t < 2) return;
  const avg = perf.t / perf.frames;
  perf.t = 0; perf.frames = 0;
  if (avg > 1 / 45) {
    if (prScale > 0.7) { prScale -= 0.15; applyQuality(); }
    else if (bloomAllowed) { bloomAllowed = false; applyQuality(); }
  }
}
addEventListener('resize', onResize);
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'play') togglePause(); });

// =====================================================================
// Main loop
// =====================================================================
resetWorld();
updateCamera(0.016, 0.016);
let last = performance.now(), lastDraw = 0;
const STEP = 1 / 60;
function simulate(dt) {
  // physics in small equal steps: same handling at 30, 60 or 120 fps, and
  // fast cars can't skip through each other on slow frames
  const n = Math.max(1, Math.ceil(dt / STEP - 0.01));
  const h = dt / n;
  for (let i = 0; i < n; i++) {
    if (state !== 'menu') { updatePlayer(h); updateCollisions(); }
    updateTraffic(h);
  }
}
function frame(now) {
  requestAnimationFrame(frame);
  // paused: nothing moves, so nothing is drawn (the last picture stays on screen)
  if (state === 'paused') { last = now; return; }
  // battery saver and the menus run at 30 fps
  const cap = settings.saver || state === 'menu' || state === 'over' ? 1000 / 30 : 0;
  if (cap && now - lastDraw < cap - 3) return;
  lastDraw = now;
  const rdt = Math.min((now - last) / 1000, 0.1);
  last = now;

  if (state === 'dying') {
    dyingT += rdt;
    timeScale = lerp(timeScale, 0.25, damp(6, rdt));
    if (dyingT > 1.8) { timeScale = 1; gameOver(); }
  }
  const dt = rdt * timeScale;

  simulate(dt);
  updatePlayerVisual(dt);
  updateChunks();
  updateSmoke(dt);
  updateCamera(dt, rdt);

  // things that follow the player / camera
  sun.target.position.set(player.x, player.y, player.z);
  sun.position.copy(sun.target.position).addScaledVector(SUN_DIR, 150);
  sky.position.copy(camera.position);
  backdrop.position.set(camera.position.x, camera.position.y - 40, camera.position.z);
  smokeMat.uniforms.uScale.value = (renderer.domElement.height / 2) / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  bloom.strength = 0.45 + (player.nitroOn ? 0.2 : 0);

  if (vigT > 0 || hudCache.vig !== 0) {
    vigT = Math.max(0, vigT - rdt * 1.6);
    setStyle('vig', hud.vignette, 'opacity', vigT.toFixed(2));
    if (vigT === 0) hudCache.vig = 0;
  }
  sound.update(player.rpm, state === 'play' && input.gas ? 1 : 0, player.slip, Math.abs(player.fwd), player.nitroOn, state === 'play' || state === 'dying');
  if (state !== 'menu') updateHUD();
  watchPerformance(rdt);

  composer.render();
}
applyQuality();
requestAnimationFrame(frame);
// test hook, only with ?debug in the address
if (/[?&]debug\b/.test(location.search)) {
  window.__game = {
    player, input, traffic, roadDX, get state() { return state; }, startGame, gameOver, settings,
    sim(steps, dt = 1 / 60) {
      for (let i = 0; i < steps; i++) {
        simulate(dt); updatePlayerVisual(dt); updateChunks(); updateSmoke(dt); updateCamera(dt, dt);
        if (state === 'dying') { dyingT += dt; if (dyingT > 1.8) gameOver(); }
      }
    },
  };
}
