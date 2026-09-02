// SuperDimm UI — Badge
// Status badges matching the web app's `variant` system.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/hooks/useThemeColor';
import { Radius, Spacing } from '@/constants';

export type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
}

export function Badge({ label, variant = 'default' }: BadgeProps) {
  const theme = useTheme();
  const { bg, text, border } = getColors(variant, theme);

  return (
    <View style={[styles.base, { backgroundColor: bg, borderColor: border }]}>
      <ThemedText
        variant="labelUppercase"
        style={{ color: text, fontSize: 10 }}
      >
        {label}
      </ThemedText>
    </View>
  );
}

function getColors(
  variant: BadgeVariant,
  theme: ReturnType<typeof useTheme>,
): { bg: string; text: string; border: string } {
  switch (variant) {
    case 'success':
      return {
        bg: theme.successBackground,
        text: theme.success,
        border: theme.successBorder,
      };
    case 'warning':
      return {
        bg: theme.warningBackground,
        text: theme.warning,
        border: theme.warningBorder,
      };
    case 'error':
      return {
        bg: theme.errorBackground,
        text: theme.error,
        border: theme.errorBorder,
      };
    case 'info':
      return {
        bg: theme.infoBackground,
        text: theme.info,
        border: theme.infoBorder,
      };
    default:
      return {
        bg: theme.card,
        text: theme.mutedForeground,
        border: theme.border,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: Radius.full,
    borderWidth: 1,
    paddingVertical: 3,
    paddingHorizontal: Spacing[2],
  },
});
