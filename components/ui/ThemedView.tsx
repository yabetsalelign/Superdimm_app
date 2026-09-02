// SuperDimm UI — ThemedView
// Base container component that applies the correct background for the active theme.

import React from 'react';
import { View, type ViewProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import type { ThemeColors } from '@/constants/Colors';

interface ThemedViewProps extends ViewProps {
  /** Override which color token is used as the background. Defaults to 'background'. */
  colorKey?: keyof ThemeColors;
}

export function ThemedView({ colorKey = 'background', style, ...rest }: ThemedViewProps) {
  const backgroundColor = useThemeColor(colorKey);
  return <View style={[{ backgroundColor }, style]} {...rest} />;
}
