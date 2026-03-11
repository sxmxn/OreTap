/**
 * Apple-style Design System
 * Inspired by iOS Human Interface Guidelines
 */

import { Platform } from 'react-native';

// Apple System Colors
export const AppleColors = {
  // Primary Colors
  blue: '#007AFF',
  green: '#34C759',
  indigo: '#5856D6',
  orange: '#FF9500',
  pink: '#FF2D55',
  purple: '#AF52DE',
  red: '#FF3B30',
  teal: '#5AC8FA',
  yellow: '#FFCC00',

  // Grayscale
  gray: '#8E8E93',
  gray2: '#AEAEB2',
  gray3: '#C7C7CC',
  gray4: '#D1D1D6',
  gray5: '#E5E5EA',
  gray6: '#F2F2F7',
};

export const Colors = {
  light: {
    // Backgrounds
    background: '#F2F2F7',
    secondaryBackground: '#FFFFFF',
    tertiaryBackground: '#F2F2F7',
    groupedBackground: '#F2F2F7',

    // Text
    text: '#000000',
    secondaryText: '#3C3C43',
    tertiaryText: '#3C3C4399',
    placeholderText: '#3C3C434D',

    // Separators
    separator: '#3C3C4349',
    opaqueSeparator: '#C6C6C8',

    // System Colors
    tint: AppleColors.blue,
    icon: AppleColors.gray,

    // Fills
    fill: '#78788033',
    secondaryFill: '#78788028',
    tertiaryFill: '#7676801E',
    quaternaryFill: '#74748014',
  },
  dark: {
    // Backgrounds
    background: '#000000',
    secondaryBackground: '#1C1C1E',
    tertiaryBackground: '#2C2C2E',
    groupedBackground: '#000000',

    // Text
    text: '#FFFFFF',
    secondaryText: '#EBEBF5',
    tertiaryText: '#EBEBF599',
    placeholderText: '#EBEBF54D',

    // Separators
    separator: '#54545899',
    opaqueSeparator: '#38383A',

    // System Colors
    tint: AppleColors.blue,
    icon: AppleColors.gray,

    // Fills
    fill: '#7878805C',
    secondaryFill: '#78788052',
    tertiaryFill: '#7676803D',
    quaternaryFill: '#74748029',
  },
};

// Apple Typography Scale
export const Typography = {
  largeTitle: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
  },
  title1: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
  },
  headline: {
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
  },
  callout: {
    fontSize: 16,
    fontWeight: '400' as const,
    letterSpacing: -0.32,
  },
  subhead: {
    fontSize: 15,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
  },
  footnote: {
    fontSize: 13,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
  },
  caption1: {
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400' as const,
    letterSpacing: 0.07,
  },
};

// Apple Spacing System
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// Apple Border Radius
export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Fonts = Platform.select({
  ios: {
    sans: 'System',
    rounded: 'System',
    mono: 'Menlo',
  },
  default: {
    sans: 'System',
    rounded: 'System',
    mono: 'monospace',
  },
  web: {
    sans: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    rounded: "-apple-system, BlinkMacSystemFont, 'SF Pro Rounded', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
