import { AppleColors, BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
import { AUTO_MINER_RECORD, CLICK_RECORD, EAutoMinerUpgrades, EClickUpgrades, EMultiClickUpgrades, MULTI_CLICK_RECORD } from "@/types/global";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useGameContext } from "../context/GameContext";

export default function Shop() {
  const router = useRouter();
  const { money, currentUpgrade, currentMultiClickUpgrade, currentAutoMinerUpgrade, upgrade, multiClickUpgrade, autoMinerUpgrade } = useGameContext();

  const upgradeKeys = Object.keys(CLICK_RECORD).map(Number) as EClickUpgrades[];
  const nextUpgradeIndex = upgradeKeys.indexOf(currentUpgrade) + 1;
  const nextUpgrade = upgradeKeys[nextUpgradeIndex];
  const isMaxLevel = nextUpgradeIndex >= upgradeKeys.length;

  const multiClickKeys = Object.keys(MULTI_CLICK_RECORD).map(Number) as EMultiClickUpgrades[];
  const nextMultiClickIndex = multiClickKeys.indexOf(currentMultiClickUpgrade) + 1;
  const nextMultiClick = multiClickKeys[nextMultiClickIndex];
  const isMaxMultiClick = nextMultiClickIndex >= multiClickKeys.length;

  const autoMinerKeys = Object.keys(AUTO_MINER_RECORD).map(Number) as EAutoMinerUpgrades[];
  const nextAutoMinerIndex = autoMinerKeys.indexOf(currentAutoMinerUpgrade) + 1;
  const nextAutoMiner = autoMinerKeys[nextAutoMinerIndex];
  const isMaxAutoMiner = nextAutoMinerIndex >= autoMinerKeys.length;

  const canAfford = (cost: number) => money >= cost;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Apple-style Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>Shop</Text>
        <View style={styles.spacer} />
      </View>

      {/* Balance Display */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Available</Text>
        <Text style={styles.balanceValue}>${Math.floor(money).toLocaleString()}</Text>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Ore Type Upgrades Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ORE TYPES</Text>
          <View style={styles.groupedList}>
            {/* Current Ore */}
            <View style={styles.listItem}>
              <View style={[styles.oreBadge, { backgroundColor: CLICK_RECORD[currentUpgrade].color }]} />
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{CLICK_RECORD[currentUpgrade].title}</Text>
                <Text style={styles.itemSubtitle}>Current</Text>
              </View>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            </View>

            {/* Next Ore Upgrade */}
            {!isMaxLevel && nextUpgrade !== undefined && (
              <>
                <View style={styles.separator} />
                <View style={styles.listItem}>
                  <View style={[styles.oreBadge, { backgroundColor: CLICK_RECORD[nextUpgrade].color }]} />
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{CLICK_RECORD[nextUpgrade].title}</Text>
                    <Text style={[styles.itemPrice, !canAfford(CLICK_RECORD[nextUpgrade].moneyCost) && styles.itemPriceUnaffordable]}>
                      ${CLICK_RECORD[nextUpgrade].moneyCost.toLocaleString()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => upgrade(nextUpgrade)}
                    disabled={!canAfford(CLICK_RECORD[nextUpgrade].moneyCost)}
                    style={[styles.buyButton, !canAfford(CLICK_RECORD[nextUpgrade].moneyCost) && styles.buyButtonDisabled]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.buyButtonText, !canAfford(CLICK_RECORD[nextUpgrade].moneyCost) && styles.buyButtonTextDisabled]}>
                      {canAfford(CLICK_RECORD[nextUpgrade].moneyCost) ? "Buy" : "Need More"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Multi-Click Upgrades Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>MULTI-CLICK</Text>
          <View style={styles.groupedList}>
            {/* Current Multi-Click */}
            <View style={styles.listItem}>
              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{MULTI_CLICK_RECORD[currentMultiClickUpgrade].oreCount}×</Text>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{MULTI_CLICK_RECORD[currentMultiClickUpgrade].title}</Text>
                <Text style={styles.itemSubtitle}>Current</Text>
              </View>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            </View>

            {/* Next Multi-Click Upgrade */}
            {!isMaxMultiClick && nextMultiClick !== undefined && (
              <>
                <View style={styles.separator} />
                <View style={styles.listItem}>
                  <View style={styles.countBadge}>
                    <Text style={styles.countBadgeText}>{MULTI_CLICK_RECORD[nextMultiClick].oreCount}×</Text>
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{MULTI_CLICK_RECORD[nextMultiClick].title}</Text>
                    <Text style={[styles.itemPrice, !canAfford(MULTI_CLICK_RECORD[nextMultiClick].moneyCost) && styles.itemPriceUnaffordable]}>
                      ${MULTI_CLICK_RECORD[nextMultiClick].moneyCost.toLocaleString()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => multiClickUpgrade(nextMultiClick)}
                    disabled={!canAfford(MULTI_CLICK_RECORD[nextMultiClick].moneyCost)}
                    style={[styles.buyButton, !canAfford(MULTI_CLICK_RECORD[nextMultiClick].moneyCost) && styles.buyButtonDisabled]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.buyButtonText, !canAfford(MULTI_CLICK_RECORD[nextMultiClick].moneyCost) && styles.buyButtonTextDisabled]}>
                      {canAfford(MULTI_CLICK_RECORD[nextMultiClick].moneyCost) ? "Buy" : "Need More"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Auto-Miner Upgrades Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>AUTO-MINERS</Text>
          <View style={styles.groupedList}>
            {/* Current Auto-Miner */}
            <View style={styles.listItem}>
              <View style={[styles.countBadge, { backgroundColor: AppleColors.orange }]}>
                <Text style={styles.countBadgeText}>{AUTO_MINER_RECORD[currentAutoMinerUpgrade].amountAutoMiners}</Text>
              </View>
              <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{AUTO_MINER_RECORD[currentAutoMinerUpgrade].title}</Text>
                <Text style={styles.itemSubtitle}>Current</Text>
              </View>
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkText}>✓</Text>
              </View>
            </View>

            {/* Next Auto-Miner Upgrade */}
            {!isMaxAutoMiner && nextAutoMiner !== undefined && (
              <>
                <View style={styles.separator} />
                <View style={styles.listItem}>
                  <View style={[styles.countBadge, { backgroundColor: AppleColors.orange }]}>
                    <Text style={styles.countBadgeText}>{AUTO_MINER_RECORD[nextAutoMiner].amountAutoMiners}</Text>
                  </View>
                  <View style={styles.itemContent}>
                    <Text style={styles.itemTitle}>{AUTO_MINER_RECORD[nextAutoMiner].title}</Text>
                    <Text style={[styles.itemPrice, !canAfford(AUTO_MINER_RECORD[nextAutoMiner].moneyCost) && styles.itemPriceUnaffordable]}>
                      ${AUTO_MINER_RECORD[nextAutoMiner].moneyCost.toLocaleString()}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => autoMinerUpgrade(nextAutoMiner)}
                    disabled={!canAfford(AUTO_MINER_RECORD[nextAutoMiner].moneyCost)}
                    style={[styles.buyButton, !canAfford(AUTO_MINER_RECORD[nextAutoMiner].moneyCost) && styles.buyButtonDisabled]}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.buyButtonText, !canAfford(AUTO_MINER_RECORD[nextAutoMiner].moneyCost) && styles.buyButtonTextDisabled]}>
                      {canAfford(AUTO_MINER_RECORD[nextAutoMiner].moneyCost) ? "Buy" : "Need More"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
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
  },
  backButton: {
    paddingVertical: Spacing.xs,
    paddingRight: Spacing.md,
  },
  backButtonText: {
    ...Typography.body,
    color: AppleColors.blue,
  },
  navTitle: {
    ...Typography.headline,
    color: Colors.light.text,
  },
  spacer: {
    width: 60,
  },
  balanceContainer: {
    alignItems: "center",
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.light.background,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.light.opaqueSeparator,
  },
  balanceLabel: {
    ...Typography.caption1,
    color: Colors.light.tertiaryText,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  balanceValue: {
    ...Typography.largeTitle,
    color: Colors.light.text,
    marginTop: Spacing.xs,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: Spacing.xxl,
  },
  section: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  sectionHeader: {
    ...Typography.footnote,
    color: Colors.light.tertiaryText,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.md,
    letterSpacing: 0.5,
  },
  groupedList: {
    backgroundColor: Colors.light.secondaryBackground,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    minHeight: 60,
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.light.opaqueSeparator,
    marginLeft: 68,
  },
  oreBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.md,
  },
  countBadge: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    backgroundColor: AppleColors.blue,
    marginRight: Spacing.md,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadgeText: {
    ...Typography.subhead,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...Typography.body,
    color: Colors.light.text,
  },
  itemSubtitle: {
    ...Typography.caption1,
    color: AppleColors.green,
    marginTop: 2,
  },
  itemPrice: {
    ...Typography.caption1,
    color: Colors.light.tertiaryText,
    marginTop: 2,
  },
  itemPriceUnaffordable: {
    color: AppleColors.red,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: AppleColors.green,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  buyButton: {
    backgroundColor: AppleColors.blue,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    minWidth: 80,
    alignItems: "center",
  },
  buyButtonDisabled: {
    backgroundColor: Colors.light.tertiaryFill,
  },
  buyButtonText: {
    ...Typography.subhead,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  buyButtonTextDisabled: {
    color: Colors.light.tertiaryText,
  },
});
