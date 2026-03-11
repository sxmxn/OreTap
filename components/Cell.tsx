import { AppleColors, Colors } from "@/constants/theme";
import { CLICK_RECORD, EClickUpgrades } from "@/types/global";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

type Props = {
  extracted: boolean;
  isBreakable: boolean;
  currentUpgrade: EClickUpgrades | null;
  onPress: () => void;
};

export const Ore = React.memo(({ extracted, isBreakable, currentUpgrade, onPress }: Props) => {
  const [cracking, setCracking] = useState(false);

  // Apple-style colors
  const baseColor = extracted && currentUpgrade !== null 
    ? CLICK_RECORD[currentUpgrade].color 
    : isBreakable 
      ? AppleColors.gray3
      : AppleColors.gray4;

  const strokeColor = extracted 
    ? `${CLICK_RECORD[currentUpgrade!]?.color}99` 
    : Colors.light.opaqueSeparator;

  const handlePress = () => {
    if(cracking){ 
      onPress(); 
      setCracking(false); 
      return; 
    }
    if(isBreakable){
      setCracking(true);
      setTimeout(() => {
        setCracking(false);
      }, 1500);
    }
  }

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      disabled={!isBreakable} 
      style={[styles.container, !isBreakable && !extracted && styles.containerDisabled]}
      activeOpacity={0.7}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24">
        {/* Smooth rounded pebble shape */}
        <Path
          d="M12 2 C8 2 5 3.5 3.5 7 C2 10 2 14 4 17 C6 20 9 22 12 22 C15 22 18 20 20 17 C22 14 22 10 20.5 7 C19 3.5 16 2 12 2"
          fill={baseColor}
          stroke={strokeColor}
          strokeWidth="0.5"
        />
        
        {/* Subtle surface texture */}
        <Circle cx="8" cy="9" r="1.5" fill="#00000005" />
        <Circle cx="14" cy="7" r="1" fill="#00000004" />
        <Circle cx="16" cy="14" r="1.2" fill="#00000005" />
        
        {/* Clean highlight */}
        <Circle cx="9" cy="7" r="3" fill="#ffffff" opacity="0.3" />
        
        {/* Crack animation */}
        {cracking && (
          <>
            <Path
              d="M10 4 L9 10 L12 12 L10 18"
              stroke={AppleColors.gray}
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="M14 5 L15 9 L12 12 L14 16"
              stroke={AppleColors.gray}
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.6"
            />
          </>
        )}
      </Svg>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    margin: 0.5,
  },
  containerDisabled: {
    opacity: 0.5,
  },
});