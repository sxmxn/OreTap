import { AUTO_MINER_RECORD, CLICK_RECORD, EAutoMinerUpgrades, EClickUpgrades, EMultiClickUpgrades, EPattern, MULTI_CLICK_RECORD, PATTERNS } from "@/types/global";
import * as FileSystem from "expo-file-system/legacy";
import { create } from "zustand";
import { checkPatternInGrid, createBreakableGrid, createEmptyGrid, randomGrid } from "../utils/gridHelpers";

interface GameState {
  grid: number[][];
  breakableGrid: boolean[][];
  money: number;
  currentUpgrade: EClickUpgrades;
  currentMultiClickUpgrade: EMultiClickUpgrades;
  currentAutoMinerUpgrade: EAutoMinerUpgrades;
  currentPattern: EPattern;
  patternBonus: number;

  // Actions
  setGrid: (grid: number[][]) => void;
  setMoney: (money: number) => void;
  setCurrentUpgrade: (upgrade: EClickUpgrades) => void;
  setCurrentMultiClickUpgrade: (upgrade: EMultiClickUpgrades) => void;
  setCurrentAutoMinerUpgrade: (upgrade: EAutoMinerUpgrades) => void;
  setCurrentPattern: (pattern: EPattern) => void;

  // Game methods
  clear: () => void;
  randomize: () => void;
  toggleOre: (i: number, j: number) => void;
  sell: (multiplier?: number) => void;
  upgrade: (upgrade: EClickUpgrades) => void;
  multiClickUpgrade: (upgrade: EMultiClickUpgrades) => void;
  autoMinerUpgrade: (upgrade: EAutoMinerUpgrades) => void;

  // Persistence
  initialize: () => Promise<void>;
}

const STORAGE_FILE = `${FileSystem.documentDirectory}upclick_game_state.json`;

const saveState = async (state: { money: number; currentUpgrade: EClickUpgrades; currentMultiClickUpgrade: EMultiClickUpgrades; currentAutoMinerUpgrade: EAutoMinerUpgrades }) => {
  try {
    await FileSystem.writeAsStringAsync(STORAGE_FILE, JSON.stringify(state));
    console.log("Game state saved to:", STORAGE_FILE, state);
  } catch (error) {
    console.error("Error saving state:", error);
  }
};

