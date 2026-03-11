import { Spacing } from "@/constants/theme";
import { AUTO_MINER_RECORD, EAutoMinerUpgrades, EClickUpgrades } from "@/types/global";
import React from "react";
import { StyleSheet, View } from "react-native";
import AutoClicker from "./AutoClicker";
import { Ore } from "./Cell";

type Props = {
  currentUpgrade: EClickUpgrades | null;
  currentAutoMinerUpgrade: EAutoMinerUpgrades;
  grid: number[][];
  breakableGrid: boolean[][];
  toggleOre: (i: number, j: number) => void;
};

export const Grid = ({ grid, breakableGrid, toggleOre, currentUpgrade, currentAutoMinerUpgrade }: Props) => {
  const amoundMiners = currentAutoMinerUpgrade > EAutoMinerUpgrades.NONE ? AUTO_MINER_RECORD[currentAutoMinerUpgrade].amountAutoMiners : 0;
  const minersArray = Array.from({ length: amoundMiners }, (_, i) => i);
  
  return (
    <View style={styles.grid}>
      {minersArray.map((minerIndex) => (
        <AutoClicker key={`auto-miner-${minerIndex}`} onMine={toggleOre} />
      ))}
      {grid.map((row, i) => (
        <View key={`row-${i}`} style={styles.row}>
          {row.map((ore, j) => (
            <Ore
              key={`${i}-${j}`}
              extracted={ore === 1}
              isBreakable={breakableGrid[i]?.[j] ?? true}
              currentUpgrade={currentUpgrade}
              onPress={() => toggleOre(i, j)}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    alignItems: "center",
    padding: Spacing.xs,
  },
  row: {
    flexDirection: "row",
    height: 25,
  },
});