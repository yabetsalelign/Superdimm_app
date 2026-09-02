// SuperDimm UI — ThemedText
// Text component with variant prop mirroring the web app's type scale.

import React from 'react';
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useThemeColor';
import { TextStyles } from '@/constants/Typography';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body'
  | 'bodySmall'
  | 'label'
  | 'labelUppercase'
  | 'caption'
  | 'mono'
  | 'button'
  | 'buttonSmall';

interface ThemedTextProps extends TextProps {
  variant?: TextVariant;
  /** Apply muted (secondary) foreground color. */
  muted?: boolean;
  /** Apply primary brand color. */
  primary?: boolean;
}

export function ThemedText({
  variant = 'body',
  muted = false,
  primary = false,
  style,
  ...rest
}: ThemedTextProps) {
  const theme = useTheme();

  const color = primary
    ? theme.primary
    : muted
      ? theme.mutedForeground
      : theme.foreground;

  return (
    <Text
      style={[TextStyles[variant], { color }, style]}
      {...rest}
    />
  );
}
