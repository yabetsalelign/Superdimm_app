// SuperDimm Mobile — useColorScheme hook
// Re-exports Expo's useColorScheme with a typed, non-nullable return.
// Falls back to 'light' if the device preference is unavailable.

import { useColorScheme as useNativeColorScheme } from 'react-native';
import type { ColorScheme } from '@/constants/Colors';

export function useColorScheme(): ColorScheme {
  const scheme = useNativeColorScheme();
  return scheme === 'dark' ? 'dark' : 'light';
}
