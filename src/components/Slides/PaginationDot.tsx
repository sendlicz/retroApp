import React from 'react';
import { useTheme } from 'react-native-paper';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';

interface PaginationDotProps {
  index: number;
  currentIndex: Animated.Node<number>;
}

const RADIUS = 8;

const PaginationDot = ({ index, currentIndex }: PaginationDotProps) => {
  const theme = useTheme();
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        opacity,
        backgroundColor: theme.colors.primary,
        width: RADIUS,
        height: RADIUS,
        borderRadius: RADIUS / 2,
        margin: RADIUS / 2,
        transform: [{ scale }],
      }}
    />
  );
};

export default PaginationDot;
