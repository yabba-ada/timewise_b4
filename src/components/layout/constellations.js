// Eight stars travel between shapes: each constellation only repositions them,
// so the field can morph from one figure to the next. Radii and twinkle timing
// belong to the star itself, magnitudes stay constant as it flies.
export const POOL = [
  { r: 2, d: 4.5, delay: 0 },
  { r: 1.4, d: 5.5, delay: 1.2 },
  { r: 1.2, d: 6, delay: 2.4 },
  { r: 1.2, d: 5, delay: 3.1 },
  { r: 0.9, d: 6.5, delay: 4.2 },
  { r: 1.3, d: 5.2, delay: 0.7 },
  { r: 1.6, d: 5.8, delay: 1.8 },
  { r: 1.1, d: 6.2, delay: 3.6 },
];

const RAW = [
  {
    // Swan, flying tail-first up the sky.
    name: "Cygnus",
    stars: [
      { x: 63, y: 13 },
      { x: 44, y: 43 },
      { x: 19, y: 51 },
      { x: 72, y: 39 },
      { x: 36, y: 61 },
      { x: 29, y: 75 },
      { x: 50, y: 52 },
      { x: 58, y: 58 },
    ],
    links: [[0, 1], [1, 2], [1, 3], [1, 4], [4, 5]],
  },
  {
    // The Plough: bowl on the left, handle reaching right.
    name: "Big Dipper",
    stars: [
      { x: 24, y: 28 },
      { x: 20, y: 48 },
      { x: 42, y: 54 },
      { x: 46, y: 34 },
      { x: 60, y: 26 },
      { x: 74, y: 20 },
      { x: 88, y: 14 },
      { x: 55, y: 44 },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  },
  {
    // Dragon: head up on the left, body winding down and away to the right.
    name: "Draco",
    stars: [
      { x: 16, y: 24 },
      { x: 28, y: 16 },
      { x: 36, y: 30 },
      { x: 44, y: 44 },
      { x: 36, y: 58 },
      { x: 52, y: 68 },
      { x: 68, y: 62 },
      { x: 80, y: 48 },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7]],
  },
  {
    // The Hunter: shoulders, three-star belt, two knees, head above.
    name: "Orion",
    stars: [
      { x: 32, y: 20 },
      { x: 66, y: 24 },
      { x: 60, y: 46 },
      { x: 48, y: 48 },
      { x: 36, y: 50 },
      { x: 34, y: 76 },
      { x: 70, y: 72 },
      { x: 49, y: 8 },
    ],
    links: [[7, 0], [7, 1], [0, 4], [1, 2], [4, 3], [3, 2], [4, 5], [2, 6]],
  },
  {
    // The Queen: a bright zig-zag W across the sky.
    name: "Cassiopeia",
    stars: [
      { x: 10, y: 34 },
      { x: 24, y: 58 },
      { x: 48, y: 30 },
      { x: 62, y: 54 },
      { x: 86, y: 28 },
      { x: 50, y: 60 },
      { x: 70, y: 40 },
      { x: 35, y: 30 },
    ],
    links: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
];

export const CONSTELLATIONS = RAW.map((c) => ({
  ...c,
  visible: [...new Set(c.links.flat())],
}));

export const MAX_LINKS = Math.max(...CONSTELLATIONS.map((c) => c.links.length));