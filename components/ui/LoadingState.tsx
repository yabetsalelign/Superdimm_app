// SuperDimm UI — LoadingState
// Centered spinner with optional message.

import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Spacing } from '@/constants';

interface LoadingStateProps {
  message?: string;
  /** Use true when filling a full screen, false for inline use. */
  fullScreen?: boolean;
}

export function LoadingState({ message, fullScreen = true }: LoadingStateProps) {
  const primaryColor = useThemeColor('primary');

  const content = (
    <View style={styles.inner}>
      <ActivityIndicator size="large" color={primaryColor} />
      {message ? (
        <ThemedText variant="bodySmall" muted style={styles.message}>
          {message}
        </ThemedText>
      ) : null}
    </View>
  );

  if (fullScreen) {
    return <ThemedView style={styles.fullScreen}>{content}</ThemedView>;
  }

  return content;
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    alignItems: 'center',
    gap: Spacing[3],
  },
  message: {
    textAlign: 'center',
  },
});
