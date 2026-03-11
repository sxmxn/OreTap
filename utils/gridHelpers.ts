export const createEmptyGrid = (rows: number, cols: number) =>
  Array.from({ length: rows }, () => Array(cols).fill(0));

export const createBreakableGrid = (rows: number, cols: number, breakableChance: number = 0.7) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.random() < breakableChance)
  );

export const randomGrid = (rows: number, cols: number) =>
  Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
  );

export const checkPatternInGrid = (
  grid: number[][],
  pattern: { offsets: [number, number][] }
): boolean => {
  // Check all possible center positions for the pattern
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      // Check if this position forms the pattern
      const matches = pattern.offsets.every(([di, dj]) => {
        const ni = row + di;
        const nj = col + dj;
        if (ni < 0 || ni >= 10 || nj < 0 || nj >= 10) return false;
        return grid[ni][nj] === 1;
      });
      if (matches) return true;
    }
  }
  return false;
};