// SuperDimm UI — Card
// Rounded card with shadow and border matching the web app's card style.

import React from 'react';
import { View, type ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useThemeColor';
import { Radius, Shadow, Spacing } from '@/constants';

interface CardProps extends ViewProps {
  /** Reduce internal padding. */
  compact?: boolean;
  /** Remove shadow (for nested cards). */
  flat?: boolean;
}

export function Card({ compact = false, flat = false, style, children, ...rest }: CardProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        !flat && Shadow.card,
        compact ? styles.compact : styles.normal,
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  normal: {
    padding: Spacing[4],
  },
  compact: {
    padding: Spacing[3],
  },
});
