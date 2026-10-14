/**
 * A 2.5-D hand that follows MediaPipe's 21-landmark topology.
 * 0 = wrist · 1–4 thumb · 5–8 index · 9–12 middle · 13–16 ring · 17–20 pinky.
 * Fingers curl by pitching each segment away from the viewer, so a folded finger
 * foreshortens and folds back toward the palm, the way a webcam actually sees it.
 * Mirrored view: the thumb sits on the right, like a selfie camera.
 */

export type Point = { x: number; y: number };
export type Curls = [number, number, number, number, number];

export const FINGERS = ["Thumb", "Index", "Middle", "Ring", "Pinky"] as const;
export const TIP_IDS = [4, 8, 12, 16, 20];

/** Bounding box that comfortably holds every pose (used for viewBoxes). */
export const HAND_BOX = { x: 70, y: 56, w: 300, h: 404 };

const WRIST: Point = { x: 204, y: 440 };
const THUMB_CMC: Point = { x: 252, y: 410 };

const DIGITS = [
  { base: { x: 252, y: 272 }, angle: -86, lengths: [76, 44, 32] }, // index
  { base: { x: 210, y: 258 }, angle: -91, lengths: [84, 50, 34] }, // middle
  { base: { x: 168, y: 266 }, angle: -97, lengths: [78, 46, 32] }, // ring
  { base: { x: 130, y: 292 }, angle: -106, lengths: [60, 36, 28] }, // pinky
];

const rad = (d: number) => (d * Math.PI) / 180;

export function handLandmarks(curls: Curls): Point[] {
  const pts: Point[] = new Array(21);
  pts[0] = WRIST;

  // Thumb: swings in-plane across the palm as it tucks.
  const tc = curls[0];
  let p = THUMB_CMC;
  pts[1] = p;
  let a = -52;
  const thumbLen = [52, 40, 32];
  const thumbBend = [-40, -42, -34];
  for (let i = 0; i < 3; i++) {
    a += thumbBend[i] * tc;
    const len = thumbLen[i] * (1 - 0.2 * tc);
    p = { x: p.x + Math.cos(rad(a)) * len, y: p.y + Math.sin(rad(a)) * len };
    pts[2 + i] = p;
  }

  // Fingers: pitch accumulates per joint (MCP, PIP, DIP).
  const bend = [74, 94, 62];
  DIGITS.forEach((d, f) => {
    const c = curls[f + 1];
    const start = 5 + f * 4;
    let q = d.base;
    pts[start] = q;
    let pitch = 0;
    for (let j = 0; j < 3; j++) {
      pitch += bend[j] * c;
      const len = d.lengths[j] * Math.cos(rad(pitch));
      q = { x: q.x + Math.cos(rad(d.angle)) * len, y: q.y + Math.sin(rad(d.angle)) * len };
      pts[start + 1 + j] = q;
    }
  });

  return pts;
}

/** Outline of the palm (wrist → thumb base → knuckles), for a filled silhouette. */
export function palmPath(pts: Point[]) {
  const ring = [0, 1, 2, 5, 9, 13, 17];
  return ring.map((i, k) => `${k ? "L" : "M"}${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`).join(" ") + " Z";
}

export const BONES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

/** Illustrative rule set: the same family of fingertip-state rules Air Draw is built on. */
export function readGesture(up: boolean[]): { name: string; action: string } {
  const [, i, m, r, p] = up;
  if (up.every(Boolean)) return { name: "Open palm", action: "clear canvas" };
  if (up.every((u) => !u)) return { name: "Fist", action: "idle: tracking paused" };
  if (i && !m && !r && !p) return { name: "Index only", action: "draw: fingertip is the pen" };
  if (i && m && !r && !p) return { name: "Two fingers", action: "hover: pen lifted, select" };
  return { name: "Unmapped pose", action: "no action" };
}