export const useGameStore = create<GameState>((set, get) => ({
  grid: createEmptyGrid(10, 10),
  breakableGrid: createBreakableGrid(10, 10),
  money: 0,
  currentUpgrade: EClickUpgrades.COPPER,
  currentMultiClickUpgrade: EMultiClickUpgrades.SINGLE,
  currentAutoMinerUpgrade: EAutoMinerUpgrades.NONE,
  currentPattern: EPattern.LINE,
  patternBonus: 1,

  setGrid: (grid) => set({ grid }),
  setMoney: (money) => {
    set({ money });
    saveState({ money, currentUpgrade: get().currentUpgrade, currentMultiClickUpgrade: get().currentMultiClickUpgrade, currentAutoMinerUpgrade: get().currentAutoMinerUpgrade });
  },
  setCurrentUpgrade: (upgrade) => {
    set({ currentUpgrade: upgrade });
    saveState({ money: get().money, currentUpgrade: upgrade, currentMultiClickUpgrade: get().currentMultiClickUpgrade, currentAutoMinerUpgrade: get().currentAutoMinerUpgrade });
  },
  setCurrentMultiClickUpgrade: (upgrade) => {
    set({ currentMultiClickUpgrade: upgrade });
    saveState({ money: get().money, currentUpgrade: get().currentUpgrade, currentMultiClickUpgrade: upgrade, currentAutoMinerUpgrade: get().currentAutoMinerUpgrade });
  },
  setCurrentAutoMinerUpgrade: (upgrade) => {
    set({ currentAutoMinerUpgrade: upgrade });
    saveState({ money: get().money, currentUpgrade: get().currentUpgrade, currentMultiClickUpgrade: get().currentMultiClickUpgrade, currentAutoMinerUpgrade: upgrade });
  },
  setCurrentPattern: (pattern) => {
    set({ currentPattern: pattern, patternBonus: 1 });
  },

  clear: () => {
    set({
      grid: createEmptyGrid(10, 10),
      breakableGrid: createBreakableGrid(10, 10),
      money: 0,
      currentUpgrade: EClickUpgrades.COPPER,
      currentMultiClickUpgrade: EMultiClickUpgrades.SINGLE,
      currentAutoMinerUpgrade: EAutoMinerUpgrades.NONE,
      currentPattern: EPattern.LINE,
      patternBonus: 1,
    });
    saveState({ money: 0, currentUpgrade: EClickUpgrades.COPPER, currentMultiClickUpgrade: EMultiClickUpgrades.SINGLE, currentAutoMinerUpgrade: EAutoMinerUpgrades.NONE });
  },

  sell: (multiplier: number = 1) => {
    const state = get();
    let counter = 0;
    state.grid.forEach((row) => {
      row.forEach((ore) => {
        if (ore === 1) {
          counter++;
        }
      });
    });
    const earnedMoney = CLICK_RECORD[state.currentUpgrade].value * counter * multiplier;
    const newMoney = state.money + earnedMoney;
    set({ money: newMoney, grid: createEmptyGrid(10, 10), breakableGrid: createBreakableGrid(10, 10) });
    saveState({ money: newMoney, currentUpgrade: state.currentUpgrade, currentMultiClickUpgrade: state.currentMultiClickUpgrade, currentAutoMinerUpgrade: state.currentAutoMinerUpgrade });
  },

  randomize: () =>
    set({
      grid: randomGrid(10, 10),
      breakableGrid: createBreakableGrid(10, 10),
      money: 0,
    }),

  toggleOre: (i, j) => {
    const state = get();
    const newGrid = state.grid.map((row) => [...row]);
    const oresToActivate: [number, number][] = [[i, j]];

    const getNeighbors = (row: number, col: number) => {
      const neighbors: [number, number][] = [];
      if (row > 0) neighbors.push([row - 1, col]);
      if (row < 9) neighbors.push([row + 1, col]);
      if (col > 0) neighbors.push([row, col - 1]);
      if (col < 9) neighbors.push([row, col + 1]);
      return neighbors;
    };

    const oreCount = MULTI_CLICK_RECORD[state.currentMultiClickUpgrade].oreCount;
    if (oreCount > 1) {
      const neighbors = getNeighbors(i, j);
      for (let n = 1; n < oreCount && neighbors.length > 0; n++) {
        const randomIdx = Math.floor(Math.random() * neighbors.length);
        const neighbor = neighbors[randomIdx];
        oresToActivate.push(neighbor);
        neighbors.splice(randomIdx, 1);
      }
    }

    oresToActivate.forEach(([row, col]) => {
      if (newGrid[row][col] === 0) {
        newGrid[row][col] = 1;
      }
    });

    // Check for pattern match on entire grid (order doesn't matter now)
    let newPatternBonus = state.patternBonus;
    let newCurrentPattern = state.currentPattern;
    
    const patternCompleted = checkPatternInGrid(newGrid, PATTERNS[state.currentPattern]);

    if (patternCompleted) {
      newPatternBonus = PATTERNS[state.currentPattern].bonus;
      // Generate new random pattern
      const allPatterns = Object.values(EPattern) as EPattern[];
      newCurrentPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)];
    }

    set({ grid: newGrid, patternBonus: newPatternBonus, currentPattern: newCurrentPattern });
  },

  upgrade: (upgrade: EClickUpgrades) => {
    const state = get();
    if (state.money < CLICK_RECORD[upgrade].moneyCost) {
      return;
    }
    const newMoney = state.money - CLICK_RECORD[upgrade].moneyCost;
    set({
      currentUpgrade: upgrade,
      money: newMoney,
    });
    saveState({ money: newMoney, currentUpgrade: upgrade, currentMultiClickUpgrade: state.currentMultiClickUpgrade, currentAutoMinerUpgrade: state.currentAutoMinerUpgrade });
  },

  multiClickUpgrade: (upgrade: EMultiClickUpgrades) => {
    const state = get();
    if (state.money < MULTI_CLICK_RECORD[upgrade].moneyCost) {
      return;
    }
    const newMoney = state.money - MULTI_CLICK_RECORD[upgrade].moneyCost;
    set({
      currentMultiClickUpgrade: upgrade,
      money: newMoney,
    });
    saveState({ money: newMoney, currentUpgrade: state.currentUpgrade, currentMultiClickUpgrade: upgrade, currentAutoMinerUpgrade: state.currentAutoMinerUpgrade });
  },

  autoMinerUpgrade: (upgrade: EAutoMinerUpgrades) => {
    const state = get();
    if (state.money < AUTO_MINER_RECORD[upgrade].moneyCost) {
      return;
    }
    const newMoney = state.money - AUTO_MINER_RECORD[upgrade].moneyCost;
    set({
      currentAutoMinerUpgrade: upgrade,
      money: newMoney,
    });
    saveState({ money: newMoney, currentUpgrade: state.currentUpgrade, currentMultiClickUpgrade: state.currentMultiClickUpgrade, currentAutoMinerUpgrade: upgrade });
  },


  initialize: async () => {
    try {
      console.log("Initializing game store, loading from:", STORAGE_FILE);
      const fileInfo = await FileSystem.getInfoAsync(STORAGE_FILE);
      console.log("File info:", fileInfo);
      if (fileInfo.exists) {
        const content = await FileSystem.readAsStringAsync(STORAGE_FILE);
        console.log("Loaded content:", content);
        const parsed = JSON.parse(content);
        console.log("Parsed data:", parsed);
        set({
          grid: createEmptyGrid(10, 10),
          breakableGrid: createBreakableGrid(10, 10),
          money: parsed.money || 0,
          currentUpgrade: parsed.currentUpgrade || EClickUpgrades.COPPER,
          currentMultiClickUpgrade: parsed.currentMultiClickUpgrade || EMultiClickUpgrades.SINGLE,
          currentAutoMinerUpgrade: parsed.currentAutoMinerUpgrade || EAutoMinerUpgrades.NONE,
        });
      } else {
        console.log("No saved game file found");
      }
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  },
}));
