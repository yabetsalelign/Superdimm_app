// SuperDimm UI — Divider

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Spacing } from '@/constants';

interface DividerProps {
  /** Optional centered label text. */
  label?: string;
  /** Vertical margin around divider. */
  spacing?: number;
}

export function Divider({ label, spacing = Spacing[4] }: DividerProps) {
  const dividerColor = useThemeColor('divider');

  if (label) {
    return (
      <View style={[styles.row, { marginVertical: spacing }]}>
        <View style={[styles.line, { backgroundColor: dividerColor }]} />
        <ThemedText variant="caption" muted style={styles.label}>
          {label}
        </ThemedText>
        <View style={[styles.line, { backgroundColor: dividerColor }]} />
      </View>
    );
  }

  return (
    <View
      style={[styles.line, { backgroundColor: dividerColor, marginVertical: spacing }]}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing[2],
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    flexShrink: 0,
  },
});
