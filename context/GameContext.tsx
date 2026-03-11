import { useGameStore } from "@/store/gameStore";
import { EAutoMinerUpgrades, EClickUpgrades, EMultiClickUpgrades, EPattern } from "@/types/global";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createBreakableGrid, createEmptyGrid } from "../utils/gridHelpers";

interface GameContextType {
  grid: number[][];
  breakableGrid: boolean[][];
  money: number;
  currentUpgrade: EClickUpgrades;
  currentMultiClickUpgrade: EMultiClickUpgrades;
  currentAutoMinerUpgrade: EAutoMinerUpgrades;
  currentPattern: EPattern;
  patternBonus: number;
  clear: () => void;
  randomize: () => void;
  toggleOre: (i: number, j: number) => void;
  sell: () => void;
  upgrade: (upgrade: EClickUpgrades) => void;
  multiClickUpgrade: (upgrade: EMultiClickUpgrades) => void;
  autoMinerUpgrade: (upgrade: EAutoMinerUpgrades) => void;
}

const GameContext = createContext<GameContextType | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const store = useGameStore();
  
  // Subscribe to all store updates to trigger re-renders
  const [storeState, setStoreState] = useState(() => ({
    grid: store.grid,
    breakableGrid: store.breakableGrid,
    money: store.money,
    currentUpgrade: store.currentUpgrade,
    currentMultiClickUpgrade: store.currentMultiClickUpgrade,
    currentAutoMinerUpgrade: store.currentAutoMinerUpgrade,
    currentPattern: store.currentPattern,
    patternBonus: store.patternBonus,
  }));

  useEffect(() => {
    const initializeGame = async () => {
      await store.initialize();
      setIsInitialized(true);
    };
    initializeGame();
  }, []);

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribe = useGameStore.subscribe(
      (state) => {
        setStoreState({
          grid: state.grid,
          breakableGrid: state.breakableGrid,
          money: state.money,
          currentUpgrade: state.currentUpgrade,
          currentMultiClickUpgrade: state.currentMultiClickUpgrade,
          currentAutoMinerUpgrade: state.currentAutoMinerUpgrade,
          currentPattern: state.currentPattern,
          patternBonus: state.patternBonus,
        });
      }
    );
    return unsubscribe;
  }, []);

  const clear = () => {
    store.clear();
  };

  const sell = () => {
    store.sell(storeState.patternBonus);
    // Reset pattern bonus after selling
    if (storeState.patternBonus > 1) {
      store.setCurrentPattern(storeState.currentPattern);
    }
  };

  const randomize = () => {
    store.randomize();
  };

  const toggleOre = (i: number, j: number) => {
    store.toggleOre(i, j);
  };

  const upgrade = (upgrade: EClickUpgrades) => {
    store.upgrade(upgrade);
  };

  const multiClickUpgrade = (upgrade: EMultiClickUpgrades) => {
    store.multiClickUpgrade(upgrade);
  };

  const autoMinerUpgrade = (upgrade: EAutoMinerUpgrades) => {
    store.autoMinerUpgrade(upgrade);
  };

  if (!isInitialized) {
    return (
      <GameContext.Provider
        value={{
          grid: createEmptyGrid(10, 10),
          breakableGrid: createBreakableGrid(10, 10),
          money: 0,
          currentUpgrade: EClickUpgrades.COPPER,
          currentMultiClickUpgrade: EMultiClickUpgrades.SINGLE,
          currentPattern: EPattern.LINE,
          currentAutoMinerUpgrade: EAutoMinerUpgrades.NONE,
          patternBonus: 1,
          clear: () => {},
          randomize: () => {},
          toggleOre: () => {},
          sell: () => {},
          upgrade: () => {},
          multiClickUpgrade: () => {},
          autoMinerUpgrade: () => {},
        }}
      >
        {children}
      </GameContext.Provider>
    );
  }

  return (
    <GameContext.Provider
      value={{
        grid: storeState.grid,
        breakableGrid: storeState.breakableGrid,
        money: storeState.money,
        currentUpgrade: storeState.currentUpgrade,
        currentMultiClickUpgrade: storeState.currentMultiClickUpgrade,
        currentAutoMinerUpgrade: storeState.currentAutoMinerUpgrade,
        currentPattern: storeState.currentPattern,
        patternBonus: storeState.patternBonus,
        clear,
        randomize,
        toggleOre,
        sell,
        upgrade,
        multiClickUpgrade,
        autoMinerUpgrade,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within GameProvider");
  }
  return context;
};
