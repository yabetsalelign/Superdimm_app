// SuperDimm UI — Button
// Primary, secondary, ghost, and destructive variants with optional icon support.

import React from 'react';
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '@/hooks/useThemeColor';
import { Radius, Spacing } from '@/constants';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /** Icon element rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon element rendered after the label. */
  iconRight?: React.ReactNode;
  label: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  label,
  style,
  disabled,
  ...rest
}: ButtonProps) {
  const theme = useTheme();
  const isButtonDisabled = (disabled ?? false) || loading;
  const containerStyle = getContainerStyle(variant, size, theme, isButtonDisabled);

  return (
    <TouchableOpacity
      style={[styles.base, containerStyle, style]}
      disabled={isButtonDisabled}
      activeOpacity={0.82}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? theme.primaryForeground : theme.primary}
        />
      ) : (
        <View style={styles.row}>
          {iconLeft && <View style={styles.iconLeft}>{iconLeft}</View>}
          <ThemedText
            variant={size === 'sm' ? 'buttonSmall' : 'button'}
            style={{ color: getLabelColor(variant, theme) }}
          >
            {label}
          </ThemedText>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Style helpers
// ─────────────────────────────────────────────

function getContainerStyle(
  variant: ButtonVariant,
  size: ButtonSize,
  theme: ReturnType<typeof useTheme>,
  isDisabled: boolean,
) {
  const height = size === 'sm' ? 36 : size === 'lg' ? 52 : 44;

  const base = {
    height,
    opacity: isDisabled ? 0.55 : 1,
  };

  switch (variant) {
    case 'primary':
      return { ...base, backgroundColor: theme.primary, borderColor: 'transparent' };
    case 'secondary':
      return {
        ...base,
        backgroundColor: theme.primarySubtle,
        borderColor: theme.primaryLight,
        borderWidth: 1,
      };
    case 'ghost':
      return {
        ...base,
        backgroundColor: 'transparent',
        borderColor: theme.border,
        borderWidth: 1,
      };
    case 'destructive':
      return {
        ...base,
        backgroundColor: theme.error,
        borderColor: 'transparent',
      };
  }
}

function getLabelColor(
  variant: ButtonVariant,
  theme: ReturnType<typeof useTheme>,
): string {
  switch (variant) {
    case 'primary':
      return theme.primaryForeground;
    case 'secondary':
      return theme.primary;
    case 'ghost':
      return theme.foreground;
    case 'destructive':
      return '#FFFFFF';
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing[4],
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: Spacing[2],
  },
  iconRight: {
    marginLeft: Spacing[2],
  },
});
