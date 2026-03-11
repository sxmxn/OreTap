import PatternSection from "@/components/PatternSection";
import { CLICK_RECORD } from "@/types/global";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Grid } from "../components/Grid";
import { useGameContext } from "../context/GameContext";

export default function Home() {
  const { grid, breakableGrid, money, currentUpgrade, currentAutoMinerUpgrade, currentPattern, patternBonus, clear, randomize, toggleOre, sell } = useGameContext();
  const router = useRouter();

  const activeOres = Object.values(grid).flat().filter(c => c === 1).length;

  const StyledButton = ({ onPress, title, disabled, variant = "primary" }: any) => {
    const bgColor = disabled ? "#bdc3c7" : variant === "primary" ? "#3498db" : variant === "success" ? "#27ae60" : variant === "danger" ? "#e74c3c" : "#f39c12";
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.styledButton, { backgroundColor: bgColor, opacity: disabled ? 0.6 : 1 }]}
      >
        <Text style={styles.styledButtonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Upclick</Text>
          <TouchableOpacity 
            onPress={() => router.push("/shop")}
            style={styles.shopButton}
          >
            <Text style={styles.shopButtonText}>Shop</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.gameArea}>
          <Grid grid={grid} breakableGrid={breakableGrid} toggleOre={toggleOre} currentUpgrade={currentUpgrade} currentAutoMinerUpgrade={currentAutoMinerUpgrade} />
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Money</Text>
            <Text style={styles.statValue}>{Math.floor(money)}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Mined Ores</Text>
            <Text style={styles.statValue}>{activeOres}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Current Ores</Text>
            <Text style={styles.statValue} numberOfLines={1}>{CLICK_RECORD[currentUpgrade].title}</Text>
          </View>
        </View>

        <PatternSection currentPattern={currentPattern} patternBonus={patternBonus} />

        <View style={styles.section}>
          {/* <Text style={styles.sectionTitle}>ACTIONS</Text>
          <View style={styles.buttonRow}>
            <View style={styles.buttonHalf}>
              <StyledButton title="Clear" onPress={clear} variant="danger" />
            </View>
            <View style={styles.buttonHalf}>
              <StyledButton title="Randomize" onPress={randomize} variant="primary" />
            </View>
          </View> */}
          <StyledButton
            title={`Sell (${activeOres} ores)`}
            onPress={sell}
            variant="success"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#2c3e50",
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f6fa",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#2c3e50",
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  shopButton: {
    backgroundColor: "#f39c12",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexShrink: 1,
  },
  shopButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  gameArea: {
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginVertical: 15,
    marginTop: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 15,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  statLabel: {
    fontSize: 11,
    color: "#7f8c8d",
    fontWeight: "600",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginTop: 5,
  },
  section: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
    letterSpacing: 1,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  buttonHalf: {
    flex: 1,
  },
  styledButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 44,
  },
  styledButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
