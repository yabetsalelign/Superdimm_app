// SuperDimm UI — ScreenHeader
// Per-screen header with title, optional subtitle, and optional right action.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThemedView } from './ThemedView';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Spacing } from '@/constants';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
  /** Whether to include top safe area padding (use false inside Stack navigators). */
  safeArea?: boolean;
}

export function ScreenHeader({
  title,
  subtitle,
  rightAction,
  safeArea = false,
}: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const borderColor = useThemeColor('border');

  return (
    <ThemedView
      colorKey="card"
      style={[
        styles.container,
        { borderBottomColor: borderColor },
        safeArea && { paddingTop: insets.top + Spacing[4] },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.titleBlock}>
          <ThemedText variant="h3">{title}</ThemedText>
          {subtitle ? (
            <ThemedText variant="caption" muted style={styles.subtitle}>
              {subtitle}
            </ThemedText>
          ) : null}
        </View>
        {rightAction ? <View style={styles.rightAction}>{rightAction}</View> : null}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing[4],
    paddingVertical: Spacing[4],
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing[3],
  },
  titleBlock: {
    flex: 1,
    gap: 2,
  },
  subtitle: {
    marginTop: 2,
  },
  rightAction: {
    flexShrink: 0,
  },
});
