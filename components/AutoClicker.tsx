import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

const GRID_SIZE = 10;
const ORE_SIZE = 24;
const ORE_MARGIN = 0.5;
const CELL_TOTAL = ORE_SIZE + ORE_MARGIN * 2;

interface AutoClickerProps {
  onMine?: (gridX: number, gridY: number) => void;
}

const AutoClicker = ({ onMine }: AutoClickerProps) => {
  const [isAnimatingMining, setIsAnimatingMining] = useState(false);
  const moveAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const onMineRef = useRef(onMine);

  useEffect(() => {
    onMineRef.current = onMine;
  }, [onMine]);

  useEffect(() => {
    const moveAutoClicker = () => {
      // Random grid position
      const newX = Math.floor(Math.random() * GRID_SIZE);
      const newY = Math.floor(Math.random() * GRID_SIZE);

      // Calculate pixel position (centered on ore)
      const pixelX = newX * CELL_TOTAL + CELL_TOTAL / 2 - ORE_SIZE / 2;
      const pixelY = newY * CELL_TOTAL + CELL_TOTAL / 2 - ORE_SIZE / 2;

      // Animate movement
      Animated.timing(moveAnim, {
        toValue: { x: pixelX, y: pixelY },
        duration: 800,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: false,
      }).start(() => {
        // Mining animation
        setIsAnimatingMining(true);
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(scaleAnim, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => {
          setIsAnimatingMining(false);
          // Mine the ore at this position (convert X,Y to row,col: newY is row, newX is col)
          onMineRef.current?.(newY, newX);
          // Wait before next move
          setTimeout(moveAutoClicker, 200);
        });
      });
    };

    moveAutoClicker();
  }, []);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            { translateX: moveAnim.x },
            { translateY: moveAnim.y },
            { scale: scaleAnim },
          ],
        },
      ]}
    >
      <Svg width={24} height={24} viewBox="0 0 24 24">
        {/* Pickaxe svg */}
        <Path
          d="M3 12 L12 3 L21 12 L19.5 13.5 L14 8 L14 20 L10 20 L10 8 L4.5 13.5 Z"
          fill="#e67e22"
          stroke="#d35400"
          strokeWidth="1"
        />
        <Circle cx="12" cy="12" r="2" fill="#c0392b" />
        <Circle cx="12" cy="12" r="1" fill="#ecf0f1" />
        {isAnimatingMining && (
          <>
            <Circle cx="8" cy="8" r="0.5" fill="#e67e22" opacity="0.6" />
            <Circle cx="16" cy="8" r="0.5" fill="#e67e22" opacity="0.6" />
            <Circle cx="12" cy="16" r="0.5" fill="#e67e22" opacity="0.6" />
          </>
        )}
      </Svg>
    </Animated.View>
  );
};

export default AutoClicker;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: 24,
    height: 24,
    zIndex: 9999,
    top: 0,
    left: 0,
  },
});
