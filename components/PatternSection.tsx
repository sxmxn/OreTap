import { EPattern, PATTERNS } from "@/types/global";
import React from "react";
import {
    StyleSheet,
    Text,
    View
} from "react-native";

interface Props {
     currentPattern: EPattern;
    patternBonus: number;
}

const PatternSection: React.FC<Props> = ({ currentPattern, patternBonus }) => {
return(
    <View style={styles.patternSection}>
        <View style={[styles.patternBox, patternBonus > 1 && styles.patternBoxActive]}>
        <Text style={styles.patternLabel}>Target Pattern</Text>
        <Text style={styles.patternName}>{PATTERNS[currentPattern].title}</Text>  
        {/* Pattern Preview Grid */}
        <View style={styles.patternPreview}>
            {Array.from({ length: 5 }).map((_, row) => (
            <View key={row} style={styles.patternRow}>
                {Array.from({ length: 5 }).map((_, col) => {
                const centerRow = 2;
                const centerCol = 2;
                const offsetRow = row - centerRow;
                const offsetCol = col - centerCol;
                const isPatternPart = PATTERNS[currentPattern].offsets.some(
                    ([dr, dc]) => dr === offsetRow && dc === offsetCol
                );
                return (
                    <View
                    key={`${row}-${col}`}
                    style={[
                        styles.patternDot,
                        isPatternPart && styles.patternDotActive,
                    ]}
                    />
                );
                })}
            </View>
            ))}
        </View>
        
        {patternBonus > 1 && (
            <Text style={styles.bonusText}>+{(patternBonus * 100 - 100).toFixed(0)}% Next Sell!</Text>
        )}
        </View>
    </View>
  );
}

export default PatternSection;

const styles = StyleSheet.create({
  patternSection: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  patternBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 2,
    borderColor: "#e0e0e0",
  },
  patternBoxActive: {
    borderColor: "#FFD700",
    backgroundColor: "#fffacd",
  },
  patternLabel: {
    fontSize: 10,
    color: "#7f8c8d",
    fontWeight: "600",
    marginBottom: 5,
  },
  patternName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  bonusText: {
    fontSize: 12,
    color: "#FFD700",
    fontWeight: "bold",
    marginTop: 8,
  },
  patternPreview: {
    marginTop: 12,
    gap: 4,
  },
  patternRow: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "center",
  },
  patternDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  patternDotActive: {
    backgroundColor: "#FFD700",
    borderColor: "#FFA500",
  },
});
