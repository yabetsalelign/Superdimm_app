// SuperDimm Design System — Colors
// Based on the SuperDimm web app visual identity.
// Primary: deep indigo #27408B (restrained, professional telecom brand)

export interface ThemeColors {
  // Brand
  primary: string;
  primaryForeground: string;
  primaryLight: string;
  primarySubtle: string;

  // Surfaces
  background: string;
  card: string;
  surface: string;

  // Text
  foreground: string;
  mutedForeground: string;
  placeholderText: string;

  // UI
  border: string;
  input: string;
  divider: string;

  // Status
  success: string;
  successBackground: string;
  successBorder: string;

  warning: string;
  warningBackground: string;
  warningBorder: string;

  error: string;
  errorBackground: string;
  errorBorder: string;

  info: string;
  infoBackground: string;
  infoBorder: string;

  // Tab bar
  tabBarBackground: string;
  tabBarBorder: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export const Colors: Record<'light' | 'dark', ThemeColors> = {
  light: {
    // Brand
    primary: '#27408B',
    primaryForeground: '#FFFFFF',
    primaryLight: '#C7D2FE', // indigo-100 equivalent
    primarySubtle: 'rgba(39, 64, 139, 0.08)',

    // Surfaces
    background: '#F6F8FB',
    card: '#FFFFFF',
    surface: '#FFFFFF',

    // Text
    foreground: '#0F1720',
    mutedForeground: '#6B7280',
    placeholderText: '#9CA3AF',

    // UI
    border: '#E6E9EF',
    input: '#FFFFFF',
    divider: '#E6E9EF',

    // Status
    success: '#16A34A',
    successBackground: '#F0FDF4',
    successBorder: '#BBF7D0',

    warning: '#D97706',
    warningBackground: '#FFFBEB',
    warningBorder: '#FDE68A',

    error: '#EF4444',
    errorBackground: '#FEF2F2',
    errorBorder: '#FECACA',

    info: '#2563EB',
    infoBackground: '#EFF6FF',
    infoBorder: '#BFDBFE',

    // Tab bar
    tabBarBackground: '#FFFFFF',
    tabBarBorder: '#E6E9EF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#27408B',
  },

  dark: {
    // Brand
    primary: '#6B8FE8', // lighter indigo for dark mode readability
    primaryForeground: '#FFFFFF',
    primaryLight: 'rgba(107, 143, 232, 0.20)',
    primarySubtle: 'rgba(107, 143, 232, 0.12)',

    // Surfaces
    background: '#0F1720',
    card: '#1A2335',
    surface: '#1A2335',

    // Text
    foreground: '#F8FAFC',
    mutedForeground: '#94A3B8',
    placeholderText: '#64748B',

    // UI
    border: 'rgba(255, 255, 255, 0.10)',
    input: '#1E2D42',
    divider: 'rgba(255, 255, 255, 0.08)',

    // Status
    success: '#4ADE80',
    successBackground: 'rgba(74, 222, 128, 0.10)',
    successBorder: 'rgba(74, 222, 128, 0.25)',

    warning: '#FCD34D',
    warningBackground: 'rgba(252, 211, 77, 0.10)',
    warningBorder: 'rgba(252, 211, 77, 0.25)',

    error: '#F87171',
    errorBackground: 'rgba(248, 113, 113, 0.10)',
    errorBorder: 'rgba(248, 113, 113, 0.25)',

    info: '#60A5FA',
    infoBackground: 'rgba(96, 165, 250, 0.10)',
    infoBorder: 'rgba(96, 165, 250, 0.25)',

    // Tab bar
    tabBarBackground: '#1A2335',
    tabBarBorder: 'rgba(255, 255, 255, 0.08)',
    tabIconDefault: '#64748B',
    tabIconSelected: '#6B8FE8',
  },
};

export type ColorScheme = 'light' | 'dark';
