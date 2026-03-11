import { AppleColors, BorderRadius, Colors, Spacing, Typography } from "@/constants/theme";
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
    const hasBonus = patternBonus > 1;
    
    return (
        <View style={styles.container}>
            <View style={[styles.card, hasBonus && styles.cardActive]}>
                <View style={styles.content}>
                    {/* Pattern Preview Grid - Left side */}
                    <View style={styles.previewContainer}>
                        {Array.from({ length: 5 }).map((_, row) => (
                            <View key={row} style={styles.previewRow}>
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
                                                styles.dot,
                                                isPatternPart && styles.dotActive,
                                                isPatternPart && styles.dotBonus,
                                            ]}
                                        />
                                    );
                                })}
                            </View>
                        ))}
                    </View>
                    
                    {/* Info - Right side */}
                    <View style={styles.info}>
                        <Text style={styles.label}>TARGET</Text>
                        <Text style={styles.title}>{PATTERNS[currentPattern].title}</Text>
                        {hasBonus && (
                            <Text style={styles.bonusMessage}>+{((patternBonus - 1) * 100).toFixed(0)}% bonus active</Text>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

export default PatternSection;

const styles = StyleSheet.create({
    container: {
        marginTop: Spacing.sm,
    },
    card: {
        backgroundColor: Colors.light.secondaryBackground,
        borderRadius: BorderRadius.md,
        padding: Spacing.md,
    },
    cardActive: {
        backgroundColor: '#FFFBEB',
        borderWidth: 1,
        borderColor: AppleColors.yellow,
    },
    content: {
        flexDirection: "row",
        alignItems: "center",
    },
    previewContainer: {
        gap: 2,
        marginRight: Spacing.md,
    },
    previewRow: {
        flexDirection: "row",
        gap: 2,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.light.tertiaryFill,
    },
    dotActive: {
        backgroundColor: Colors.light.fill,
    },
    dotBonus: {
        backgroundColor: AppleColors.yellow,
    },
    info: {
        flex: 1,
    },
    label: {
        ...Typography.caption2,
        color: Colors.light.tertiaryText,
        letterSpacing: 0.5,
    },
    title: {
        ...Typography.headline,
        color: Colors.light.text,
        marginTop: 2,
    },
    bonusMessage: {
        ...Typography.caption1,
        color: AppleColors.orange,
        marginTop: 4,
        fontWeight: "500",
    },
});
