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

  const StyledButton = ({ onPress, title, disabled, variant = "primary" }: any) => {
    const bgColor =
      disabled ? "#bdc3c7" : variant === "primary" ? "#3498db" : variant === "success" ? "#27ae60" : "#f39c12";
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
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Shop</Text>
          <View style={styles.spacer} />
        </View>
        <View style={styles.moneyBar}>
          <Text style={styles.moneyText}>${Math.floor(money)}</Text>
        </View>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.category}>
          <Text style={styles.categoryTitle}>Ore Type Upgrades</Text>
          <Text style={styles.categoryDescription}>Unlock new ore types to increase earnings</Text>

          <View style={styles.itemCard}>
            <View style={[styles.colorBadge, { backgroundColor: CLICK_RECORD[currentUpgrade].color }]} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{CLICK_RECORD[currentUpgrade].title}</Text>
              <Text style={styles.itemStatus}>Current</Text>
            </View>
        </View>

        {!isMaxLevel && nextUpgrade !== undefined && (
          <View style={styles.itemCard}>
            <View style={[styles.colorBadge, { backgroundColor: CLICK_RECORD[nextUpgrade].color }]} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{CLICK_RECORD[nextUpgrade].title}</Text>
              <Text style={styles.itemPrice}>${CLICK_RECORD[nextUpgrade].moneyCost}</Text>
            </View>
            <StyledButton
              title={money >= CLICK_RECORD[nextUpgrade].moneyCost ? "Buy" : "Need " + (CLICK_RECORD[nextUpgrade].moneyCost - money)}
              disabled={money < CLICK_RECORD[nextUpgrade].moneyCost}
              onPress={() => upgrade(nextUpgrade)}
              variant="primary"
            />
          </View>
        )}
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Multi-Click Upgrades</Text>
        <Text style={styles.categoryDescription}>Mine multiple ores at once</Text>

        <View style={styles.itemCard}>
          <View style={styles.oreCountBadge}>
            <Text style={styles.oreCountText}>{MULTI_CLICK_RECORD[currentMultiClickUpgrade].oreCount}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{MULTI_CLICK_RECORD[currentMultiClickUpgrade].title}</Text>
            <Text style={styles.itemStatus}>Current</Text>
          </View>
        </View>

        {!isMaxMultiClick && nextMultiClick !== undefined && (
          <View style={styles.itemCard}>
            <View style={styles.oreCountBadge}>
              <Text style={styles.oreCountText}>{MULTI_CLICK_RECORD[nextMultiClick].oreCount}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{MULTI_CLICK_RECORD[nextMultiClick].title}</Text>
              <Text style={styles.itemPrice}>${MULTI_CLICK_RECORD[nextMultiClick].moneyCost}</Text>
            </View>
            <StyledButton
              title={money >= MULTI_CLICK_RECORD[nextMultiClick].moneyCost ? "Buy" : "Need " + (MULTI_CLICK_RECORD[nextMultiClick].moneyCost - money)}
              disabled={money < MULTI_CLICK_RECORD[nextMultiClick].moneyCost}
              onPress={() => multiClickUpgrade(nextMultiClick)}
              variant="primary"
            />
          </View>
        )}
      </View>

      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Auto-Miner Upgrades</Text>
        <Text style={styles.categoryDescription}>Automate ore mining</Text>

        <View style={styles.itemCard}>
          <View style={styles.oreCountBadge}>
            <Text style={styles.oreCountText}>{AUTO_MINER_RECORD[currentAutoMinerUpgrade].amountAutoMiners}</Text>
          </View>
          <View style={styles.itemInfo}>
            <Text style={styles.itemName}>{AUTO_MINER_RECORD[currentAutoMinerUpgrade].title}</Text>
            <Text style={styles.itemStatus}>Current</Text>
          </View>
        </View>

        {!isMaxAutoMiner && nextAutoMiner !== undefined && (
          <View style={styles.itemCard}>
            <View style={styles.oreCountBadge}>
              <Text style={styles.oreCountText}>{AUTO_MINER_RECORD[nextAutoMiner].amountAutoMiners}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{AUTO_MINER_RECORD[nextAutoMiner].title}</Text>
              <Text style={styles.itemPrice}>${AUTO_MINER_RECORD[nextAutoMiner].moneyCost}</Text>
            </View>
            <StyledButton
              title={money >= AUTO_MINER_RECORD[nextAutoMiner].moneyCost ? "Buy" : "Need " + (AUTO_MINER_RECORD[nextAutoMiner].moneyCost - money)}
              disabled={money < AUTO_MINER_RECORD[nextAutoMiner].moneyCost}
              onPress={() => autoMinerUpgrade(nextAutoMiner)}
              variant="primary"
            />
          </View>
        )}
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
    backgroundColor: "#2c3e50",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  backButton: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  spacer: {
    width: 40,
  },
  moneyBar: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  moneyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 12,
    color: "#7f8c8d",
    marginBottom: 12,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  colorBadge: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 12,
  },
  oreCountBadge: {
    width: 40,
    height: 40,
    backgroundColor: "#3498db",
    borderRadius: 8,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  oreCountText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  itemStatus: {
    fontSize: 12,
    color: "#27ae60",
    fontWeight: "600",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 12,
    color: "#e74c3c",
    fontWeight: "600",
    marginTop: 2,
  },
  styledButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 40,
  },
  styledButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  allUpgrades: {
    marginHorizontal: 15,
    marginTop: 30,
  },
  allUpgradesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 12,
  },
  upgradeGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  upgradeItem: {
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  miniCard: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 6,
  },
  miniCardText: {
    fontSize: 11,
    color: "#2c3e50",
    fontWeight: "600",
  },
});
