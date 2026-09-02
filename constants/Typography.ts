// SuperDimm Design System — Typography
// Mirrors the web app's type scale: extrabold headings, tight tracking, small uppercase labels.

import { StyleSheet } from 'react-native';

export const FontSize = {
  xs: 11,
  sm: 13,
  base: 15,
  md: 17,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 36,
} as const;

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const LineHeight = {
  tight: 1.15,
  snug: 1.3,
  normal: 1.5,
  relaxed: 1.65,
};

export const LetterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  wider: 1.0,
  widest: 2.0, // uppercase labels
};

// Reusable text style presets
export const TextStyles = StyleSheet.create({
  // Large screen titles (e.g. "Welcome to SuperDimm")
  h1: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.extrabold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['3xl'] * LineHeight.tight,
  },
  // Section headings
  h2: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    letterSpacing: LetterSpacing.tight,
    lineHeight: FontSize['2xl'] * LineHeight.snug,
  },
  // Card/panel titles
  h3: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.normal,
    lineHeight: FontSize.xl * LineHeight.snug,
  },
  // Body text
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
    lineHeight: FontSize.base * LineHeight.normal,
  },
  // Secondary / supporting body text
  bodySmall: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
    lineHeight: FontSize.sm * LineHeight.relaxed,
  },
  // Form labels
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.normal,
  },
  // Uppercase section labels — matches web app's "CUSTOMER PORTAL" badge style
  labelUppercase: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.widest,
    textTransform: 'uppercase',
  },
  // Captions, timestamps
  caption: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.regular,
    letterSpacing: LetterSpacing.normal,
    lineHeight: FontSize.xs * LineHeight.relaxed,
  },
  // Monospace (account IDs, case refs)
  mono: {
    fontFamily: 'monospace' as const,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    letterSpacing: LetterSpacing.wide,
  },
  // Button text
  button: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.normal,
  },
  buttonSmall: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.normal,
  },
});
