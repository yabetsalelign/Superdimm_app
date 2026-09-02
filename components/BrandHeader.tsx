// SuperDimm UI — BrandHeader
// SuperDimm logo mark + wordmark used on auth screens.
// Mirrors the web app's branding: square "S" badge + "SuperDimm" extrabold + tagline.

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { useTheme } from '@/hooks/useThemeColor';
import { Spacing, Radius } from '@/constants';

interface BrandHeaderProps {
  /** Show the "Telecom Subscriber Services" tagline. */
  showTagline?: boolean;
}

export function BrandHeader({ showTagline = true }: BrandHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      {/* Logo mark */}
      <View style={[styles.logoMark, { backgroundColor: theme.primary }]}>
        <ThemedText
          variant="h3"
          style={{ color: theme.primaryForeground, lineHeight: undefined }}
        >
          S
        </ThemedText>
      </View>

      {/* Wordmark */}
      <ThemedText variant="h2" style={styles.wordmark}>
        SuperDimm
      </ThemedText>

      {/* Tagline */}
      {showTagline ? (
        <ThemedText variant="labelUppercase" muted style={styles.tagline}>
          Telecom Subscriber Services
        </ThemedText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: Spacing[2],
  },
  logoMark: {
    width: 52,
    height: 52,
    borderRadius: Radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing[1],
  },
  wordmark: {
    letterSpacing: -1,
  },
  tagline: {
    opacity: 0.7,
  },
});
