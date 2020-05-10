export const distance = (rgbOne, rgbTwo) => {
  return Math.pow(((r2 - r1) * 0.30), 2) +
    Math.pow(((g2 - g1) * 0.59), 2) +
    Math.pow(((b2 - b1) * 0.11), 2);
}
