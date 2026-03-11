import PatternSection from "@/components/PatternSection";
import { AppleColors, BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
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

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Apple-style Navigation Bar */}
      <View style={styles.navBar}>
        <Text style={styles.navTitle}>Upclick</Text>
        <TouchableOpacity 
          onPress={() => router.push("/shop")}
          style={styles.navButton}
          activeOpacity={0.7}
        >
          <Text style={styles.navButtonText}>Shop</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Money Display - Apple Wallet Style */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceValue}>${Math.floor(money).toLocaleString()}</Text>
        </View>

        {/* Game Grid Card */}
        <View style={styles.card}>
          <View style={styles.gameArea}>
            <Grid 
              grid={grid} 
              breakableGrid={breakableGrid} 
              toggleOre={toggleOre} 
              currentUpgrade={currentUpgrade} 
              currentAutoMinerUpgrade={currentAutoMinerUpgrade} 
            />
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeOres}</Text>
            <Text style={styles.statLabel}>Mined</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.oreIndicator, { backgroundColor: CLICK_RECORD[currentUpgrade].color }]} />
            <Text style={styles.statLabel} numberOfLines={1}>{CLICK_RECORD[currentUpgrade].title}</Text>
          </View>
        </View>

        {/* Pattern Section */}
        <PatternSection currentPattern={currentPattern} patternBonus={patternBonus} />

        {/* Sell Button - Apple Style */}
        <View style={styles.actionSection}>
          <TouchableOpacity
            onPress={sell}
            style={[styles.sellButton, activeOres === 0 && styles.sellButtonDisabled]}
            activeOpacity={0.8}
            disabled={activeOres === 0}
          >
            <Text style={styles.sellButtonText}>
              Sell {activeOres} {activeOres === 1 ? 'Ore' : 'Ores'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionSection}>
          <TouchableOpacity
            onPress={clear}
          >
            <Text style={styles.sellButtonText}>
              Wipe data
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  navBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.opaqueSeparator,
  },
  navTitle: {
    ...Typography.largeTitle,
    color: Colors.light.text,
  },
  navButton: {
    backgroundColor: AppleColors.blue,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  navButtonText: {
    ...Typography.subhead,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  balanceCard: {
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    alignItems: "center",
  },
  balanceLabel: {
    ...Typography.footnote,
    color: Colors.light.tertiaryText,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceValue: {
    ...Typography.largeTitle,
    fontSize: 42,
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  card: {
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
    overflow: "hidden",
  },
  gameArea: {
    alignItems: "center",
    padding: Spacing.lg,
  },
  statsContainer: {
    flexDirection: "row",
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 72,
  },
  statValue: {
    ...Typography.title2,
    color: Colors.light.text,
  },
  statLabel: {
    ...Typography.caption1,
    color: Colors.light.tertiaryText,
    marginTop: Spacing.xs,
  },
  oreIndicator: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.sm,
    marginBottom: Spacing.xs,
  },
  actionSection: {
    marginTop: Spacing.lg,
  },
  sellButton: {
    backgroundColor: AppleColors.green,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  sellButtonDisabled: {
    backgroundColor: Colors.light.tertiaryFill,
  },
  sellButtonText: {
    ...Typography.headline,
    color: "#FFFFFF",
  },
});
