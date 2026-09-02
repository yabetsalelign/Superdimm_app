// SuperDimm Mobile — useThemeColor hook
// Resolves the correct color token from Colors.ts for the current light/dark mode.

import { Colors } from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import type { ThemeColors } from '@/constants/Colors';

/**
 * Returns the correct color value for the given token key in the active theme.
 *
 * Usage:
 *   const bg = useThemeColor('background');
 *   const text = useThemeColor('foreground');
 */
export function useThemeColor(colorKey: keyof ThemeColors): string {
  const scheme = useColorScheme();
  return Colors[scheme][colorKey];
}

/**
 * Returns the full theme color palette for the active scheme.
 * Useful when you need access to multiple color tokens without calling
 * useThemeColor multiple times.
 */
export function useTheme(): ThemeColors {
  const scheme = useColorScheme();
  return Colors[scheme];
}
